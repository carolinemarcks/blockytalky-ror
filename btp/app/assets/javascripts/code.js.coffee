# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
@exportCode = ->
    xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml_text = Blockly.Xml.domToText(xml);
    $('sensorString1').html($('#sensor1 option:selected').text());
    $('sensorString2').html($('#sensor2 option:selected').text());
    $('sensorString3').html($('#sensor3 option:selected').text());
    $('sensorString4').html($('#sensor4 option:selected').text());
    $('#xmlText').html(xml_text);
    $('#codeForm').submit();

@clearCode = ->
    Blockly.mainWorkspace.clear();

@stopCode = ->
    btuID = $('#selectBTUStop option:selected').attr('data-btuId');
    buildUrl = "/btu/" + btuID + "/stop_code";
    $.ajax
        url: buildUrl,
        type: "POST",
        beforeSend: sendXhr,
        success: ->
            alert("success in telling controller to stop code");
            return
        failure: ->
            alert("Something done got goofed when stopping code");
            return
    return;

@deployCode = ->
    btuID = $('#selectBTU option:selected').attr('data-btuId');
    codeID = $('#selectBTU').attr('data-codeId');
    buildUrl = "/btu/" + btuID + "/code/" + codeID + "/upload";
    $.ajax
        url: buildUrl,
        type: "POST",
        beforeSend: sendXhr,
        success: ->
            alert("great success");
            return
        failure: ->
            alert("great failure");
            return
    return;

#Source: http://stackoverflow.com/questions/7203304/warning-cant-verify-csrf-token-authenticity-rails
@sendXhr = (xhr) ->
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
