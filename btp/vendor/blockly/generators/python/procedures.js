/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python.procedures');

goog.require('Blockly.Python');


Blockly.Python['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is assigned.
  var globals = Blockly.Variables.allVariables(block);
  for (var i = globals.length - 1; i >= 0; i--) {
    var varName = globals[i];
    if (block.arguments_.indexOf(varName) == -1) {
      globals[i] = Blockly.Python.variableDB_.getName(varName,
          Blockly.Variables.NAME_TYPE);
    } else {
      // This variable is actually a parameter name.  Do not include it in
      // the list of globals, thus allowing it be of local scope.
      globals.splice(i, 1);
    }
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var funcName = Blockly.Python.variableDB_.getName(block.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Python.statementToCode(block, 'STACK');
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
        '"' + block.id + '"') + branch;
  }
  var returnValue = Blockly.Python.valueToCode(block, 'RETURN',
      Blockly.Python.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + '\n';
  } else if (!branch) {
    branch = '  pass';
  }
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Python.variableDB_.getName(block.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
      globals + branch + returnValue;
  code = Blockly.Python.scrub_(block, code);
  Blockly.Python.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Python['procedures_defnoreturn'] =
    Blockly.Python['procedures_defreturn'];

Blockly.Python['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Python.variableDB_.getName(block.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Python.valueToCode(block, 'ARG' + x,
        Blockly.Python.ORDER_NONE) || 'None';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Python.variableDB_.getName(block.getTitleValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Python.valueToCode(block, 'ARG' + x,
        Blockly.Python.ORDER_NONE) || 'None';
  }
  var code = funcName + '(' + args.join(', ') + ')\n';
  return code;
};

Blockly.Python['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_NONE) || 'False';
  var code = 'if ' + condition + ':\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Python.valueToCode(block, 'VALUE',
        Blockly.Python.ORDER_NONE) || 'None';
    code += '  return ' + value + '\n';
  } else {
    code += '  return\n';
  }
  return code;
};

//DEFINE GENERATORS:

Blockly.Python= Blockly.Generator.get('Python');

Blockly.Python.motor_set = function() {
    //var value_motor_number = Blockly.Python.valueToCode(this, 'motor_num', Blockly.Python.ORDER_ATOMIC);
    var value_motor_power = Blockly.Python.valueToCode(this, 'motor_power', Blockly.Python.ORDER_NONE);
    var code;
    var value_motor_number= this.getTitleValue('motor_num');
    //var value_motor_power = parseInt(this.getTitleValue('motor_power'));
    if(value_motor_number=="All") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(motor1=' +value_motor_power+ ', motor2=' + value_motor_power + ', motor3=' + value_motor_power + '))'+'\n'
    }
    else if(value_motor_number=="1") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(motor1=' +value_motor_power+ '))'+'\n'
    }
    else if(value_motor_number=="2") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(motor2=' +value_motor_power+ '))'+'\n'
    }
    else if(value_motor_number=="3") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(motor3=' +value_motor_power+ '))'+'\n'
    }
    else if(value_motor_number=="4") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(motor4=' +value_motor_power+ '))'+'\n'
    }
    code = code + 'toSend = Message.encode(toSend)' + '\n'
    code= code + 'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n'
    return code;
};

Blockly.Python.pin_in = function() {
    var value_pin_value = Blockly.Python.valueToCode(this, 'gpio_in_value', Blockly.Python.ORDER_NONE);
    var pin_value;
    
    pin_value= this.getTitleValue('gpio_in_value');

    var code;
    var value_pin_number= this.getTitleValue('gpio_in_pin');
    if(value_pin_number=="12") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin12=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="16") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin16=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="18") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin18=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="22") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin22=' +pin_value+ '))'+'\n'
    }
    code = code + 'toSend = Message.encode(toSend)' + '\n'
    code= code + 'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n'
    return code;
};

Blockly.Python.pin_out = function() {
    var value_pin_value = Blockly.Python.valueToCode(this, 'gpio_out_value', Blockly.Python.ORDER_NONE);
    var pin_value;
    
    pin_value= this.getTitleValue('gpio_out_value');

    var code;
    var value_pin_number= this.getTitleValue('gpio_out_pin');    
    if(value_pin_number=="7") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin7=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="11") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin11=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="13") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin13=' +pin_value+ '))'+'\n'
    }
    else if(value_pin_number=="15") {
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(pin15=' +pin_value+ '))'+'\n'
    }
    code = code + 'toSend = Message.encode(toSend)' + '\n'
    code= code + 'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n'
    return code;
};

Blockly.Python.motor_all_stop= function() {
    var code= 'toSend= Message(self.hostname, None, "HwCmd", Message.createImage(motor1=0, motor2=0, motor3=0))'+'\n' + 'Message.encode(toSend)' + '\n' + 'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n';
    return code;
};

Blockly.Python.motor_get_encoder= function() {
    var value_encoder= this.getTitleValue('enc');
    value_encoder-=1;
    var code = 'self.getSensorValue("encoder", ' + value_encoder + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_new_val= function() {
    var port= this.getTitleValue('port');
    var code= 'self.sensorStatus["'+port+'"]';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.led_set= function() {
  var value_led1;
  var value_led2;
  if(this.getTitleValue('led1') =="On") {
    value_led1= 1;
  }
  else {
    value_led1= 0;
  }
   if(this.getTitleValue('led2') =="On") {
    value_led2= 1;
  }
  else {
    value_led2= 0;
  }
    code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(led1=' +value_led1+ ', led2=' +value_led2+ '))'+'\n'+'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n';
  return code;
};

Blockly.Python.time_sleep= function() {
  var value_sleep = parseInt(this.getTitleValue('time_sleep'));
  value_sleep= value_sleep/1000;
  var code = 'time.sleep('+value_sleep+')'+'\n';
  return code;
};

Blockly.Python.print_print= function() {
   var value_print = Blockly.Python.valueToCode(this, 'to_print', Blockly.Python.ORDER_NONE);
  var code = 'print '+value_print+'\n';
  return code;
};


Blockly.Python.controls_inf_loop= function () {
    var branch = Blockly.Python.statementToCode(this, 'DO') || '  pass\n';
    var code= 'while True:'+'\n'+ branch;
    return code;
};

Blockly.Python.sensor_touch=function() {
    var b=this.getTitleValue("port");
    var a=this.getTitleValue("status");
    if (a == 1){
        return['self.robot["sensors"]['+(b-1)+'] < 200',Blockly.Python.ORDER_ATOMIC];}
    if (a == 0){
        return['self.robot["sensors"]['+(b-1)+'] > 200',Blockly.Python.ORDER_ATOMIC];}
};

Blockly.Python.sensor_light=function() {
    var b=this.getTitleValue("port");;

        return['self.robot["sensors"]['+(b-1)+']',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_ultrasonic=function() {
    var b=this.getTitleValue("port");;

        return['self.robot["sensors"]['+(b-1)+']',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sound=function() {
    var b=this.getTitleValue("port");;

        return['self.robot["sensors"]['+(b-1)+']',Blockly.Python.ORDER_ATOMIC];
};
