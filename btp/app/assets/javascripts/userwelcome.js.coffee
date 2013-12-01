# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

# The @ exports the function to the global namespace; we might consider writing a specific namespace for it later.
@exportCode = ->
    xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml_text = Blockly.Xml.domToText(xml);
    xml_text = "Copy / Save this code for later use and loading into Blockly!<br/>" + xml_text
    alert xml_text

@clearCode = ->
    Blockly.mainWorkspace.clear();
  #See storage.js for potentially useful methods: BlocklyStorage.makeRequest_, BlocklyStorage.handleRequest_, BlocklyStorage.loadXml_
