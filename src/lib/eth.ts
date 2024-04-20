import 'viem/window'
import { Address, createWalletClient, custom, parseAbi } from 'viem'
import { anvil } from 'viem/chains'

const [account] = await window.ethereum!.request({
  method: 'eth_requestAccounts',
})

export const client = createWalletClient({
  account,
  transport: custom(window.ethereum!),
  chain: anvil,
})

const oracleAbi = parseAbi([
  'function addUser(string memory eIDPubKey, address walletAddress) external',
  'function verifyUser(string memory eIDPubKey, address walletAddress) external view returns (bool)',
])

const walletAbi = parseAbi([
  'constructor(string memory eIDPubKey, address[] memory _accountsArray, address oracleAddress)',
  'function sendETH(address payable to) external payable',
])

export const addUserToOracle = (pubKey: string, walletAddress: Address) => {
  return client.writeContract({
    abi: oracleAbi,
    functionName: 'addUser',
    args: [pubKey, walletAddress],
    address: '0xaddr',
    chain: anvil,
    account,
  })
}
