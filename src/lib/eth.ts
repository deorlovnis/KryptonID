import {
  Address,
  Hex,
  createTestClient,
  getContract,
  http,
  parseAbi,
  publicActions,
  walletActions,
  zeroAddress,
} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'
import { anvil } from 'viem/chains'

const account = privateKeyToAccount(process.env.ANVIL_ADMIN_PK as Hex)

export const client = createTestClient({
  mode: 'anvil',
  transport: http(anvil.rpcUrls.default[0]),
  chain: anvil,
  account
})
  .extend(publicActions)
  .extend(walletActions)

const oracleAbi = parseAbi([
  'function addUser(string memory eIDPubKey, address walletAddress) external',
  'function verifyUser(string memory eIDPubKey, address walletAddress) external view returns (bool)',
])

export const addUserToOracle = (pubKey: string, walletAddress: Address) => {
  return client.writeContract({
    abi: oracleAbi,
    functionName:'addUser',
    args: [pubKey, walletAddress],
    address: '0xaddr',
    chain: anvil,
    account,
  })
}
