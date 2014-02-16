# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
@exportCode = ->
    xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml_text = Blockly.Xml.domToText(xml);
    $('#xmlText').html(xml_text);
    $('#codeForm').submit();

@clearCode = ->
    Blockly.mainWorkspace.clear();

@deployCode = ->
    btuID = $('#selectBTU option:selected').attr('data-btuId');
    codeID = $('#selectBTU').attr('data-codeId');
    buildUrl = "/btu/" + btuID + "/code/" + codeID + "/upload";
    $.ajax
        url: buildUrl,
        type: "POST",
        success: ->
            alert("great success");
            return
        failure: ->
            alert("great failure");
            return
    return;

