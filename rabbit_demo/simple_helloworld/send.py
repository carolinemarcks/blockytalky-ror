#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()


channel.queue_declare(queue='hello')       #optional -- confirm's queue's existence

channel.basic_publish(exchange    ='',              #default exchange
                      routing_key ='hello',         #queue name
                      body        ='Hello World!')  #message to send
print " [x] Sent 'Hello World!'"

connection.close()    #flush network buffers -- confirms our message is actually delivered
