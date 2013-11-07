#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new
conn.start

ch   = conn.create_channel
q    = ch.queue("task_queue", :durable => true)

#this line tells how many messages a worker can prefetch before finishing all tasks
#without this, every nth task would go to the nth consumer, no matter the amount of work
ch.prefetch(1)

puts " [*] Waiting for messages. To exit press CTRL+C"

begin
    q.subscribe(:ack => true, :block => true) do |delivery_info, properties, body|
        puts " [x] Received '#{body}'"
        # imitate some work
        sleep body.to_i
        puts " [x] Done"
        ch.ack(delivery_info.delivery_tag)
end

rescue Interrupt => _
    conn.close
end
