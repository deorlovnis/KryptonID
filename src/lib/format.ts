import { Hex } from '@noble/curves/abstract/utils'

export const base64ToHex = (b64: string) => {
  const decodedBytes = atob(b64)

  let hexStr = ''
  for (let i = 0; i < decodedBytes.length; i++) {
    const hex = decodedBytes.charCodeAt(i).toString(16)
    hexStr += hex.length === 2 ? hex : '0' + hex
  }
  return hexStr as Hex
}
