/**
 * Blockly Apps: Code
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
 * @fileoverview JavaScript for Blockly's Code application.
 * @author fraser@google.com (Neil Fraser)
 */

// Supported languages.

BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  en: ['English', 'ltr', 'en_compressed.js'],
  de: ['Deutsch', 'ltr', 'de_compressed.js'],
  hu: ['Magyar', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js'],
  'zh-tw': ['中國的', 'ltr', 'zh_tw_compressed.js']
};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="static/' +
               BlocklyApps.LANG + '.js"></script>\n');

/*
 * Get jquery 
 */
function getScript(url, success) {
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0],
    done = false;
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
	if (!done && (!this.readyState
           || this.readyState == 'loaded'
		      || this.readyState == 'complete')) {
            done = true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
	}
    };
    head.appendChild(script);
}
getScript('/static/jquery.js',function() {})


document.writeln('<link rel="stylesheet" type="text/css" href="/static/hopscotch-0.1.1.css">')
document.writeln("<script src='/static/hopscotch-0.1.1.js' type='text/javascript'></script>");
document.writeln("<script src='/static/stomp.js' type='text/javascript'></script>");
document.writeln("<script src='/static/sockjs.js' type='text/javascript'></script>");


// Blockly tour (with hopscotch)
var tour = {
id: "hello-bt",
showPrevButton: true,

steps: [
    {
	title: "Welcome to BlockyTalky",
	content: "This is a guided tour of BlockyTalky. Press next to continue.",
	target: "btimg",
	placement: "right"
    },
    {
	title: "The Toolbox",
	content: "This is the toolbox, which contains all of the blocks you will need to program your BTU (BlockyTalky Unit).",
	target: "toolbox",
	placement: "right",
	xOffset: 120,
	yOffset: 70
    },
    {
	title: "The Toolbox: Logic",
	content: "If statements, logical comparators, and more.",
	target: "Logic",
	placement: "right",
	xOffset: 120,
	yOffset: 100
    },
    {
	title: "The Toolbox: Loops",
	content: "While loops, counters, for-each loops.",
	target: "Loops",
	placement: "right",
	xOffset: 120,
	yOffset: 120
    },
    {
	title: "The Toolbox: BT Messaging",
	content: "Sending messages between BTUs.",
	target: "BTM",
	placement: "right",
	xOffset: 120,
	yOffset: 145
    },
    {
	title: "The Toolbox: Facebook",
	content: "Get information from your Facebook account.",
	target: "FB",
	placement: "right",
	xOffset: 120,
	yOffset: 165
    },
    {
	title: "The Toolbox: Motors",
	content: "Control motors and read in encoder values.",
	target: "Motors",
	placement: "right",
	xOffset: 120,
	yOffset: 190
    },
    {
	title: "The Toolbox: Sensors/LEDs",
	content: "Read in from NXT sensors and control the LEDs on the BrickPi.",
	target: "SLED",
	placement: "right",
	xOffset: 120,
	yOffset: 210
    },
    {
	title: "The Toolbox: GPIO",
	content: "Use the GPIO (General Purpose Input/Output) pins of the Raspberry Pi.",
	target: "GPIO",
	placement: "right",
	xOffset: 120,
	yOffset: 230
    },
    {
	title: "The Toolbox: Math",
	content: "Numbers, calculations, trig functions, and random number generators.",
	target: "Math",
	placement: "right",
	xOffset: 120,
	yOffset: 250
    },
    {
	title: "The Toolbox: Variables",
	content: "Set and get variables.",
	target: "Variables",
	placement: "right",
	xOffset: 120,
	yOffset: 275
    },
    {
	title: "The Toolbox: Procedures",
	content: "Create and call procedures.",
	target: "Procedures",
	placement: "right",
	xOffset: 120,
	yOffset: 295
    },
    {
	title: "Controlling your BTU: Running code",
	content: "Run the current code on the BlockyTalky unit",
	target: "runButton",
	placement: "bottom"
    },
    {
	title: "Controlling your BTU: Stopping code",
	content: "Stop the currently running code on the BlockyTalky unit",
	target: "stopButton",
	placement: "bottom"
    },
    {
	title: "Controlling your BTU: Uploading code",
	content: "Upload your current code to the BlockyTalky unit",
	target: "uploadButton",
	placement: "bottom"
    },
    {
	title: "Controlling your BTU: Loading code",
	content: "Load the existing code on the BlockyTalky unit",
	target: "loadButton",
	placement: "bottom"
    },
    {
	title: "Controlling your BTU: Clearing workspace",
	content: "Delete all blocks in the workspace",
	target: "trashButton",
	placement: "bottom"
    },
    {
	title: "Status Bar",
	content: "Shows the current status of your BTU.",
	target: "status",
	placement: "left"
    },
    {
	title: "That's it!",
	content: "Time to try BlockyTalky yourself!",
	target: "btimg",
	placement: "right"
    }
      
  ]
};

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', /*'javascript'*/, 'python', 'xml'];

var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BlocklyApps.getMsg('badXml').replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var x in TABS_) {
    document.getElementById('tab_' + TABS_[x]).className = 'taboff';
    document.getElementById('content_' + TABS_[x]).style.display = 'none';
  }

  // Select the active tab.
  selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  var content = document.getElementById('content_' + selected);
  content.style.display = 'block';
  renderContent();
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
function renderContent() {
  var content = document.getElementById('content_' + selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
  } else if (content.id == 'content_python') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Python');
  }
}

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
  window.Blockly = blockly;
  BlocklyApps.init();

  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
  var ws = new SockJS('http://' + window.location.hostname + ':55674/stomp');
  var client = Stomp.over(ws);
  client.heartbeat.outgoing = 0;
  client.heartbeat.incoming = 0;

var d = new Date();
var previousTime = d.getTime();

var on_connect = function() {
        client.subscribe("/queue/HwVal2", on_message);
        console.log('connected');
    };
var on_error =  function() {
        console.log('error');
    };
var on_message = function(m) {
        values = JSON.parse(m.body);
        var s1 = document.getElementById("sensor1").value
        var s2 = document.getElementById("sensor2").value
        var s3 = document.getElementById("sensor3").value
        var s4 = document.getElementById("sensor4").value
        console.log(s4);
        var d = new Date();

        currentTime = d.getTime();
        if((currentTime - previousTime) > 1){
        if(s1 == "none"){
          $("#sensorval1").val("-");}
        if(s1 != "none"){
          $("#sensorval1").val(values.content.sensors[0]);}
        if(s2 == "none"){
          $("#sensorval2").val("-");}
        if(s2 != "none"){
          $("#sensorval2").val(values.content.sensors[1]);}
        if(s3 == "none"){
          $("#sensorval3").val("-");}
        if(s3 != "none"){
          $("#sensorval3").val(values.content.sensors[2]);}
        if(s4 == "none"){
          $("#sensorval4").val("-");}
        if(s4 != "none"){
          $("#sensorval4").val(values.content.sensors[3]);}
        previousTime = d.getTime(); }

}

client.connect('guest', 'guest', on_connect, on_error, '/');

  // Make the 'Blocks' tab line up with the toolbox.
  window.setTimeout(function() {
      if (Blockly.Toolbox.width) {
        document.getElementById('tab_blocks').style.minWidth =
            (Blockly.Toolbox.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
      }
  }, 1);

  BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  tabClick('tab_' + selected);
  document.getElementById('tab_xml').style.display = 'none';
  document.getElementById('tab_python').style.display = 'none';

}

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
function runJS() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw BlocklyApps.getMsg('timeout');
    }
  };
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(BlocklyApps.getMsg('badCode').replace('%1', e));
  }
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
}


/**
 * Custom functions
 */

function uploadToRobot() {
    $("#status").val("Uploading code...");
    setTimeout(finishUpload, 1)
    
    //alert("Code uploaded to robot");
}

function finishUpload()
{
   var xml = getXML();
    var url = getIP()+"upload";
    $.ajax({
	type: 'POST',
	async: false,
	url: url,
	data: xml,
	success: function(response){
	    console.log(response);
	},
	error: function(response) {
	    console.log(response);
	}
    });
    
    $("#status").val("Code uploaded to robot.");
}

function runRobot() {
    var xml = "a";
    var url = getIP()+"run";   
    $.ajax({
	type: 'POST',
	url: url,
	data: xml,
	success: function(response){
	    console.log(response);
	},
	error: function(response) {
	    console.log(response);
	}
    });

  $("#status").val("Code running on robot...");
}

function getIP() {
    var currenturl= document.URL;
    //console.log(currenturl);
    var url= currenturl.substring(0,currenturl.length - 7);
    console.log(url);
    return url;
}

function getXML() {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    //console.log(xmlText);
    //console.log(xmlText[4]);
    if(xmlText[4]== ">") {
	xmlText= xmlText.substring(5);
	var url= '<xml xmlns="http://www.w3.org/1999/xhtml">';
	xmlText= url+xmlText;
	//console.log(xmlText);
    }
    var plainxml= removeWhite(xmlText);
    return plainxml;
}


function updateSensors(){
  var sensor1 = document.getElementById('sensor1').value;
  var sensor2 = document.getElementById('sensor2').value;
  var sensor3 = document.getElementById('sensor3').value;
  var sensor4 = document.getElementById('sensor4').value;

  var url = getIP()+"update";
  var data = {"sensor1":sensor1,
              "sensor2":sensor2,
              "sensor3":sensor3,
              "sensor4":sensor4}
  //var json_string = JSON.stringify(data)
  //console.log(data);
  $.ajax({
  type: 'POST',
  url: url,
  data: data,
  success: function(response){
      console.log(response);
  },
  error: function(response) {
      console.log(response);
  }
    });

}

function stopRobot() {
    $("#status").val("Robot stopped.");
    var url = getIP()+"stop";
   var xml = "a"
    $.ajax({
	type: 'POST',
	url: url,
	data: xml,
	success: function(response){
	    console.log(response);
	},
	error: function(response) {
	    console.log(response);
	}
    });

  document.getElementById('tab_xml').style.display = 'none';

    
}

function runTour(){
    hopscotch.startTour(tour);
}

function removeWhite(data) {
    var newData= "";
    var b= false;
    for(var i=0; i<data.length;i++) {
	if(data.charAt(i)=='\n') {
	    b= true;
        }
	else if((b==true) && (data.charAt(i)== '<')) {
	    b= false;
            newData+=data[i];
        }
	else if(b==false) {
	    newData+=data[i];
	}
    }
  //  console.log(newData);
    return newData;
}

function loadCode() {
    $("#status").val("Code loaded from robot.");

    $.get('/load', function(data) {
	$("#tab_xml").click();
	$("#textarea_xml").val(data);
	//alert(data);
	$("#tab_blocks").click();
    });

}

function toPython(data) {
    var id= 'tab_python';
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').className == 'tabon') {
	var xmlTextarea = document.getElementById('textarea_xml');
	var xmlText = data;
	var xmlDom = null;
	try {
	    xmlDom = Blockly.Xml.textToDom(xmlText);
	} catch (e) {
	        var q =
		window.confirm(MSG.badXml.replace('%1', e));
	    if (!q) {
		// Leave the user on the XML tab.
		return;
	    }
	}
	if (xmlDom) {
	    Blockly.mainWorkspace.clear();
	    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
	}
    }

    // Deselect all tabs and hide all panes.
    for (var x in TABS_) {
	document.getElementById('tab_' + TABS_[x]).className = 'taboff';
	document.getElementById('content_' + TABS_[x]).style.display = 'none';
    }
    // Select the active tab.
    selected = id.replace('tab_', '');
    document.getElementById(id).className = 'tabon';
    // Show the selected pane.
    var content = document.getElementById('content_' + selected);
    content.style.display = 'block';


    if (content.id == 'content_blocks') {
        // If the workspace was changed by the XML tab, Firefox will have performed
        // an incomplete rendering due to Blockly being invisible.  Rerender.
       // Blockly.mainWorkspace.render();
    } else if (content.id == 'content_xml') {
        var xmlTextarea = document.getElementById('textarea_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        xmlTextarea.value = xmlText;
        xmlTextarea.focus();
    } else if (content.id == 'content_javascript') {
        content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
    } else if (content.id == 'content_python') {
        content.innerHTML = Blockly.Generator.workspaceToCode('Python');
    }


    //renderContent();
    return content.innerHTML;
}
