
import WalletJSON from '../../wallet/out/Wallet.sol/Wallet.json'
import { Account, Chain, CustomTransport, Hex, WalletClient, parseAbi } from 'viem'

const registryAddress = '0x1A4cC0146CB418bC3B54357bbE8166d2202F630D'

export const deployWallet = async (client: WalletClient<CustomTransport, Chain, Account>, pubKey: string) => {
  console.log(`DEPLOYING: ${pubKey} ADDRESS: ${client.account.address}`)
  return client.deployContract({
    abi: parseAbi(['constructor(string eIDPubKey, address registryAddress)']),
    bytecode: WalletJSON.bytecode.object as Hex,
    args: [
      pubKey,
      registryAddress
    ],
  })
}
