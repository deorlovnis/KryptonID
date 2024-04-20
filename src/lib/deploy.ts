
import WalletJSON from '../../wallet/out/Wallet.sol/Wallet.json'
import { Account, Chain, CustomTransport, Hex, WalletClient, parseAbi } from 'viem'

const registryAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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
