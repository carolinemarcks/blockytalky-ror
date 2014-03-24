require 'faye/websocket'
require 'json'

class Btu < ActiveRecord::Base
    @@ws = nil

    belongs_to :user

    attr_accessible :btuID, :id, :title
    validates :btuID, presence: true
    validates :title, presence: true

    after_initialize :make_dax_websocket

    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    def send_stop
        send_message(:stop_code, nil)
    end

    def send_run
        send_message(:run_code, nil)
    end

    def send_upload code
        url = Rails.application.routes.url_helpers.code_path code.id, format: :json
        send_message(:upload_code, {url: url, updated_at: code.updated_at})
    end

    #We need to use this queue to fix a race condition where we try to send a
    #message to the websocket before the handshake is complete.
    def clear_queue
        if @queue
            while not @queue.empty?
                message = @queue.pop
                p ["from queue", message]
                @@ws.send message
            end
        end
    end

    private
    def send_message(action, data)
        if !data
            data = {}
        end
        data[:action] = action
        message = {"py/object" => "message.Message",
                   source: "Server",
                   destination: self.title, #TODO: use the UUID
                   channel: "Server",
                   content: data}
        if @@ws
            @@ws.send message.to_json
        else
            if not @queue
                @queue = Queue.new
            end
            @queue << message.to_json
        end
        p message #TODO: delete
    end

    def make_dax_websocket
        if @@ws
            return
        end
        p "Making the websocket"
        ws = Faye::WebSocket::Client.new('ws://localhost:8005/dax') #TODO: change to dax
        #ws = Faye::WebSocket::Client.new('ws://btrouter.getdown.org:8005/dax')

        ws.on :open do |event|
            @@ws = ws
            self.clear_queue
        end

        ws.on :message do |event|
            p [:message, event.data]
        end

        ws.on :close do |event|
            p [:close, event.code, event.reason]
            @@ws = nil
        end
    end
end
