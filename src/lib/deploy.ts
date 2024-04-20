import { client } from './eth'
import WalletJSON from '../../wallet/out/Wallet.sol/Wallet.json'
import { Hex } from 'viem'

export const deployWallet = (pubKey: string) => {
  client.deployContract({
    abi: [{
      'type': 'constructor',
      'inputs': [{
        'name': 'eIDPubKey',
        'type': 'string',
        'internalType': 'string',
      }, {
        'name': 'oracleAddress',
        'type': 'address',
        'internalType': 'address',
      }],
      'stateMutability': 'nonpayable',
    }, {
      'type': 'function',
      'name': 'addEthereumAccount',
      'inputs': [{
        'name': 'account',
        'type': 'address',
        'internalType': 'address',
      }],
      'outputs': [],
      'stateMutability': 'nonpayable',
    }, {
      'type': 'function',
      'name': 'sendETH',
      'inputs': [{
        'name': 'eIDPubKey',
        'type': 'string',
        'internalType': 'string',
      }, {
        'name': 'to',
        'type': 'address',
        'internalType': 'address payable',
      }],
      'outputs': [],
      'stateMutability': 'payable',
    }, { 'type': 'error', 'name': 'AccessDenied', 'inputs': [] }] as const,
    bytecode: WalletJSON.bytecode.object as Hex,
    args: [
      pubKey,
      client.account.address,
    ],
  })
}
