import 'viem/window'
import {
  Account,
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  custom,
  CustomTransport,
  Hex,
  http,
  PublicClient,
  WalletClient,
} from 'viem'
import { sepolia } from 'viem/chains'
import { registryAbi, walletAbi, walletBytecode } from './abi'

export const registryAddress = '0x63225358e699dC432C8818Fd99e017928EBcf6cA'

export const publicClient = createPublicClient({
  transport: http('https://sepolia.drpc.org'),
})

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

type Client = WalletClient<CustomTransport, Chain, Account>

export const deployWallet = async (
  client: Client,
  pubKey: string,
) => {
  console.log(`DEPLOYING: ${pubKey} ADDRESS: ${client.account.address}`)
  return client.deployContract({
    abi: walletAbi,
    bytecode: walletBytecode,
    args: [
      pubKey,
      registryAddress,
    ],
  })
}

export const getWalletAddressWithPubkey = async (
  pc: PublicClient,
  wc: Client,
) => {
  const wallet = await pc.readContract({
    abi: registryAbi,
    functionName: 'ownersToWallets',
    args: [wc.account.address],
    address: registryAddress,
  })
  const pubKey = await pc.readContract({
    abi: registryAbi,
    functionName: 'walletsToPubkeys',
    args: [wallet],
    address: registryAddress,
  })

  return { pubKey, wallet }
}

export const sendETH = async (
  client: Client,
  pubKey: string,
  value: bigint,
  to: Address,
  walletAddress: Address
) => {
  return client.writeContract({
    abi: walletAbi,
    args: [pubKey, to, value],
    functionName: 'sendETH',
    address: walletAddress,
  })
}
