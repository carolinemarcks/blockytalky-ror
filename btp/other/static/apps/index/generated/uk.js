// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored) {
  return '<div style="display: none"><span id="subtitle">візуальне середовище програмування</span><span id="blocklyMessage">Blockly (Блоклі)</span><span id="codeTooltip">Див. згенерований код JavaScript. </span><span id="linkTooltip">Зберегти і пов\'язати з блоками.</span><span id="runTooltip">Запустіть програму, визначену блоками у робочій \\nобласті. </span><span id="runProgram">Запустити програму</span><span id="resetProgram">Очистити</span><span id="dialogOk">OK</span><span id="dialogCancel">Скасувати</span><span id="catLogic">Логіка</span><span id="catLoops">Петлі</span><span id="catMath">Математика</span><span id="catText">Текст</span><span id="catLists">Списки</span><span id="catColour">Колір</span><span id="catVariables">Змінні</span><span id="catProcedures">Процедури</span><span id="httpRequestError">Виникла проблема із запитом.</span><span id="linkAlert">Поділитися вашим блоками через посилання:\n\n%1</span><span id="hashError">На жаль, "%1" не відповідає жодній збереженій програмі.</span><span id="xmlError">Не вдалося завантажити ваш збережений файл.  Можливо, він був створений з іншої версії Blockly?</span><span id="listVariable">список</span><span id="textVariable">текст</span></div>';
};


apps.dialog = function(opt_data, opt_ignored) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null) + '</div>';
};


apps.ok = function(opt_data, opt_ignored) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof appsIndex == 'undefined') { var appsIndex = {}; }


appsIndex.messages = function(opt_data, opt_ignored) {
  return apps.messages(null) + '<div style="display: none"><span id="indexTitle">Програми Blockly</ span><span id="indexFooter">Блоклі - безкоштовне і відкрите програмне забезпечення. Щоб поділитися своїм кодом або перекладами Блоклі, щоб використовувати Блоклі для своїх додатків, завітайте %1.<span></div>';
};


appsIndex.start = function(opt_data, opt_ignored) {
  return appsIndex.messages(null) + '<table><tr><td><h1><span id="title">Програми Blockly</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr><tr><td>Блоклі - це графічне середовище програмування. Нижче наведені приклади додатків, що використовують Блоклі.</td></tr></table><table><tr><td><a href="puzzle/index.html"><img src="index/puzzle.png" height=80 width=100></a></td><td><div><a href="puzzle/index.html">Головоломка</a></div><div>Навчіться використовувати Blockly в інтерфейсі.</div></td></tr><tr><td><a href="maze/index.html"><img src="index/maze.png" height=80 width=100></a></td><td><div><a href="maze/index.html">Лабіринт</a></div><div>Використовуйте Блоклі, щоб пройти лабіринт.</div></td></tr><tr><td><a href="turtle/index.html"><img src="index/turtle.png" height=80 width=100></a></td><td><div><a href="turtle/index.html">Графіка Черепахи</a></div><div>Використовуйте Blockly, щоб малювати.</div></td></tr><tr><td><a href="graph/index.html"><img src="index/graph.png" height=80 width=100></a></td><td><div><a href="graph/index.html">Графічний калькулятор</a></div><div>Побудуйте графік функції з Блоклі.</div></td></tr><tr><td><a href="code/index.html"><img src="index/code.png" height=80 width=100></a></td><td><div><a href="code/index.html">Код</a></div><div>Експортувати Blockly програму на JavaScript, Python або XML.</div></td></tr><tr><td><a href="plane/index.html"><img src="index/plane.png" height=80 width=100></a></td><td><div><a href="plane/index.html">Калькулятор місць у літаку</a></div><div>Розв\'язуйте математичну задачу з однією або двома змінними.</div></td></tr><tr><td><a href="blockfactory/index.html"><img src="index/blockfactory.png" height=80 width=100></a></td><td><div><a href="blockfactory/index.html">Фабрика блоків</a></div><div>Створіть свої блоки, використовуючи Блоклі.</div></td></tr></table><p><span id="footer_prefix"></span><a href="http://blockly.googlecode.com/">blockly.googlecode.com</a><span id="footer_suffix"></span>';
};
