/**
 * Visual Blocks Editor
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
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');


Blockly.Blocks['procedures_defnoreturn'] = {
  // Define a procedure with no return value.
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.arguments_ = [];
  },
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var x = 0; x < this.arguments_.length; x++) {
      if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[x].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = '';
    if (this.arguments_.length) {
      paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
          ' ' + this.arguments_.join(', ');
    }
    this.setTitleValue(paramString, 'PARAMS');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setTitleValue(this.arguments_[x], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
                                     this.workspace, this.arguments_, null);
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getTitleValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
        this.workspace, this.arguments_, this.paramIds_);
  },
  dispose: function() {
    // Dispose of any callers.
    var name = this.getTitleValue('NAME');
    Blockly.Procedures.disposeCallers(name, this.workspace);
    // Call parent's destructor.
    Blockly.Block.prototype.dispose.apply(this, arguments);
  },
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES NOT have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible_()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var x = 0, block; block = blocks[x]; x++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getTitleValue('NAME'))) {
            block.setTitleValue(newName, 'NAME');
          }
        }
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getTitleValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);

    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var x = 0; x < this.arguments_.length; x++) {
      var xmlArg = goog.dom.createDom('arg');
      xmlArg.setAttribute('name', this.arguments_[x]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);

    options.push(option);
    // Add options to create getters for each parameter.
    for (var x = 0; x < this.arguments_.length; x++) {
      var option = {enabled: true};
      var name = this.arguments_[x];
      option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
      var xmlTitle = goog.dom.createDom('title', null, name);
      xmlTitle.setAttribute('name', 'VAR');
      var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
      xmlBlock.setAttribute('type', 'variables_get');
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    }
  },
  callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['procedures_defreturn'] = {
  // Define a procedure with a return value.
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
    this.arguments_ = [];
  },
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  dispose: Blockly.Blocks['procedures_defnoreturn'].dispose,
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Blocks['procedures_mutatorarg'] = {
  // Procedure argument (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
        .appendTitle(new Blockly.FieldTextInput('x', this.validator), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  },
  validator: function(newVar) {
    // Merge runs of whitespace.  Strip leading and trailing whitespace.
    // Beyond this, all names are legal.
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
  }
};

Blockly.Blocks['procedures_callnoreturn'] = {
  // Call a procedure with no return value.
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL)
        .appendTitle('', 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: function() {
    return this.getTitleValue('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('NAME'))) {
      this.setTitleValue(newName, 'NAME');
      this.setTooltip(
          (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP
           : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
          .replace('%1', newName));
    }
  },
  setProcedureParameters: function(paramNames, paramIds) {
    // Data structures for parameters on each call block:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // paramNames = ['x', 'y', 'z']
    //     New param names.
    // paramIds = ['piua', 'f8b_', 'oi.o']
    //     IDs of params (consistent for each parameter through the life of a
    //     mutator, regardless of param renaming).
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkArguments_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      this.quarkConnections_ = {};
      this.quarkArguments_ = null;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    if (!this.quarkArguments_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkArguments_ = paramIds;
      } else {
        this.quarkArguments_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkArguments_[x]] = connection;
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.quarkArguments_ = paramIds;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle(this.arguments_[x]);
      if (this.quarkArguments_) {
        // Reconnect any child blocks.
        var quarkName = this.quarkArguments_[x];
        if (quarkName in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkName];
          if (!connection || connection.targetConnection ||
              connection.sourceBlock_.workspace != this.workspace) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkName];
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleValue('NAME'));
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name and parameters.
    var name = xmlElement.getAttribute('name');
    this.setTitleValue(name, 'NAME');
    this.setTooltip(
        (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP
         : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace('%1', name));
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    if (def && def.mutator.isVisible()) {
      // Initialize caller with the mutator's IDs.
      this.setProcedureParameters(def.arguments_, def.paramIds_);
    } else {
      this.arguments_ = [];
      for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
        if (childNode.nodeName.toLowerCase() == 'arg') {
          this.arguments_.push(childNode.getAttribute('name'));
        }
      }
      // For the second argument (paramIds) use the arguments list as a dummy
      // list.
      this.setProcedureParameters(this.arguments_, this.arguments_);
    }
  },
  renameVar: function(oldName, newName) {
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        this.getInput('ARG' + x).titleRow[0].setText(newName);
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to find caller.
    var option = {enabled: true};
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getTitleValue('NAME');
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  }
};

Blockly.Blocks['procedures_callreturn'] = {
  // Call a procedure with a return value.
  init: function() {
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.PROCEDURES_CALLRETURN_CALL)
        .appendTitle('', 'NAME');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters:
      Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters,
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_callnoreturn'].customContextMenu
};


Blockly.Blocks['procedures_ifreturn'] = {
  // Conditionally return value from a procedure.
  init: function() {
    this.setHelpUrl('http://c2.com/cgi/wiki?GuardClause');
    this.setColour(290);
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
    this.hasReturnValue_ = true;
  },
  mutationToDom: function() {
    // Save whether this block has a return value.
    var container = document.createElement('mutation');
    container.setAttribute('value', Number(this.hasReturnValue_));
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore whether this block has a return value.
    var value = xmlElement.getAttribute('value');
    this.hasReturnValue_ = (value == 1);
    if (!this.hasReturnValue_) {
      this.removeInput('VALUE');
      this.appendDummyInput('VALUE')
        .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
    }
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a procedure?
    var block = this;
    do {
      if (block.type == 'procedures_defnoreturn' ||
          block.type == 'procedures_defreturn') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      // If needed, toggle whether this block has a return value.
      if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendDummyInput('VALUE')
          .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = false;
      } else if (block.type == 'procedures_defreturn' &&
                 !this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendValueInput('VALUE')
          .appendTitle(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = true;
      }
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
    }
  }
};


Blockly.Blocks.sensor_touch={
    category:"Sensors",
    helpUrl:"",
    init:function() {
    this.setColour(50);
    this.appendDummyInput("")
        .appendTitle("Touch Sensor:");
    this.appendDummyInput("")
        .appendTitle("Port")
        .appendTitle(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["is pressed","1"],["is released","0"]]),"status");
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip("Returns the status of a touch sensor");
    }
};

Blockly.Blocks.sensor_light={
    category:"Sensors",
    helpUrl:"",
    init:function() {
    this.setColour(50);
    this.appendDummyInput("")
        .appendTitle("Light Sensor:");
    this.appendDummyInput("")
        .appendTitle("Port")
        .appendTitle(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip("Returns the value of a light sensor");
    }
};

Blockly.Blocks.sensor_ultrasonic={
    category:"Sensors",
    helpUrl:"",
    init:function() {
    this.setColour(50);
    this.appendDummyInput("")
        .appendTitle("Ultrasonic Sensor:");
    this.appendDummyInput("")
        .appendTitle("Port")
        .appendTitle(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip("Returns the value of an ultrasonic sensor");
    }
};

Blockly.Blocks.sensor_sound={
    category:"Sensors",
    helpUrl:"",
    init:function() {
    this.setColour(50);
    this.appendDummyInput("")
        .appendTitle("Sound Sensor:");
    this.appendDummyInput("")
        .appendTitle("Port")
        .appendTitle(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip("Returns the value of a sound sensor");
    }
};


Blockly.Blocks.motor_set= {
    category: 'Motors',
    helpUrl: 'http://www.google.com',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendTitle("Set motor")
            .appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], 
                ["3","3"],["4","4"],["All","All"]]), 'motor_num');
      /*this.appendDummyInput()
        .appendTitle(' MotorPower')
            .appendTitle(new Blockly.FieldTextInput('100',
            Blockly.Blocks.math_number.validator), 'motor_power');*/
    this.appendDummyInput("")
            .appendTitle(" to power");
    this.appendValueInput('motor_power')
            .setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Motor 1-4, Power -100 to 100');
    }
};

Blockly.Blocks.motor_get_encoder= {
    category: 'Motors',
    helpUrl: '',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendTitle("Encoder Value");
    this.appendDummyInput("")
        .appendTitle("Motor")
            .appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3","3"], ["4","4"]]), 'enc');
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    this.setTooltip('Returns absolute rotation of specified motor');
    }
};

Blockly.Blocks.motor_get_encoder= {
    category: 'Motors',
    helpUrl: '',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendTitle("Encoder Value");
    this.appendDummyInput("")
        .appendTitle("Motor")
            .appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3","3"], ["4","4"]]), 'enc');
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    this.setTooltip('Returns absolute rotation of specified motor');
    }
};

Blockly.Blocks.pin_in= {
    category: 'GPIO',
    helpUrl: '',
    init: function() {
    this.setColour(0);
    this.appendDummyInput("")
        .appendTitle("GPIO In Pin:")
        .appendTitle(new Blockly.FieldDropdown([["12", "12"], ["16", "16"],
                            ["18", "18"],["22", "22"]]), 'gpio_in_pin');
    this.appendDummyInput("")
        .appendTitle("Value:")
            .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), 'gpio_in_value');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks.pin_out= {
    category: 'GPIO',
    helpUrl: '',
    init: function() {
    this.setColour(0);
    this.appendDummyInput("")
        .appendTitle("GPIO Out Pin:")
        .appendTitle(new Blockly.FieldDropdown([["7", "7"], ["11", "11"],
                            ["13","13"],["15","15"]]), 'gpio_out_pin');
    this.appendDummyInput("")
        .appendTitle("Value:")
            .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), 'gpio_out_value');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


Blockly.Blocks.sensor_new_val= {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
    this.setColour(300)
    this.appendDummyInput("")
        .appendTitle("Unread Data On:");
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["Sensor 1", "sensor1"], 
                            ["Sensor 2", "sensor2"],
                                                    ["Sensor 3", "sensor3"],
                            ["Sensor 4", "sensor4"],
                            ["Sensor 5", "sensor5"],
                            ["Encoder 1", "encoder1"],
                            ["Encoder 2", "encoder2"],
                            ["Encoder 3", "encoder3"],
                            ["Encoder 4", "encoder4"]]
                          ), 'port');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setTooltip('Returns true if there is unread data on the specified port');
    }

}

Blockly.Blocks.led_set= {
category: 'LED',
  helpUrl: '',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
    .appendTitle("Set LEDs:");
    this.appendDummyInput("")
    .appendTitle("LED1")
        .appendTitle(new Blockly.FieldDropdown([["On", "On"], ["Off", "Off"]]), 'led1');
    this.appendDummyInput("")
    .appendTitle("LED2")
        .appendTitle(new Blockly.FieldDropdown([["On", "On"], ["Off", "Off"]]), 'led2');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set LEDs to on or off');
  }
};


Blockly.Blocks.time_sleep= {
category: 'Time',
  helpUrl: '',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendTitle('Wait for')
        .appendTitle(new Blockly.FieldTextInput('1000',
          Blockly.Blocks.math_number.validator), 'time_sleep');
    this.appendDummyInput("")
    .appendTitle('ms');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Pause for ___ milliseconds');
  }
};

Blockly.Blocks.print_print= {
category: 'Print',
  helpUrl: '',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
          .appendTitle("Print: ");
    this.appendValueInput('to_print')
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Prints to terminal on Pi');
  }
};


Blockly.Blocks.controls_inf_loop = {
  //Infinite loop.                                                              
    helpUrl: '',
    init: function() {
        this.setColour(120);
        this.appendDummyInput("")
            .appendTitle('repeat forever');
        this.appendStatementInput('DO')
            .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


