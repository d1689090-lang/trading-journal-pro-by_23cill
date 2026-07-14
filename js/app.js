// ================================
// Trading Journal Pro Dashboard
// ================================

// Ambil data trade
const trades = JSON.parse(localStorage.getItem("trades")) || [];

const modalAwal = 10000;

let totalProfit = 0;
let win = 0;
let lose = 0;

const tbody = document.getElementById("recentTrades");

// Tampilkan Trade
trades.forEach(trade => {

    totalProfit += Number(trade.profit);

    if (trade.result === "WIN") win++;
    if (trade.result === "LOSE") lose++;

    tbody.innerHTML += `
    <tr>
        <td>${trade.date}</td>
        <td>${trade.pair}</td>
        <td>${trade.side}</td>
        <td>${trade.profit}</td>
        <td>${trade.result}</td>
    </tr>
    `;

});

// Dashboard

document.getElementById("portfolio").innerHTML =
"$" + (modalAwal + totalProfit).toFixed(2);

document.getElementById("profit").innerHTML =
"$" + totalProfit.toFixed(2);

document.getElementById("win").innerHTML = win;

document.getElementById("lose").innerHTML = lose;

const totalTrade = win + lose;

document.getElementById("winrate").innerHTML =
totalTrade == 0
? "0%"
: ((win / totalTrade) * 100).toFixed(1) + "%";


// ================================
// Candlestick Chart
// ================================

const chart = LightweightCharts.createChart(

document.getElementById("chart"),

{

width: document.getElementById("chart").clientWidth,

height:550,

layout:{
background:{
color:"#1e293b"
},
textColor:"#ffffff"
},

grid:{
vertLines:{
color:"#2b3648"
},
horzLines:{
color:"#2b3648"
}
},

    crosshair:{
    mode: LightweightCharts.CrosshairMode.Normal,
},

const candle = chart.addCandlestickSeries();

candle.setData([
    {time:"2026-07-01",open:100,high:120,low:95,close:115},
    {time:"2026-07-02",open:115,high:125,low:110,close:120}
]);
    // =========================
// Dark Mode
// =========================

const themeBtn = document.getElementById("themeBtn");

// Cek tema yang tersimpan
if(localStorage.getItem("theme")=="light"){

    document.body.classList.add("light");

    themeBtn.innerHTML="🌞 Light Mode";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌞 Light Mode";

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});

window.addEventListener("resize", () => {
    chart.applyOptions({
        width: document.getElementById("chart").clientWidth
    });
});
