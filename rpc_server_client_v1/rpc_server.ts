import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

// Define a simple router for the RPC API
const appRouter = t.router({
    getUser: t.procedure.input(z.string()).query((opts) => {
        return { id: opts.input, name: 'John Doe' };  // Simulated user lookup
    }),
    createUser: t.procedure
        .input(z.object({ name: z.string().min(5), email: z.string().email() }))
        .mutation((opts) => {
            return { message: `User ${opts.input.name} created successfully!` };
        }),
});

// Function to handle tRPC requests
async function handleTRPCRequest(req: Request) {
    const url = new URL(req.url);

    try {
        // Check if the request is for the getUser procedure
        if (url.pathname === '/trpc/getUser') {
            const input = new URLSearchParams(url.search).get('input');
            if (input) {
                // Call the tRPC procedure and return the result
                const result = await appRouter.getUser({
                    input,
                    ctx: undefined,
                    rawInput: input,
                    path: '',
                    type: 'query'
                });
                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // Check if the request is for the createUser procedure
        if (url.pathname === '/trpc/createUser') {
            const body = await req.json();
            if (body) {
                // Call the tRPC procedure and return the result
                const result = await appRouter.createUser(body);
                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // If no matching path, return 404
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        // Return error response in JSON format
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
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
