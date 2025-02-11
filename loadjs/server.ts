import fetch from "node-fetch"; // Bun doesn't have fetch by default, so we'll use node-fetch

// Set up the server using Bun.serve()
Bun.serve({
    fetch(request) {
        // Handle the request for the "/get-ip" endpoint
        if (request.url.endsWith("/get-ip")) {
            return fetch("https://httpbin.org/ip")
                .then((response: { json: () => any; }) => response.json())
                .then((data: any) => {
                    return new Response(JSON.stringify(data), {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*", // Enable CORS
                        },
                    });
                })
                .catch((err: any) => {
                    console.error("Error fetching IP:", err);
                    return new Response("Failed to fetch IP address", { status: 500 });
                });
        }
        // If the request doesn't match, return a 404 response
        return new Response("Not Found", { status: 404 });
    },
    port: 3000, // Specify the port number
});

console.log("Server running at http://localhost:3000");
