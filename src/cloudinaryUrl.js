/**
 * Injects Cloudinary on-the-fly transformations into a secure_url so the CDN
 * delivers a properly-sized, modern-format image instead of the raw original.
 *
 * Usage:  <img src={cldUrl(asset.secure_url, { w: 400, h: 200 })} />
 */

const UPLOAD_MARKER = '/upload/'

export default function cldUrl(secureUrl, { w, h, q = 'auto', f = 'auto', crop, blur } = {}) {
  if (!secureUrl || typeof secureUrl !== 'string') return secureUrl
  const idx = secureUrl.indexOf(UPLOAD_MARKER)
  if (idx === -1) return secureUrl

  const parts = []
  if (w) parts.push(`w_${w}`)
  if (h) parts.push(`h_${h}`)
  if (crop) parts.push(`c_${crop}`)
  if (blur) parts.push(`e_blur:${blur}`)
  if (q) parts.push(`q_${q}`)
  if (f) parts.push(`f_${f}`)
  if (parts.length === 0) return secureUrl

  const insertAt = idx + UPLOAD_MARKER.length
  return secureUrl.slice(0, insertAt) + parts.join(',') + '/' + secureUrl.slice(insertAt)
}

export function cldLqip(secureUrl) {
  return cldUrl(secureUrl, { w: 30, blur: 1000, q: 1, f: 'auto' })
}
