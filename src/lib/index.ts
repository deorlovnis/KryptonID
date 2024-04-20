import * as webeid from '@web-eid/web-eid-library/web-eid'
import { SignatureHashFunction } from '@web-eid/web-eid-library/models/SignatureAlgorithm'
import { p384 } from '@noble/curves/p384'
import { base64ToHex } from './utils'
import { Hex } from 'viem'

const encoder = new TextEncoder()

export const getPublicKeyFromWebEID = async (): Promise<Hex> => {

  const { certificate } = await webeid.getSigningCertificate({ lang: 'en' })

  const message = 'Signing in with KryptonID'

  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-384', data)
  const hashBinary = new Uint8Array(hashBuffer)
  const hashArray = Array.from(hashBinary)

  const hash = btoa(String.fromCharCode.apply(null, hashArray));

  const { signature } = await webeid.sign(
    certificate,
    hash,
    'SHA-384' as SignatureHashFunction,
  )

  let sig = p384.Signature.fromCompact(base64ToHex(signature))

  sig = sig.addRecoveryBit(1)

  return sig.recoverPublicKey(hashBinary).toHex() as Hex
}