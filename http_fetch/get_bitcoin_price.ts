const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
const json = await response.json();
console.log(json.bitcoin.usd);