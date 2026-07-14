const trades = JSON.parse(localStorage.getItem("trades")) || [];

let win = 0;
let lose = 0;
let totalProfit = 0;

let grossProfit = 0;
let grossLoss = 0;

let currentWinStreak = 0;
let currentLoseStreak = 0;

let maxWinStreak = 0;
let maxLoseStreak = 0;

let equity = [];

let balance = 10000;

let best = 0;
let worst = 0;

let highestBalance = balance;
let maxDrawdown = 0;

trades.forEach(t => {

    totalProfit += Number(t.profit);
    if (Number(t.profit) > 0) {
    grossProfit += Number(t.profit);
} else {
    grossLoss += Math.abs(Number(t.profit));
    }

    balance += Number(t.profit);

    if (balance > highestBalance) {
    highestBalance = balance;
}

const drawdown = highestBalance - balance;

if (drawdown > maxDrawdown) {
    maxDrawdown = drawdown;
}

    equity.push(balance);

    if(t.result=="WIN") win++;

    if(t.result=="LOSE") lose++;

    if (t.result == "WIN") {

    currentWinStreak++;
    currentLoseStreak = 0;

} else if (t.result == "LOSE") {

    currentLoseStreak++;
    currentWinStreak = 0;

}

if (currentWinStreak > maxWinStreak) {
    maxWinStreak = currentWinStreak;
}

if (currentLoseStreak > maxLoseStreak) {
    maxLoseStreak = currentLoseStreak;
}

    if(Number(t.profit)>best) best=Number(t.profit);

    if(Number(t.profit)<worst) worst=Number(t.profit);

});

const total = trades.length;

document.getElementById("totalTrade").innerHTML = total;

document.getElementById("win").innerHTML = win;

document.getElementById("lose").innerHTML = lose;

document.getElementById("profit").innerHTML =
"$"+totalProfit.toFixed(2);

document.getElementById("best").innerHTML =
"$"+best.toFixed(2);

document.getElementById("worst").innerHTML =
"$"+worst.toFixed(2);

const profitFactor =
grossLoss === 0
? grossProfit.toFixed(2)
: (grossProfit / grossLoss).toFixed(2);

document.getElementById("profitFactor").innerHTML =
profitFactor;

document.getElementById("drawdown").innerHTML =
"$" + maxDrawdown.toFixed(2);

document.getElementById("winRate").innerHTML =
total==0
?"0%"
:((win/total)*100).toFixed(1)+"%";

const ctx = document.getElementById("equityChart");

new Chart(ctx,{

type:"line",

data:{

labels:equity.map((_,i)=>"Trade "+(i+1)),

datasets:[{

label:"Equity",

data:equity,

borderWidth:3,

fill:false,

tension:.4

}]

}

});

// =========================
// Pie Chart WIN vs LOSE
// =========================

const resultCtx = document.getElementById("resultChart");

new Chart(resultCtx, {

    type: "pie",

    data: {

        labels: ["WIN", "LOSE"],

        datasets: [{

            data: [win, lose]

        }]

    }

});
