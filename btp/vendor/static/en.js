// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.start = function(opt_data, opt_ignored, opt_ijData) {
  return ''+
'<div id="MSG" style="display: none">'+
'<span id="subtitle">a visual programming environment'+
'</span>'+
'<span id="httpRequestError">There was a problem with the request.'+
'</span>'+
'<span id="blocklyMessage">Blockly'+
'</span>'+
'<span id="linkAlert">Share your blocks with this link:\\n\\n%1'+
'</span>'+
'<span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.'+
'</span>'+
'<span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?'+
'</span>'+
'</div>' + codepage.start(null, null, opt_ijData) + graphpage.start(null, null, opt_ijData) + mazepage.start(null, null, opt_ijData) + planepage.start(null, null, opt_ijData) + puzzlepage.start(null, null, opt_ijData) + turtlepage.start(null, null, opt_ijData);
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof codepage == 'undefined') { var codepage = {}; }


codepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return ''+
'<div id="MSG">'+
'<span id="httpRequestError">There was a problem with the request.'+
'</span>'+
'<span id="linkAlert">Share your blocks with this link:\\n\\n%1'+
'</span>'+
'<span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.'+
'</span>'+
'<span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?'+
'</span>'+
'<span id="badXml">Error parsing XML:\\n%1\\n\\nAbandon changes?'+
'</span>'+
'<span id="badCode">Program error:\\n%1'+
'</span>'+
'<span id="timeout">Maximum execution iterations exceeded.'+
'</span>'+
'<span id="discard">Delete all %1 blocks?'+
'</span>'+
'</div>'+
'<br/>'+
'<label>Port Info</label>'+
'<table width="100%" height="100%">'+
'<tr>'+
'<td>'+
'<table>'+
'<tr>'+
'<td class="portLabel">Port 1:'+
'<input class="form-control pull-right portInput" name="sensor1" id="sensorval1" size="3">'+
'</td>'+
'<td class="portLabel">Port 2:'+
'<input class="form-control pull-right portInput" name="sensor2" id="sensorval2" size="3">'+
'</td>'+
'<td class="portLabel">Port 3:'+
'<input class="form-control pull-right portInput" name="sensor3" id="sensorval3" size="3">'+
'</td>'+
'<td class="portLabel">Port 4:'+
'<input class="form-control pull-right portInput" name="sensor4" id="sensorval4" size="3">'+
'</td>'+
'</tr>'+
'<tr>'+
'<td class="sensorOption">'+
'<select class="form-control" id="sensor1" onchange="updateSensors()">'+
'<option value="none">None'+
'</option>'+
'<option value="touch">Touch'+
'</option>'+
'<option value="ultra">Ultrasonic'+
'</option>'+
'<option value="sound">Sound'+
'</option>'+
'<option value="light_on">Light (Reflective)'+
'</option>'+
'<option value="light_off">Light (Ambient)'+
'</option>'+
'</select>'+
'</td>'+
'<td class="sensorOption">'+
'<select class="form-control" id="sensor2" onchange="updateSensors()">'+
'<option value="none">None'+
'</option>'+
'<option value="touch">Touch'+
'</option>'+
'<option value="ultra">Ultrasonic'+
'</option>'+
'<option value="sound">Sound'+
'</option>'+
'<option value="light_on">Light (Reflective)'+
'</option>'+
'<option value="light_off">Light (Ambient)'+
'</option> '+
'</select> '+
'</td>'+
'<td class="sensorOption">'+
'<select class="form-control" id="sensor3" onchange="updateSensors()">'+
'<option value="none">None'+
'</option>'+
'<option value="touch">Touch'+
'</option>'+
'<option value="ultra">Ultrasonic'+
'</option>'+
'<option value="sound">Sound'+
'</option>'+
'<option value="light_on">Light (Reflective)'+
'</option>'+
'<option value="light_off">Light (Ambient)'+
'</option>'+
'</select> '+
'</td>'+
'<td class="sensorOption">'+
'<select class="form-control" id="sensor4" onchange="updateSensors()">'+
'<option value="none">None'+
'</option>'+
'<option value="touch">Touch'+
'</option>'+
'<option value="ultra">Ultrasonic'+
'</option>'+
'<option value="sound">Sound'+
'</option>'+
'<option value="light_on">Light (Reflective)'+
'</option>'+
'<option value="light_off">Light (Ambient)'+
'</option>'+
'</select>  '+
'</td>'+
'</tr>'+
'</table>'+
'</td>'+
'</tr>'+
'<tr>'+
'<td colspan=2>'+
'<table>'+
'<tr id="tabRow" height="1em">'+
'<td id="tab_blocks" class="tabon" onclick="tabClick(this.id)">Blocks'+
'</td>'+
'<td class="tabmin">&nbsp;'+
'</td>'+
'<!--       '+
'<td id="tab_javascript" class="taboff" onclick="tabClick(this.id)">JavaScript'+
'</td>'+
'<td class="tabmin">&nbsp;'+
'</td>  -->'+
'<td id="tab_python" class="taboff" onclick="tabClick(this.id)">Python'+
'</td>'+
'<td class="tabmin">&nbsp;'+
'</td>'+
'<td id="tab_xml" class="taboff" onclick="tabClick(this.id)">XML'+
'</td>'+
'</tr>'+
'</table>'+
'</td>'+
'</tr>'+
'<tr>'+
'<td height="99%" colspan=2>' + codepage.toolbox(null, null, opt_ijData) + ''+
'<iframe onload="renderBlocksOuter()" id="content_blocks" src="/static/frame.html?' + soy.$$escapeHtml(opt_ijData.langSrc) + '">'+
'</iframe>'+
'<pre id="content_javascript">'+
'</pre>'+
'<pre id="content_python">'+
'</pre>'+
'<div id="content_xml">'+
'<textarea id="textarea_xml">'+
'</textarea>'+
'</div>'+
'</td>'+
'</tr>'+
'</table>';
};


codepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return ''+
'<xml id="toolbox" style="display: none">'+
'<category name="Logic" id="Logic">'+
'<block type="controls_if">'+
'</block>'+
'<block type="logic_compare">'+
'</block>'+
'<block type="logic_operation">'+
'</block>'+
'<block type="logic_negate">'+
'</block>'+
'<block type="logic_boolean">'+
'</block>'+
'<block type="logic_null">'+
'</block>'+
'<block type="logic_ternary">'+
'</block>'+
'</category>'+
'<category name="Loops" id="Loops">'+
'<block type="controls_repeat_ext">'+
'<value name="TIMES">'+
'<block type="math_number">'+
'<title name="NUM">10'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="controls_whileUntil">'+
'</block>'+
'<block type="controls_inf_loop">'+
'</block>'+
'<block type="controls_for">'+
'<value name="FROM">'+
'<block type="math_number">'+
'<title name="NUM">1'+
'</title>'+
'</block>'+
'</value>'+
'<value name="TO">'+
'<block type="math_number">'+
'<title name="NUM">10'+
'</title>'+
'</block>'+
'</value>'+
'<value name="BY">'+
'<block type="math_number">'+
'<title name="NUM">1'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="controls_forEach">'+
'</block>'+
'<block type="controls_flow_statements">'+
'</block>'+
'<block type="time_sleep">'+
'</block>'+
'<block type="print_print">'+
'</block>'+
'</category>'+
'<category name="BT Messaging" id="BTM">'+
'<block type="messaging_tell">'+
'</block>'+
'<block type="messaging_source">'+
'</block>'+
'<block type="messaging_content">'+
'</block>'+
'<block type="messaging_say">'+
'</block>'+
'<block type="send_osc">'+
'</block>'+
'</category>'+
'<!-- '+
'<category name="Facebook" id="FB">'+
'<block type="facebook_msg">'+
'</block>'+
'<block type="facebook_poke">'+
'</block>'+
'</category>\t-->'+
'<category name="Motors" id="Motors">'+
'<block type="motor_set">'+
'<value name="motor_power">'+
'<block type="math_number">'+
'<title name="NUM">0'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="motor_get_encoder">'+
'</block>'+
'<block type="motor_all_stop">'+
'</block>'+
'</category>'+
'<category name="Sensors" id="SLED">'+
'<block type="sensor_touch">'+
'</block>'+
'<block type="sensor_sound">'+
'</block>'+
'<block type="sensor_ultrasonic">'+
'</block>'+
'<block type="sensor_light">'+
'</block>'+
'</category>'+
'<category name="GPIO" id="GPIO">'+
'<block type="pin_in">'+
'</block>'+
'<block type="pin_out">'+
'</block>'+
'</category>'+
'<category name="Math" id="Math">'+
'<block type="math_number">'+
'</block>'+
'<block type="math_arithmetic">'+
'</block>'+
'<block type="math_single">'+
'</block>'+
'<block type="math_trig">'+
'</block>'+
'<block type="math_constant">'+
'</block>'+
'<block type="math_number_property">'+
'</block>'+
'<block type="math_change">'+
'<value name="DELTA">'+
'<block type="math_number">'+
'<title name="NUM">1'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="math_round">'+
'</block>'+
'<block type="math_on_list">'+
'</block>'+
'<block type="math_modulo">'+
'</block>'+
'<block type="math_constrain">'+
'<value name="LOW">'+
'<block type="math_number">'+
'<title name="NUM">1'+
'</title>'+
'</block>'+
'</value>'+
'<value name="HIGH">'+
'<block type="math_number">'+
'<title name="NUM">100'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="math_random_int">'+
'<value name="FROM">'+
'<block type="math_number">'+
'<title name="NUM">1'+
'</title>'+
'</block>'+
'</value>'+
'<value name="TO">'+
'<block type="math_number">'+
'<title name="NUM">100'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="math_random_float">'+
'</block>'+
'</category>'+
'<!--    '+
'<category name="Text">'+
'<block type="text">'+
'</block>'+
'<block type="text_join">'+
'</block>'+
'<block type="text_append">'+
'<value name="TEXT">'+
'<block type="text">'+
'</block>'+
'</value>'+
'</block>'+
'<block type="text_length">'+
'</block>'+
'<block type="text_isEmpty">'+
'</block>'+
'<block type="text_indexOf">'+
'<value name="VALUE">'+
'<block type="variables_get">'+
'<title name="VAR">text'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="text_charAt">'+
'<value name="VALUE">'+
'<block type="variables_get">'+
'<title name="VAR">text'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="text_getSubstring">'+
'<value name="STRING">'+
'<block type="variables_get">'+
'<title name="VAR">text'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="text_changeCase">'+
'</block>'+
'<block type="text_trim">'+
'</block>'+
'<block type="text_print">'+
'</block>'+
'<block type="text_prompt">'+
'</block>'+
'</category>'+
'<category name="Lists" id="Lists">'+
'<block type="lists_create_empty">'+
'</block>'+
'<block type="lists_create_with">'+
'</block>'+
'<block type="lists_repeat">'+
'<value name="NUM">'+
'<block type="math_number">'+
'<title name="NUM">5'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="lists_length">'+
'</block>'+
'<block type="lists_isEmpty">'+
'</block>'+
'<block type="lists_indexOf">'+
'<value name="VALUE">'+
'<block type="variables_get">'+
'<title name="VAR">list'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="lists_getIndex">'+
'<value name="VALUE">'+
'<block type="variables_get">'+
'<title name="VAR">list'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="lists_setIndex">'+
'<value name="LIST">'+
'<block type="variables_get">'+
'<title name="VAR">list'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'<block type="lists_getSublist">'+
'<value name="LIST">'+
'<block type="variables_get">'+
'<title name="VAR">list'+
'</title>'+
'</block>'+
'</value>'+
'</block>'+
'</category>'+
'<category name="Colour">'+
'<block type="colour_picker">'+
'</block>'+
'<block type="colour_random">'+
'</block>'+
'<block type="colour_rgb">'+
'</block>'+
'<block type="colour_blend">'+
'</block>'+
'</category>    -->'+
'<category name="Variables" custom="VARIABLE" id="Variables">'+
'</category>'+
'<category name="Procedures" custom="PROCEDURE" id="Procedures">'+
'</category>'+
'</xml>';
};
