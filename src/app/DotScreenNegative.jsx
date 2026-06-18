'use client'

/* ========================================================================
   v2 — DOT-SCREEN NEGATIVE
   =========================================================================
   The inversion shows through a fine grid of dots, like a risograph / print
   halftone screen drifting across the page. White fill + mix-blend-mode:
   difference still inverts the colour behind it, but a dotted mask only lets
   the inversion through in little points — so it reads as a textured print
   screen instead of a solid shape. A soft circular falloff feathers the edge.

   To EDIT the feel, tweak the numbers in the CONFIG block below.
   ======================================================================== */
import { useRef } from 'react'
import { useDrift } from './useDrift'

// ---- CONFIG (safe to tweak) -------------------------------------------
const SPEED = 40           // drift speed in pixels per second
const MIN_FRAC = 0.30      // smallest size, as a fraction of the screen's short side
const MAX_FRAC = 0.48      // largest size, as a fraction of the screen's short side
const BREATH_SPEED = 0.008 // how fast the size changes. Very slow.
const DOT_GAP = 9          // spacing between dots, in pixels (smaller = finer screen)
const DOT_FILL = 32        // how fat each dot is, in % (bigger = denser inversion)
// -----------------------------------------------------------------------

export default function DotScreenNegative() {
  const ref = useRef(null)
  useDrift(ref, { speed: SPEED, minFrac: MIN_FRAC, maxFrac: MAX_FRAC, breathSpeed: BREATH_SPEED })

  // Two stacked masks: a tiled dot pattern, intersected with a soft circular
  // falloff so the screen of dots fades out gently at the blob's edge.
  const dotMask = `radial-gradient(circle, #000 ${DOT_FILL}%, transparent ${DOT_FILL + 2}%)`
  const edgeMask = 'radial-gradient(circle, #000 46%, transparent 72%)'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#fff',
        mixBlendMode: 'difference',
        maskImage: `${dotMask}, ${edgeMask}`,
        WebkitMaskImage: `${dotMask}, ${edgeMask}`,
        maskSize: `${DOT_GAP}px ${DOT_GAP}px, 100% 100%`,
        WebkitMaskSize: `${DOT_GAP}px ${DOT_GAP}px, 100% 100%`,
        maskRepeat: 'repeat, no-repeat',
        WebkitMaskRepeat: 'repeat, no-repeat',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, width, height',
      }}
    />
  )
}
