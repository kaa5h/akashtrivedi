'use client'

/* ========================================================================
   useDrift — shared motion engine
   =========================================================================
   Drives an element so it drifts slowly around the screen, bounces off the
   edges, gently breathes its size, and stays proportionate to the viewport.
   Both inversion versions (v1 liquid blob, v2 dot screen) use this so they
   move identically — only their LOOK differs.

   Pass a ref to the element you want to move, plus a few options.
   ======================================================================== */
import { useEffect } from 'react'

const shortSide = () => Math.min(window.innerWidth, window.innerHeight)

export function useDrift(ref, { speed, minFrac, maxFrac, breathSpeed, bounceChance = 0.55 }) {
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

    let passing = false  // true = currently allowed to sail off-screen
    let touching = false // true = overlapping a wall last frame (so we decide once per contact)

    // Bring the blob back in from a random edge, heading inward, after it has
    // fully drifted off-screen.
    const respawn = () => {
      const edge = Math.floor(Math.random() * 4)
      const spread = (Math.random() - 0.5) * Math.PI * 0.6 // inward angle, up to ~54°
      const c = Math.cos(spread) * speed
      const s = Math.sin(spread) * speed
      const w = window.innerWidth, h = window.innerHeight
      if (edge === 0)      { x = -r;    y = Math.random() * h; vx = c;  vy = s }  // from left
      else if (edge === 1) { x = w + r; y = Math.random() * h; vx = -c; vy = s }  // from right
      else if (edge === 2) { y = -r;    x = Math.random() * w; vy = c;  vx = s }  // from top
      else                 { y = h + r; x = Math.random() * w; vy = -c; vx = s }  // from bottom
      passing = false
      touching = true // it starts at the wall while entering — don't re-decide yet
    }

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

      const w = window.innerWidth, h = window.innerHeight

      if (passing) {
        // Wait until it's completely gone, then bring it back from a random edge.
        const fullyOut = x + r < 0 || x - r > w || y + r < 0 || y - r > h
        if (fullyOut) respawn()
      } else {
        const hitL = x - r < 0, hitR = x + r > w, hitT = y - r < 0, hitB = y + r > h
        const hit = hitL || hitR || hitT || hitB
        if (hit && !touching) {
          // New wall contact — randomly bounce, or let it pass through and vanish.
          if (Math.random() < bounceChance) {
            if (hitL) { x = r; vx = Math.abs(vx) }
            if (hitR) { x = w - r; vx = -Math.abs(vx) }
            if (hitT) { y = r; vy = Math.abs(vy) }
            if (hitB) { y = h - r; vy = -Math.abs(vy) }
          } else {
            passing = true
          }
        }
        touching = hit
      }

      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.transform = `translate(${x - r}px, ${y - r}px)`

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ref, speed, minFrac, maxFrac, breathSpeed, bounceChance])
}
