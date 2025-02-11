Bun.serve({
    fetch(request) {
        const url = new URL(request.url);

        switch (url.pathname) {
            case "/get-ip":
                return fetch("https://httpbin.org/ip")
                    .then((response) => response.json())
                    .then((data) => {
                        return new Response(JSON.stringify(data), {
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                        });
                    })
                    .catch((err) => {
                        console.error("Error fetching IP:", err);
                        return new Response("Failed to fetch IP address", { status: 500 });
                    });

            case "/about":
                return new Response("This is the about page");

            // Add more routes as needed
            default:
                return new Response("Not Found", { status: 404 });
        }
    },
    port: 3000,
});

console.log("Server running at http://localhost:3000");
