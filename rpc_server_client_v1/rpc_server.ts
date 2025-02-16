import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

// Define a simple router for the RPC API
const appRouter = t.router({
    getUser: t.procedure.input(z.string()).query(async (opts) => {
        // Simulated user lookup
        return { id: opts.input, name: 'John Doe' };
    }),
    createUser: t.procedure
        .input(z.object({ name: z.string().min(5), email: z.string().email() }))
        .mutation(async (opts) => {
            // Simulate user creation
            return { message: `User ${opts.input.name} created successfully!` };
        }),
});

// Create a function to handle the request and call tRPC procedures
async function handleTRPCRequest(req: Request) {
    const url = new URL(req.url);

    try {
        // Check for 'getUser' query
        if (url.pathname === '/trpc/getUser') {
            const input = new URLSearchParams(url.search).get('input');
            if (input) {
                // Call the tRPC procedure using the `createCaller` method
                const caller = appRouter.createCaller({});
                const result = await caller.getUser(input); // Calling the procedure correctly
                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                });
            }
        }

        // Check for 'createUser' mutation (ensure POST request)
        if (url.pathname === '/trpc/createUser' && req.method === 'POST') {
            const body = await req.json();
            if (body) {
                // Call the tRPC procedure using the `createCaller` method
                const caller = appRouter.createCaller({});
                const result = await caller.createUser(body); // Calling the procedure correctly
                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                });
            }
        }

        // If no matching path, return 404
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });

    } catch (error) {
        // Return error response in JSON format
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
    }
}

// Start the Bun server and handle requests
Bun.serve({
    fetch(req) {
        return handleTRPCRequest(req);
    },
    port: 4000,
});

console.log('Server running at http://localhost:4000');
