import { BaseError, decodeErrorResult } from 'viem'
import { deployWallet } from '../../lib/deploy'
import { getPublicKeyFromWebEID } from '../../lib/eid'
import { createClient } from '../../lib/eth'

const btn = document.getElementById('auth-button') as HTMLButtonElement

btn.addEventListener('click', async () => {
  const pubKey = await getPublicKeyFromWebEID()

  const client = await createClient()

  const hash = await deployWallet(client, pubKey)

  console.log(hash)
})
