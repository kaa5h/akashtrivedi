'use client'

/* ========================================================================
   INVERSION EFFECT — version switch
   =========================================================================
   Pick which drifting inversion shows on the site by changing VERSION:
     1  =  Liquid Negative   (smooth organic morphing blob)
     2  =  Dot-Screen Negative (halftone / risograph dot screen)
   Save the file and the browser updates automatically.
   ======================================================================== */
import LiquidNegative from './LiquidNegative'
import DotScreenNegative from './DotScreenNegative'

const VERSION = 1 // ← change to 1 or 2

export default function InvertingBall() {
  return VERSION === 1 ? <LiquidNegative /> : <DotScreenNegative />
}
