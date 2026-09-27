import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Cal.com signs each webhook with HMAC-SHA256 of the raw request body using the
 * webhook's secret, sent hex-encoded in the `X-Cal-Signature-256` header.
 */
export function verifyCalSignature(rawBody: string, signature: string | null, secret: string | undefined): boolean {
  if (!secret || !signature) return false
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"))
  const received = Buffer.from(signature)
  return expected.length === received.length && timingSafeEqual(expected, received)
}
