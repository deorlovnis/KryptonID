import { parseEther, zeroAddress } from 'viem'
import {
  getWalletAddressWithPubkey,
  initWalletClient,
  publicClient,
  sendETH,
} from '../../lib/eth'

async function main() {
  const wc = await initWalletClient()

  const { pubKey, wallet } = await getWalletAddressWithPubkey(publicClient, wc)

  console.log(pubKey, wallet)

  sendETH(wc, pubKey, parseEther('1'), zeroAddress)
}

main()
