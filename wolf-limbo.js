coins = [
  "TRX",
  "USDT",
//  "LTC",
//  "DOGE",
 // "ADA",
 // "DOT",
 // "BNB",
//  "BCH",
//  "BTC",
//  "ETC",
//  "ETH",
//  "SUSHI",
//  "UNI",
//  "XLM",
//  "XRP",
//  "SHIB",
];
coins = coins.sort();
coin = coins[0];
token = JSON.parse(localStorage.getItem("token")).value;
tempPayout = 0;

async function addBot() {
  $("body").prepend(bot);
  let selectCoinElement = "";
  coins.map((c) => (selectCoinElement += `<option value="${c}">${c}</option>`));
  $("#jsBotCoin").html(selectCoinElement);

  dragElement(document.getElementById("mydiv"));
  makeScriptBox();
  checkbalance();
  bindButton();
  countTime();
  drawChart();
  loadLua();
}

function resetseed() {}

function playBet() {
  if (mode == "lua") {
    nextbet = fengari.load("return nextbet")();
    chance = fengari.load("return chance")();
    bethigh = fengari.load("return bethigh")();
  }

  if (chance < 0.01 || chance > 98)
    return stop(), alert("Min chance: 0.01\nMax chance: 98");

  previousbet = Number(nextbet);
  lastBet.amount = previousbet;
  lastBet.chance = Number(chance);
  tempPayout = 99 / Number(chance);

  if (run) sendBet();
}

async function sendBet() {
  try {
    const response = await $.ajax({
      url: "/api/v2/limbo/manual/play",
      method: "POST",
      dataType: "json",
      headers: {
        authorization: "Bearer " + token,
      },
      data: {
        currency: String(coin).toLowerCase(),
        game: "limbo",
        amount: `${Number(nextbet).toFixed(8)}`,
        rule: `${bethigh ? "over" : "under"}`,
        multiplier: `${tempPayout < 1.01 ? 1.01 : tempPayout.toFixed(2)}`,
        auto: 1,
      },
    });

    handleResult(response);
  } catch (error) {
    // console.log(error);
    if (error.status == 0 || error.status >= 500) sendBet();
  }
}

async function handleResult(data) {
  // console.log(data)
  bets++, betsChart++;
  currentprofit = Number(data.bet.profit);
  lastBet.profit = currentprofit;
  lastBet.nonce = data.bet.nonce;
  lastBet.roll =
    Number(data.bet.result_value) > 0
      ? bethigh
        ? 99 - Number(Number(99 / Number(data.bet.result_value)).toFixed(2))
        : Number(Number(99 / Number(data.bet.result_value)).toFixed(2))
      : 0;
  balance += currentprofit;
  profit += currentprofit;
  profitChart += currentprofit;
  target = `${Number(tempPayout).toFixed(2)}x`;

  handleStats();
  !disChart ? updateChart() : resetChart();
  updateHistory(
    lastBet.amount,
    target,
    `${data.bet.result_value}x`,
    currentprofit
  );

  if (mode == "lua") {
    sendLua();
  } else if (mode == "js") {
    dobet();
  } else if (mode == "advanced") {
    handleAdvanced();
  }

  if (win && sOW) return stop();
  if (run) return playBet();
}

async function checkbalance() {
  const response = await $.ajax({
    url: "/api/v1/user/balances",
    method: "GET",
    headers: {
      authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token")).value,
    },
  });
  const balances = response.balances;
  const item = balances.find(
    (balance) => balance.currency == String(coin).toLowerCase()
  );

  balance = Number(item.amount);
  fengari.load("balance=" + balance)();
  updateStats();
}
