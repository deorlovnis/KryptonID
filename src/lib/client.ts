import { createTestClient, http } from "viem";
import { anvil } from "viem/chains";

export const client = createTestClient({
  mode:'anvil',
  transport: http(anvil.rpcUrls.default[0])
})