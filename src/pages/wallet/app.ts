import { getWalletAddress, initWalletClient, publicClient } from '../../lib/eth'

async function main() {
  const wc = await initWalletClient()

  const walletAddr = await getWalletAddress(publicClient, wc)

  console.log(walletAddr)
}

main()
