'use strict';

if(!Blockly.Language) Blockly.Language= {};

Blockly.Language.facebook_msg= {
    category: 'Facebook',
    helpUrl: '',
    init: function() {
	this.setColour(200);
	this.appendDummyInput("")
	    .appendTitle("Facebook Message")
	this.setOutput(true,'String');
        this.setInputsInline(true);
	this.setPreviousStatement(false);
	this.setNextStatement(false);
	this.setTooltip('get facebook message');
    }
};

Blockly.Language.send_osc= {
category: 'Messaging',
    helpUrl: 'http://www.google.com',
    init: function() {
        this.setColour(200);
        this.appendDummyInput('')
            .appendTitle('Send over OSC:');
        this.appendDummyInput('')
            .appendTitle(new Blockly.FieldTextInput('/path/'), 'target');
        this.appendDummyInput('')
            .appendTitle('Value: ')
            .appendTitle(new Blockly.FieldTextInput('1'), 'value');
        this.setInputsInline(true);
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    this.setTooltip('Send message of value to /path/ via OSC');
    }
};

Blockly.Language.facebook_poke= {
    category: 'Facebook',
    helpUrl: 'http://www.google.com',
    init: function() {
	this.setColour(200);
	this.appendDummyInput("")
	    .appendTitle("Facebook Poke:")
	this.setInputsInline(true);
	this.setOutput(true);
	this.setPreviousStatement(false);
	this.setNextStatement(false);
    this.setTooltip('Facebook Poke');
    }
};

Blockly.Language.messaging_tell= {
    category: 'Messaging',
    helpUrl: 'http://www.google.com',
    init: function() {
	this.setColour(200);
	this.appendDummyInput("")
	    .appendTitle("Tell:")
	this.appendDummyInput("")
            .appendTitle(new Blockly.FieldTextInput('mystique'), 'target');
	this.appendDummyInput("")
	    .appendTitle(" ")
            .appendTitle(new Blockly.FieldTextInput('go'), 'command');
	this.setInputsInline(true);
	this.setOutput(false);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
    this.setTooltip('send a text command to another robot (by name)');
    }
};


Blockly.Language.messaging_source= {
    category: 'Messaging',
    helpUrl: 'http://www.google.com',
    init: function() {
	this.setColour(200);
	this.appendDummyInput("")
	    .appendTitle("Message From:")
	this.appendDummyInput("")
            .appendTitle(new Blockly.FieldTextInput('mystique'), 'src');
	this.setInputsInline(true);
	this.setOutput(true, 'Boolean');
	this.setPreviousStatement(false);
	this.setNextStatement(false);
    this.setTooltip('Returns true if a message has been received from the specified robot');
    }
};

Blockly.Language.messaging_content= {
    category: 'Messaging',
    helpUrl: 'http://www.google.com',
    init: function() {
	this.setColour(200);
	this.appendDummyInput("")
	    .appendTitle("Message that says:");
	this.appendDummyInput("")
            .appendTitle(new Blockly.FieldTextInput('go'), 'msg');
	this.setInputsInline(true);
	this.setOutput(true, 'Boolean');
	this.setPreviousStatement(false);
	this.setNextStatement(false);
    this.setTooltip('returns true if a message of the desired content has been received.');
    }
};

Blockly.Language.messaging_say= {
category: 'Messaging',
  helpUrl: 'http://www.google.com',
  init: function() {
    this.setColour(200);
    this.appendDummyInput("")
        .appendTitle("Say:");
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldTextInput('Hello'), 'speak');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('BTU speaks this text');
  }
};



//
//Define generators
//


Blockly.Python= Blockly.Generator.get('Python');

Blockly.Python.facebook_msg= function() {
    var code = 'facebook message code'+'\n';
    return code;
};


Blockly.Python.send_osc= function() {
    var target = this.getTitleValue('target')
    var value = this.getTitleValue('value')
    var code = 'client.send(OSCMessage("'+target+'", '+value+'))'+'\n';
    return code;
};


Blockly.Python.facebook_poke= function() {
    var code= 'facebook poke code'+'\n';
    return code;
};

Blockly.Python.messaging_tell= function() {
    var target= this.getTitleValue('target');
    var command= this.getTitleValue('command');
    var code= 'toSend = Message(self.hostname, "'+target+'", "Message", "'+command+'")'+'\n'+ 'toSend = Message.encode(toSend)' + '\n' +
	'channel2.basic_publish(exchange="", routing_key="Message", body=toSend)'+'\n'+'time.sleep(.01)'+'\n';
    return code;
};

Blockly.Python.messaging_source= function() {
    var source= this.getTitleValue('src');
    var code= 'self.checkSource("'+source+'")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.messaging_content= function() {
    var content= this.getTitleValue('msg');
    var code= 'self.checkContent("'+content+'")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.messaging_say= function() {
    var content= this.getTitleValue('speak');
    var code= 'engine=pyttsx.init()\nengine.say("'+content+'")\nengine.runAndWait()\n';
    return code;
};

