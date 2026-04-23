async function loadData() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
  );
  const data = await res.json();

  document.getElementById("btc").innerHTML =
    `<h3>Bitcoin</h3><p>$${data.bitcoin.usd}</p>`;

  document.getElementById("eth").innerHTML =
    `<h3>Ethereum</h3><p>$${data.ethereum.usd}</p>`;

  document.getElementById("sol").innerHTML =
    `<h3>Solana</h3><p>$${data.solana.usd}</p>`;

  const table = document.getElementById("table-body");
  table.innerHTML = "";

  for (let coin in data) {
    table.innerHTML += `
      <tr>
        <td>${coin}</td>
        <td>$${data[coin].usd}</td>
      </tr>
    `;
  }

  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["BTC", "ETH", "SOL"],
      datasets: [{
        label: "Price",
        data: [
          data.bitcoin.usd,
          data.ethereum.usd,
          data.solana.usd
        ]
      }]
    }
  });
}

loadData();
setInterval(loadData, 10000);
