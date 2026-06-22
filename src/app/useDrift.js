'use client'

/* ========================================================================
   useDrift — shared motion engine
   =========================================================================
   Drives an element so it drifts slowly around the PAGE, bounces gently off
   every edge, breathes its size, and stays proportionate to the viewport.
   Both inversion versions (v1 liquid blob, v2 dot screen) use this so they
   move identically — only their LOOK differs.

   MOTION MODEL: the element lives in PAGE coordinates (its host uses
   position:absolute), so it scrolls with the content. It roams the full page
   — left/right are clamped to the viewport width, top/bottom to the whole
   document height. It ALWAYS bounces off an edge: it never sails off-screen
   and never teleports back in from somewhere else. Smooth and continuous.

   Pass a ref to the element you want to move, plus a few options.
   ======================================================================== */
import { useEffect } from 'react'

const shortSide = () => Math.min(window.innerWidth, window.innerHeight)

// The box the blob is allowed to roam: full viewport width (no horizontal
// scroll on this site) by full document height (so it can drift down the page).
const roamW = () => document.documentElement.clientWidth
const roamH = () => Math.max(document.documentElement.scrollHeight, window.innerHeight)

export function useDrift(ref, { speed, minFrac, maxFrac, breathSpeed }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect users who prefer no motion (accessibility).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const angle = Math.random() * Math.PI * 2
    let vx = Math.cos(angle) * speed
    let vy = Math.sin(angle) * speed
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let breathT = Math.random() * Math.PI * 2
    let r = 0

    // Cache the roam bounds; reading layout every frame would cause jank.
    // Refresh them on resize and whenever the page's content height changes
    // (images loading, sections expanding, etc.).
    let W = roamW(), H = roamH()
    const measure = () => { W = roamW(); H = roamH() }
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    let last = performance.now()
    let raf = 0

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      breathT += dt * breathSpeed * Math.PI * 2
      const frac = minFrac + (Math.sin(breathT) * 0.5 + 0.5) * (maxFrac - minFrac)
      const size = frac * shortSide()
      r = size / 2

      x += vx * dt
      y += vy * dt

      // Always bounce: clamp back inside the edge and flip that velocity. The
      // blob can never leave the page, so it never disappears or jumps.
      if (x - r < 0)      { x = r;     vx = Math.abs(vx) }
      else if (x + r > W) { x = W - r; vx = -Math.abs(vx) }
      if (y - r < 0)      { y = r;     vy = Math.abs(vy) }
      else if (y + r > H) { y = H - r; vy = -Math.abs(vy) }

      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.transform = `translate(${x - r}px, ${y - r}px)`

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [ref, speed, minFrac, maxFrac, breathSpeed])
}
