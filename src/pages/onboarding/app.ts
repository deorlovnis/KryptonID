import { getPublicKeyFromWebEID } from "../../lib"

const btn = document.getElementById('auth-button') as HTMLButtonElement

btn.addEventListener('click', async () => {
  await getPublicKeyFromWebEID()
})