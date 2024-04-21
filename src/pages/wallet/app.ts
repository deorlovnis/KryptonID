import { Address, formatEther, parseEther } from 'viem'
import {
  getWalletAddressWithPubkey,
  initWalletClient,
  publicClient,
  sendETH,
} from '../../lib/eth'

const form = document.getElementById('form') as HTMLFormElement

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const currentTarget = e.currentTarget as HTMLFormElement

  if (currentTarget.reportValidity()) {
    const fd = new FormData(e.currentTarget as HTMLFormElement)

    const wc = await initWalletClient()

    const { pubKey } = await getWalletAddressWithPubkey(publicClient, wc)

    sendETH(
      wc,
      pubKey,
      parseEther(fd.get('amount') as string),
      fd.get('addr') as Address,
    )
  }
})

const deposit = document.getElementById('deposit') as HTMLFormElement

deposit.addEventListener('submit', async (e) => {
  e.preventDefault()

  const currentTarget = e.currentTarget as HTMLFormElement

  if (currentTarget.reportValidity()) {
    const fd = new FormData(e.currentTarget as HTMLFormElement)

    const wc = await initWalletClient()

    const { wallet } = await getWalletAddressWithPubkey(publicClient, wc)

    const eth = parseEther(fd.get('amount') as string)

    wc.sendTransaction({
      to: wallet,
      value:eth,
    })
  }
})

setInterval(async () => {
  const wc = await initWalletClient()

  const { wallet } = await getWalletAddressWithPubkey(publicClient, wc)

  const balance = await publicClient.getBalance({
    address: wallet,
  })

  const div = document.getElementById('balance') as HTMLElement

  div.textContent = formatEther(balance)
}, 1000)

window.onload = async () => {
  const wc = await initWalletClient()
  const { wallet } = await getWalletAddressWithPubkey(publicClient, wc)
  const addr = document.getElementById('short_addr') as HTMLElement
  console.log(wallet)
  addr.textContent = wallet
}