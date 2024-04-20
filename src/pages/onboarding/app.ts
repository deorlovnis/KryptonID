import { deployWallet } from '../../lib/eth'
import { getPublicKeyFromWebEID } from '../../lib/eid'
import { initWalletClient } from '../../lib/eth'

const btn = document.getElementById('auth-button') as HTMLButtonElement

btn.addEventListener('click', async (e) => {
  const pubKey = await getPublicKeyFromWebEID()

  const walletClient = await initWalletClient()

  const hash = await deployWallet(walletClient, pubKey)

  alert(`Transaction sent: https://sepolia.etherscan.io/tx/${hash}`)

  location.href = '/wallet'
})
