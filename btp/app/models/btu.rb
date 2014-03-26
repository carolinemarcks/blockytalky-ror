require 'faye/websocket'
require 'json'
require 'thread'

class Btu < ActiveRecord::Base
    @@ws = nil
    @@ws_is_initializing = false

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
        if !(@@ws_is_initializing or @@ws)
            make_dax_websocket
        end

        if @@ws_is_initializing
            if !@queue
                @queue = Queue.new
            end
            @queue << message.to_json
        else
            @@ws.send(message.to_json)
        end
        p message #TODO: delete
    end

    def make_dax_websocket
        if @@ws or @@ws_is_initializing
            return
        end
        @@ws_is_initializing = true

        wb_thread = Thread.new do
            EM.run {
                p "Making the websocket"
                @@ws = Faye::WebSocket::Client.new('ws://localhost:8005/dax') #TODO: change to dax
                #@@ws = Faye::WebSocket::Client.new('ws://btrouter.getdown.org:8005/dax')
                ws = @@ws

                ws.on :open do |event|
                    self.clear_queue
                    @@ws_is_initializing = false
                    p "Successfully created the websocket"
                end

                ws.on :message do |event|
                    p [:message, event.data]
                end

                ws.on :close do |event|
                    p [:close, event.code, event.reason]
                    @@ws = nil
                    @@ws_is_initializing = false
                end

                ws.on :error do |event|
                    p [:websocket_error, event]
                end
            }
        end
    end
end
