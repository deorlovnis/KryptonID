import { createPublicClient, http } from 'viem'
import { deployWallet } from '../../lib/deploy'
import { getPublicKeyFromWebEID } from '../../lib/eid'
import { initWalletClient } from '../../lib/eth'

const btn = document.getElementById('auth-button') as HTMLButtonElement

btn.addEventListener('click', async () => {
  const pubKey = await getPublicKeyFromWebEID()

  const walletClient = await initWalletClient()
  const pc = createPublicClient({transport:http('http://127.0.0.1:8545')})

  console.log({pubKey})
  const hash = await deployWallet(walletClient, pubKey)

  console.log(hash)
})
