#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new
conn.start

ch   = conn.create_channel
q    = ch.queue("task_queue",       #name of queue
                :durable => true)   #if the consumer(s) die, the message will stick around

msg  = ARGV.empty? ? "1" : ARGV[0]  #take first arg as input

q.publish(msg, :persistent => true)
puts " [x] Sent #{msg}"

conn.close
