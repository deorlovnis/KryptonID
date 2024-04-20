import * as webeid from '@web-eid/web-eid-library/web-eid'
import { SignatureHashFunction } from '@web-eid/web-eid-library/models/SignatureAlgorithm'
import { p384 } from '@noble/curves/p384'
import { Hex } from 'viem'

const encoder = new TextEncoder()

const base64ToHex = (b64: string) => {
  const decodedBytes = atob(b64)

  let hexStr = ''
  for (let i = 0; i < decodedBytes.length; i++) {
    const hex = decodedBytes.charCodeAt(i).toString(16)
    hexStr += hex.length === 2 ? hex : '0' + hex
  }
  return hexStr as Hex
}

export const getPublicKeyFromWebEID = async () => {

  const { certificate } = await webeid.getSigningCertificate({ lang: 'en' })

  const message = 'Signing in with KryptonID'

  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashBinary = new Uint8Array(hashBuffer)
  const hashArray = Array.from(hashBinary)

  const base64String = btoa(String.fromCharCode.apply(null, hashArray));
  const hash = base64String.slice(0, 44)

  const { signature } = await webeid.sign(
    certificate,
    hash,
    'SHA-256' as SignatureHashFunction,
  )

  const sig = p384.Signature.fromCompact(base64ToHex(signature))

  const pubKey = sig.recoverPublicKey('idk').toHex()
}