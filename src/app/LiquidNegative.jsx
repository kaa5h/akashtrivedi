'use client'

/* ========================================================================
   v1 — LIQUID NEGATIVE
   =========================================================================
   An organic, slowly-morphing blob that inverts the colour of whatever is
   behind it (white fill + mix-blend-mode: difference). Text stays sharp,
   just negated. Soft feathered edges + a forever shape-shift keep it from
   reading as a hard "ball".

   To EDIT the feel, tweak the numbers in the CONFIG block below.
   ======================================================================== */
import { useRef } from 'react'
import { useDrift } from './useDrift'

// ---- CONFIG (safe to tweak) -------------------------------------------
const SPEED = 38           // drift speed in pixels per second
const MIN_FRAC = 0.26      // smallest size, as a fraction of the screen's short side
const MAX_FRAC = 0.40      // largest size, as a fraction of the screen's short side
const BREATH_SPEED = 0.008 // how fast the size changes. Very slow.
const EDGE_SOFTNESS = 40   // how feathered the edge is, in pixels
const MORPH_SECONDS = 18   // how long one full shape-morph takes (higher = slower)
const BOUNCE_CHANCE = 0.6  // chance it bounces off an edge vs. drifting off-screen (0–1)
const FALLBACK = '#dcdcdc' // inversion colour before the palette has loaded
// -----------------------------------------------------------------------

export default function LiquidNegative() {
  const ref = useRef(null)
  useDrift(ref, { speed: SPEED, minFrac: MIN_FRAC, maxFrac: MAX_FRAC, breathSpeed: BREATH_SPEED, bounceChance: BOUNCE_CHANCE })

  return (
    <>
      <style>{`
        @keyframes liquidMorph {
          0%, 100% { border-radius: 70% 30% 38% 62% / 63% 35% 65% 37%; }
          20%      { border-radius: 33% 67% 70% 30% / 30% 58% 42% 70%; }
          40%      { border-radius: 64% 36% 34% 66% / 38% 70% 30% 62%; }
          60%      { border-radius: 30% 70% 58% 42% / 66% 38% 62% 34%; }
          80%      { border-radius: 58% 42% 70% 30% / 35% 64% 36% 65%; }
        }
      `}</style>
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          // The fill colour follows the nav palette slider (page.jsx publishes
          // it as --inv-color); the inversion picks up the theme's hue.
          background: `var(--inv-color, ${FALLBACK})`,
          mixBlendMode: 'difference',
          filter: `blur(${EDGE_SOFTNESS}px)`,
          animation: `liquidMorph ${MORPH_SECONDS}s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform, width, height, border-radius',
        }}
      />
    </>
  )
}
