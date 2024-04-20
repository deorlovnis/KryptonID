import { getPublicKeyFromWebEID } from '../../lib/eid'

const btn = document.getElementById('auth-button') as HTMLButtonElement

btn.addEventListener('click', async () => {
  await getPublicKeyFromWebEID()
})
