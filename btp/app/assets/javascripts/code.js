this.exportCode = function() {
  var xml, xml_text;
  xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  xml_text = Blockly.Xml.domToText(xml);
  $('#sensorString1').val($('#sensor1 option:selected').val());
  $('#sensorString2').val($('#sensor2 option:selected').val());
  $('#sensorString3').val($('#sensor3 option:selected').val());
  $('#sensorString4').val($('#sensor4 option:selected').val());
  $('#xmlText').html(xml_text);
  return $('#codeForm').submit();
};

this.clearCode = function() {
  return Blockly.mainWorkspace.clear();
};

this.stopCode = function() {
  var btuID, buildUrl;
  btuID = $('#selectBTUStop option:selected').attr('data-btuId');
  buildUrl = "/btu/" + btuID + "/stop_code";
  $.ajax({
    url: buildUrl,
    type: "POST",
    beforeSend: sendXhr,
    success: function() {
      alert("success in telling controller to stop code");
    },
    failure: function() {
      alert("Something done got goofed when stopping code");
    }
  });
};

this.deployCode = function() {
  var btuID, buildUrl, codeID;
  btuID = $('#selectBTU option:selected').attr('data-btuId');
  codeID = $('#selectBTU').attr('data-codeId');
  buildUrl = "/btu/" + btuID + "/code/" + codeID + "/upload";
  $.ajax({
    url: buildUrl,
    type: "POST",
    beforeSend: sendXhr,
    success: function() {
      alert("great success");
    },
    failure: function() {
      alert("great failure");
    }
  });
};

this.sendXhr = function(xhr) {
  return xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
};

