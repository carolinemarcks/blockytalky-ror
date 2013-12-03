# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
@exportCode = ->
    xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml_text = Blockly.Xml.domToText(xml);
    xml_text = "Copy / Save this code for later use and loading into Blockly!\n" + xml_text
    alert xml_text

@clearCode = ->
    Blockly.mainWorkspace.clear();

