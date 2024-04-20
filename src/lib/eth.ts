import 'viem/window'
import { createWalletClient, custom } from 'viem'
import { anvil } from 'viem/chains'

export const createClient = async () => {
  const [account] = await window.ethereum!.request({
    method: 'eth_requestAccounts',
  })
  
  return createWalletClient({
    account,
    transport: custom(window.ethereum!),
    chain: anvil,
  })
}