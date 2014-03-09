/**
 * Blockly Demo: Storage
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
"use strict";var BlocklyStorage={};BlocklyStorage.backupBlocks_=function(){if("localStorage"in window){var o=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace),e=window.location.href.split("#")[0];window.localStorage.setItem(e,Blockly.Xml.domToText(o))}},BlocklyStorage.backupOnUnload=function(){window.addEventListener("unload",BlocklyStorage.backupBlocks_,!1)},BlocklyStorage.restoreBlocks=function(){var o=window.location.href.split("#")[0];if("localStorage"in window&&window.localStorage[o]){var e=Blockly.Xml.textToDom(window.localStorage[o]);Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,e)}},BlocklyStorage.link=function(){var o=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace),e=Blockly.Xml.domToText(o);BlocklyStorage.makeRequest_("/storage","xml",e)},BlocklyStorage.retrieveXml=function(o){Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);BlocklyStorage.makeRequest_("/storage","key",o)},BlocklyStorage.httpRequest_=null,BlocklyStorage.makeRequest_=function(o,e,l){BlocklyStorage.httpRequest_&&BlocklyStorage.httpRequest_.abort(),BlocklyStorage.httpRequest_=new XMLHttpRequest,BlocklyStorage.httpRequest_.name=e,BlocklyStorage.httpRequest_.onreadystatechange=BlocklyStorage.handleRequest_,BlocklyStorage.httpRequest_.open("POST",o),BlocklyStorage.httpRequest_.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),BlocklyStorage.httpRequest_.send(e+"="+encodeURIComponent(l))},BlocklyStorage.handleRequest_=function(){if(4==BlocklyStorage.httpRequest_.readyState){if(200!=BlocklyStorage.httpRequest_.status)window.alert(BlocklyApps.getMsg("httpRequestError")+"  httpRequest_.status: "+BlocklyStorage.httpRequest_.status);else{var o=BlocklyStorage.httpRequest_.responseText.trim();"xml"==BlocklyStorage.httpRequest_.name?(window.location.hash=o,window.alert(BlocklyApps.getMsg("linkAlert").replace("%1",window.location.href))):"key"==BlocklyStorage.httpRequest_.name&&(o.length?BlocklyStorage.loadXml_(o):window.alert(BlocklyApps.getMsg("hashError").replace("%1",window.location.hash))),BlocklyStorage.monitorChanges_()}BlocklyStorage.httpRequest_=null}},BlocklyStorage.monitorChanges_=function(){function o(){var o=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace),e=Blockly.Xml.domToText(o);l!=e&&(window.location.hash="",Blockly.removeChangeListener(t))}var e=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace),l=Blockly.Xml.domToText(e),t=(Blockly.mainWorkspace.getCanvas(),Blockly.addChangeListener(o))},BlocklyStorage.loadXml_=function(o){try{o=Blockly.Xml.textToDom(o)}catch(e){return window.alert(BlocklyApps.getMsg(xmlError)+"\nxml: "+o),void 0}Blockly.mainWorkspace.clear(),Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,o)};