# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
#= require bootstrap-slider
 
# NOTE: This sets jq11 to jquery 1.11.0, but since it's locally scoped,
#   the default version on the page becomes 1.10.2 and 1.11.0 disappears.
# We can re-write this script in javascript to make jq11 a global variable to fix this,
#   since the bootstrap slider requires the newer jquery while the blockly is using older jquery.
jq11 = $.noConflict true;

@exportCode = ->
    xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml_text = Blockly.Xml.domToText(xml);
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

jq11(document).ready ($)->
    $('.slider').slider {
        formater: (value) ->
            return 'Current value: ' + value;
    };
    return;
 
#@getStarred = ->


#@saveStarred = ->
    #buildUrl = "/code/" + 

