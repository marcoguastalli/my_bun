// Fetch the IP address from the external API and update the DOM
async function fetchIP() {
    try {
        // const response = await fetch('https://httpbin.org/ip', {
        //     mode: 'no-cors'  // Add no-cors mode
        // });
        const response = await fetch('http://localhost:3000/get-ip');
        const data = await response.json();
        const ip = data.origin; // The API returns the IP address in the 'origin' key

        // Find the div in the DOM and update it with the IP
        const ipDisplay = document.getElementById('ip-display');
        if (ipDisplay) {
            ipDisplay.textContent = `Your IP address is: ${ip}`;
        }
    } catch (error) {
        console.error('Error fetching IP:', error);
        const ipDisplay = document.getElementById('ip-display');
        if (ipDisplay) {
            ipDisplay.textContent = 'Failed to fetch IP address';
        }
    }
}

// Run the function on page load
window.onload = fetchIP;
