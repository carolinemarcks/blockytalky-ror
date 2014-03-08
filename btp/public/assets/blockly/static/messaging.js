"use strict";Blockly.Language||(Blockly.Language={}),Blockly.Language.twitter_tweet={category:"Twitter",helpUrl:"",init:function(){this.setColour(400);var t=new Blockly.FieldVariable("me");this.appendDummyInput("").appendTitle("Tweet from ").appendTitle(t,"VAR"),this.setOutput(!0,"Boolean"),this.setInputsInline(!0),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("Someone Tweets")}},Blockly.Language.twitter_retweet={category:"Twitter",helpUrl:"",init:function(){this.setColour(400),this.appendDummyInput("").appendTitle("Retweet"),this.setOutput(!0,"Boolean"),this.setInputsInline(!0),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("Someone Retweets me")}},Blockly.Language.facebook_msg={category:"Facebook",helpUrl:"",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Facebook Message"),this.setOutput(!0,"String"),this.setInputsInline(!0),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("get facebook message")}},Blockly.Language.send_osc={category:"Messaging",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Send over OSC:"),this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("/path/"),"target"),this.appendDummyInput("").appendTitle("Value: ").appendTitle(new Blockly.FieldTextInput("1"),"value"),this.setInputsInline(!0),this.setOutput(!1),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip("Send message of value to /path/ via OSC")}},Blockly.Language.facebook_poke={category:"Facebook",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Facebook Poke:"),this.setInputsInline(!0),this.setOutput(!0),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("Facebook Poke")}},Blockly.Language.messaging_tell={category:"Messaging",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Tell:"),this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("mystique"),"target"),this.appendDummyInput("").appendTitle(" ").appendTitle(new Blockly.FieldTextInput("go"),"command"),this.setInputsInline(!0),this.setOutput(!1),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip("send a text command to another robot (by name)")}},Blockly.Language.messaging_source={category:"Messaging",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Message From:"),this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("mystique"),"src"),this.setInputsInline(!0),this.setOutput(!0,"Boolean"),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("Returns true if a message has been received from the specified robot")}},Blockly.Language.messaging_content={category:"Messaging",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Message that says:"),this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("go"),"msg"),this.setInputsInline(!0),this.setOutput(!0,"Boolean"),this.setPreviousStatement(!1),this.setNextStatement(!1),this.setTooltip("returns true if a message of the desired content has been received.")}},Blockly.Language.messaging_say={category:"Messaging",helpUrl:"http://www.google.com",init:function(){this.setColour(200),this.appendDummyInput("").appendTitle("Say:"),this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("Hello"),"speak"),this.setInputsInline(!0),this.setOutput(!1),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip("BTU speaks this text")}},Blockly.Python=Blockly.Generator.get("Python"),Blockly.Python.facebook_msg=function(){var t="facebook message code\n";return t},Blockly.Python.twitter_tweet=function(){var t=this.getTitleValue("VAR"),e="tweet from "+t+"\n";return e},Blockly.Python.send_osc=function(){var t=this.getTitleValue("target"),e=this.getTitleValue("value"),n='client.send(OSCMessage("'+t+'", '+e+"))\n";return n},Blockly.Python.facebook_poke=function(){var t="facebook poke code\n";return t},Blockly.Python.messaging_tell=function(){var t=this.getTitleValue("target"),e=this.getTitleValue("command"),n='toSend = Message(self.hostname, "'+t+'", "Message", "'+e+'")\ntoSend = Message.encode(toSend)\nchannel2.basic_publish(exchange="", routing_key="Message", body=toSend)\ntime.sleep(.01)\n';return n},Blockly.Python.messaging_source=function(){var t=this.getTitleValue("src"),e='self.checkSource("'+t+'")';return[e,Blockly.Python.ORDER_ATOMIC]},Blockly.Python.messaging_content=function(){var t=this.getTitleValue("msg"),e='self.checkContent("'+t+'")';return[e,Blockly.Python.ORDER_ATOMIC]},Blockly.Python.messaging_say=function(){var t=this.getTitleValue("speak"),e='engine=pyttsx.init()\nengine.say("'+t+'")\nengine.runAndWait()\n';return e};