import 'viem/window'
import { createWalletClient, custom } from 'viem'
import { anvil, sepolia } from 'viem/chains'

export const initWalletClient = async () => {
  const [account] = await window.ethereum!.request({
    method: 'eth_requestAccounts',
  })
  
  return createWalletClient({
    account,
    transport: custom(window.ethereum!),
    chain: sepolia,
  })
}