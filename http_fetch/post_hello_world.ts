const response = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify({ message: "Hello from Bun!" }),
    headers: { "Content-Type": "application/json" },
  });
  
  const body = await response.json();
  console.log(body);