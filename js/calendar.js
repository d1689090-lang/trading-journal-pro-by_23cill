const trades = JSON.parse(localStorage.getItem("trades")) || [];

const events = trades.map(trade => {

    let color = "#facc15";

    if(trade.result=="WIN") color="#22c55e";

    if(trade.result=="LOSE") color="#ef4444";

    return{

        title:`${trade.pair} ${trade.profit}$`,

        start:trade.date,

        color:color

    }

});

document.addEventListener("DOMContentLoaded",()=>{

const calendar = new FullCalendar.Calendar(

document.getElementById("calendar"),

{

initialView:"dayGridMonth",

height:"auto",

events:events

}

);

calendar.render();

});
