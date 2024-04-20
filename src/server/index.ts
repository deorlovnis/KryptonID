import { p384 } from '@noble/curves/p384'
import { createServer } from 'node:http'
import { base64ToHex } from '../lib/format'


createServer((req, res) => {
  if (req.url === '/verify') {
    const walletSignature = req.headers['x-wallet-signature']
    const signature = req.headers['x-id-signature']
    const address = req.headers['x-address']

    if (!signature || !address) {
      res.statusCode = 400
      return res.end('Invalid Request!')
    }

    let sig = p384.Signature.fromCompact(base64ToHex(signature as string))

    sig = sig.addRecoveryBit(1)

    const pubKey = sig.recoverPublicKey(signature as string)

    
  }
}).listen(3000)