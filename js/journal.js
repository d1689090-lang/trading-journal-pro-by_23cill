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

function deleteTrade(index){

    if(confirm("Hapus trade?")){

        trades.splice(index,1);
        
        saveTrades();

        renderTrades();

    }

}
