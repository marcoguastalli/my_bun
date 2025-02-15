# rpc server client v1

### 1st time setup
- `cd ~/dev/repository/gitjs/my_bun/rpc_server_client_v1`
- `bun init`
- `bun add @trpc/server @trpc/client zod`

### run
- `cd ~/dev/repository/gitjs/my_bun/rpc_server_client_v1`
- `pnpm i`
- `bun run rpc_server.ts`
- http://localhost:4000/trpc/getUser?input=123
- {"id":"123","name":"John Doe"}
- `bun run rpc_client.ts`

http://localhost:4000/trpc/getUser?input="123"