// client.ts
import { createTRPCProxyClient, httpLink } from '@trpc/client';
import fetch from 'node-fetch';

// Create a client for the tRPC server
const trpc = createTRPCProxyClient({
    links: [
        httpLink({
            url: 'http://localhost:4000/trpc',
            fetch: fetch as any,
        }),
    ],
});

// Example usage of the RPC client
async function run() {
    try {
        // Call the getUser RPC (corrected the way to call the query)
        const user = await trpc.getUser.query('123');
        console.log('User:', user);

    } catch (err) {
        console.error('Error:', err);
    }
}

run().catch(console.error);
