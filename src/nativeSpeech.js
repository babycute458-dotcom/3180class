/** Native Capacitor helpers. Speech on iOS App uses MediaRecorder + Whisper (see main.js). */

import { Capacitor } from '@capacitor/core'

export function isNativeApp() {
  try {
    return !!Capacitor?.isNativePlatform?.()
  } catch {
    return false
  }
}

export function nativePlatformLabel() {
  try {
    return `${Capacitor.getPlatform()} / native=${Capacitor.isNativePlatform()}`
  } catch {
    return 'unknown'
  }
}

/**
 * Best-effort unlock of iOS AVAudioSession after speechSynthesis.
 * Must stay short; never throw.
 */
export async function releaseAudioSession() {
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  } catch {
    // ignore
  }

  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    if (ctx.state === 'suspended') {
      await Promise.race([
        ctx.resume(),
        new Promise((r) => window.setTimeout(r, 400)),
      ])
    }
    const buffer = ctx.createBuffer(1, 1, 22050)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    source.start(0)
    await new Promise((r) => window.setTimeout(r, 40))
    await ctx.close()
  } catch {
    // ignore
  }
}
