#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new  
conn.start

ch = conn.create_channel
q = ch.queue("hello") #confirms the channel already exists, or creates it

puts " [*] Waiting for messages in #{q.name}. To exit press CTRL+C"

q.subscribe(:block => true) do |delivery_info,properties,body| 
    #this is the callback function for when messages are pushed (asynchronously from Rabbit)

    puts " [x] Recieved #{body}"

    #cancel the consumer to exit -- if this line wasn't here it would hang continuously
    delivery_info.consumer.cancel
end
