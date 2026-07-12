const trades = JSON.parse(localStorage.getItem("trades")) || [];

let win = 0;
let lose = 0;
let totalProfit = 0;

let equity = [];

let balance = 10000;

let best = 0;
let worst = 0;

trades.forEach(t => {

    totalProfit += Number(t.profit);

    balance += Number(t.profit);

    equity.push(balance);

    if(t.result=="WIN") win++;

    if(t.result=="LOSE") lose++;

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
