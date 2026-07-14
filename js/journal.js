// =====================================
// Trading Journal Pro
// =====================================

// Ambil data dari LocalStorage
let trades = JSON.parse(localStorage.getItem("trades")) || [];

// Ambil elemen
const form = document.getElementById("tradeForm");
const tradeList = document.getElementById("tradeList");

const imageInput = document.getElementById("image");

let imageBase64 = "";

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        imageBase64 = reader.result;

        document.getElementById("preview").innerHTML = `
            <img src="${imageBase64}"
                 style="width:220px;
                        margin-top:15px;
                        border-radius:10px;
                        border:2px solid #22c55e;">
        `;

    };

    reader.readAsDataURL(file);

});

// Tampilkan trade saat halaman dibuka
renderTrades();

// Simpan Trade
form.addEventListener("submit", function(e){

    e.preventDefault();

    const trade = {

        id: Date.now(),

        date: document.getElementById("date").value,

        pair: document.getElementById("pair").value.toUpperCase(),

        side: document.getElementById("side").value,

        entry: Number(document.getElementById("entry").value),

        exit: Number(document.getElementById("exit").value),

        sl: Number(document.getElementById("sl").value),

        tp: Number(document.getElementById("tp").value),

        lot: Number(document.getElementById("lot").value),

        profit: Number(document.getElementById("profit").value),

        result: document.getElementById("result").value,

        note: document.getElementById("note").value

        note: document.getElementById("note").value,

image: imageBase64

    };

    trades.push(trade);

    saveTrades();

    renderTrades();

    form.reset();

});

// Simpan ke LocalStorage
function saveTrades(){

    localStorage.setItem("trades", JSON.stringify(trades));

}

// =====================================
// Render Table
// =====================================

function renderTrades(){

    tradeList.innerHTML = "";

    trades.forEach((trade,index)=>{

        tradeList.innerHTML += `

        <tr>

        <td>${trade.date}</td>

        <td>${trade.pair}</td>

        <td>${trade.side}</td>

        <td>$${trade.profit}</td>

        <td>${trade.result}</td>

        <td>

        <button onclick="editTrade(${index})">
✏️
</button>

<button onclick="showImage('${trade.image}')">
📷
</button>

<button onclick="deleteTrade(${index})">
🗑
</button>

        </td>

        </tr>

        `;

    });

}

// =====================================
// Delete Trade
// =====================================

function editTrade(index){
   ...
}

function deleteTrade(index){
   ...
}

function showImage(img){
   ...
}

    const trade = trades[index];

    document.getElementById("date").value = trade.date;
    document.getElementById("pair").value = trade.pair;
    document.getElementById("side").value = trade.side;
    document.getElementById("entry").value = trade.entry;
    document.getElementById("exit").value = trade.exit;
    document.getElementById("sl").value = trade.sl;
    document.getElementById("tp").value = trade.tp;
    document.getElementById("lot").value = trade.lot;
    document.getElementById("profit").value = trade.profit;
    document.getElementById("result").value = trade.result;
    document.getElementById("note").value = trade.note;

    imageBase64 = trade.image || "";

    if(imageBase64){
        document.getElementById("preview").innerHTML = `
            <img src="${imageBase64}"
                 style="width:220px;
                        margin-top:15px;
                        border-radius:10px;
                        border:2px solid #22c55e;">
        `;
    }else{
        document.getElementById("preview").innerHTML = "";
    }

    // Hapus data lama agar setelah disimpan menjadi versi terbaru
    trades.splice(index, 1);
    saveTrades();
    renderTrades();

    }{

    if(!img){

        alert("Screenshot belum tersedia.");

        return;

    }

    const win = window.open("", "_blank");

    win.document.write(`
        <html>
        <head>
            <title>Screenshot Trade</title>
        </head>
        <body style="margin:0;background:#111827;display:flex;justify-content:center;align-items:center;height:100vh;">
            <img src="${img}" style="max-width:100%;max-height:100%;">
        </body>
        </html>
    `);

    }

    if(confirm("Hapus trade?"))
    
    // =====================================
// Export CSV
// =====================================

function exportCSV() {

    if (trades.length === 0) {
        alert("Belum ada data trade.");
        return;
    }

    let csv =
"Date,Pair,Side,Entry,Exit,SL,TP,Lot,Profit,Result,Note\n";

    trades.forEach(trade => {

        csv +=
`${trade.date},
${trade.pair},
${trade.side},
${trade.entry},
${trade.exit},
${trade.sl},
${trade.tp},
${trade.lot},
${trade.profit},
${trade.result},
"${trade.note}"\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "trading-journal.csv";

    a.click();

    URL.revokeObjectURL(url);

}{

        trades.splice(index,1);
        
        saveTrades();

        renderTrades();

    }

}

// =====================================
// Filter Trade
// =====================================

function filterTrades() {

    const filter = document.getElementById("filterResult").value;

    tradeList.innerHTML = "";

    trades.forEach((trade, index) => {

        if (filter !== "ALL" && trade.result !== filter) {
            return;
        }

        tradeList.innerHTML += `
        <tr>
            <td>${trade.date}</td>
            <td>${trade.pair}</td>
            <td>${trade.side}</td>
            <td>$${trade.profit}</td>
            <td>${trade.result}</td>
            <td>
                <button onclick="editTrade(${index})">✏️</button>
                <button onclick="showImage('${trade.image}')">📷</button>
                <button onclick="deleteTrade(${index})">🗑️</button>
            </td>
        </tr>
        `;
    });

}
