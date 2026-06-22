'use client'

/* ========================================================================
   v1 — LINE-RECOLOUR ORB
   =========================================================================
   A circle that drifts over the page. Its fill stays the SAME as the page
   background (dark) — so it doesn't read as a solid disc — while the bright
   elements behind it (grid lines, the 3D wireframe, text) get recoloured.

   How: backdrop-filter sepia() → saturate() → hue-rotate(). sepia keeps dark
   areas dark but turns light pixels into a colour; saturate makes that colour
   vivid; hue-rotate spins it to whatever hue you want. So the background under
   the orb is unchanged, and only the lines/elements pick up the colour.

   A thin white ring marks the circle's edge. No inversion of the background,
   no solid white fill.

   To EDIT the feel, tweak the CONFIG numbers below.
   ======================================================================== */
import { useRef } from 'react'
import { useDrift } from './useDrift'

// ---- CONFIG (safe to tweak) -------------------------------------------
const SPEED = 38            // drift speed in pixels per second
const MIN_FRAC = 0.26       // smallest size, as a fraction of the screen's short side
const MAX_FRAC = 0.40       // largest size, as a fraction of the screen's short side
const BREATH_SPEED = 0.008  // how fast the size breathes. Very slow.

const LINE_HUE = 190        // the colour the lines/elements turn, in degrees (0=red, 90=green, 190=blue, 300=magenta)
const LINE_VIVID = 3        // how vivid that colour is (1 = faint, 5 = punchy)
const RING_ALPHA = 0.4      // opacity of the thin white outline (0 = no ring, 1 = solid white)
// -----------------------------------------------------------------------

// sepia(1) tints light pixels (leaves dark pixels dark), saturate boosts it,
// hue-rotate spins it to LINE_HUE. Dark page background → stays dark; bright
// lines → coloured.
const FILTER = `sepia(1) saturate(${LINE_VIVID}) hue-rotate(${LINE_HUE}deg)`

export default function LiquidNegative() {
  const ref = useRef(null)
  useDrift(ref, { speed: SPEED, minFrac: MIN_FRAC, maxFrac: MAX_FRAC, breathSpeed: BREATH_SPEED })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        // 'absolute' (not 'fixed') anchors the orb to the PAGE, so it scrolls
        // with the content instead of following the viewport.
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '50%',
        // Transparent fill = the page background shows through unchanged. The
        // filter recolours only the bright elements behind the orb.
        background: 'transparent',
        backdropFilter: FILTER,
        WebkitBackdropFilter: FILTER,
        // Thin white outline so the circle's edge is visible.
        border: `1px solid rgba(255,255,255,${RING_ALPHA})`,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, width, height',
      }}
    />
  )
}
