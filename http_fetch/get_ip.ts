const response = await fetch("https://httpbin.org/ip");
const json = await response.json();
console.log(json);