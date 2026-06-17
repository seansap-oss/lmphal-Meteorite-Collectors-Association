import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'
import { meteorites, type Meteorite } from '../data/meteorites'

/**
 * HeroTray — The master interactive horizontal carousel.
 *
 * Features:
 * - Drag-to-scroll with momentum / physics-based spring
 * - Center-focus parallax: active card scales up, shifts vertically
 * - Background classification title updates based on active item
 * - Responsive card widths via viewport-relative sizing
 */

const CARD_WIDTH = 340
const CARD_GAP = 32
const FOCUS_SCALE = 1.06

export default function HeroTray() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(1200)

  const dragX = useMotionValue(0)
  const totalWidth = meteorites.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maxDrag = Math.max(0, totalWidth - containerWidth + 80)

  /** Track which card is closest to center */
  useEffect(() => {
    const unsubscribe = dragX.on('change', (latest) => {
      const centerOffset = containerWidth / 2 - CARD_WIDTH / 2
      const rawIndex = (centerOffset - latest) / (CARD_WIDTH + CARD_GAP)
      const idx = Math.round(Math.abs(rawIndex))
      setActiveIndex(Math.min(Math.max(idx, 0), meteorites.length - 1))
    })
    return unsubscribe
  }, [dragX, containerWidth])

  /** Snap to nearest card on drag end */
  const handleDragEnd = useCallback(() => {
    const centerOffset = containerWidth / 2 - CARD_WIDTH / 2
    const rawIndex = (centerOffset - dragX.get()) / (CARD_WIDTH + CARD_GAP)
    const snapped = Math.round(Math.abs(rawIndex))
    const target = Math.min(Math.max(snapped, 0), meteorites.length - 1)
    const targetX = centerOffset - target * (CARD_WIDTH + CARD_GAP)
    animate(dragX, Math.max(-maxDrag, Math.min(0, targetX)), {
      type: 'spring',
      stiffness: 300,
      damping: 40,
      mass: 0.8,
    })
  }, [containerWidth, dragX, maxDrag])

  const activeMeteorite = meteorites[activeIndex]

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-alabaster">
      {/* ── Massive Background Classification Title ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.span
          key={activeMeteorite.classification}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.04, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-[10vw] font-bold uppercase tracking-tight text-obsidian select-none whitespace-nowrap"
        >
          {activeMeteorite.classification}
        </motion.span>
      </div>

      {/* ── Decorative Lines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      {/* ── Section Header ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-meteor-bronze">
            The Collection
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold mt-3 leading-[1.1]">
            Galactic Museum
          </h1>
          <p className="mt-4 text-slate-muted max-w-lg text-base lg:text-lg">
            Drag to explore our curated specimens. Each fragment tells a story
            billions of years in the making.
          </p>
        </motion.div>
      </div>

      {/* ── The Tray ── */}
      <div ref={containerRef} className="relative z-10 w-full overflow-visible">
        <motion.div
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 40,
          }}
          style={{ x: dragX }}
          onDragEnd={handleDragEnd}
          className="flex gap-8 px-[calc(50vw-170px)] sm:px-[calc(50vw-170px)] cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {meteorites.map((m, i) => (
            <TrayCard
              key={m.id}
              meteorite={m}
              index={i}
              dragX={dragX}
              containerWidth={containerWidth}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Active Specimen Info ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-6">
        <motion.div
          key={activeMeteorite.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-8"
        >
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              {activeMeteorite.name}
            </h2>
            <p className="text-slate-muted text-sm mt-1">
              {activeMeteorite.origin} &middot; {activeMeteorite.year}
            </p>
          </div>
          <div className="flex gap-6 text-xs tracking-wider uppercase text-slate-muted">
            <div>
              <span className="block text-obsidian font-semibold text-lg font-display">
                {activeMeteorite.classification}
              </span>
              Class
            </div>
            <div>
              <span className="block text-obsidian font-semibold text-lg font-display">
                {activeMeteorite.mass}
              </span>
              Mass
            </div>
            <div>
              <span className="block text-obsidian font-semibold text-lg font-display">
                {activeMeteorite.fallType}
              </span>
              Type
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Hint Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-slate-light">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-5"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span className="text-xs tracking-widest uppercase">Drag to explore</span>
      </div>
    </section>
  )
}

/* ── Individual Tray Card ── */
function TrayCard({
  meteorite,
  index,
  dragX,
  containerWidth,
}: {
  meteorite: Meteorite
  index: number
  dragX: MotionValue<number>
  containerWidth: number
}) {
  const cardCenter = index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
  const screenCenter = containerWidth / 2

  const inputRange = [
    cardCenter - screenCenter - CARD_WIDTH,
    cardCenter - screenCenter,
    cardCenter - screenCenter + CARD_WIDTH,
  ]

  const scale = useTransform(dragX, inputRange, [0.88, FOCUS_SCALE, 0.88])
  const y = useTransform(dragX, inputRange, [10, -12, 10])
  const opacity = useTransform(dragX, inputRange, [0.5, 1, 0.5])

  return (
    <motion.div
      className="flex-shrink-0 relative group"
      style={{
        width: CARD_WIDTH,
        scale,
        y,
        opacity,
      }}
    >
      {/* Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-warm-white border border-border-subtle group-hover:border-meteor-bronze/30 transition-colors duration-500">
        {/* Image */}
        <div className="relative h-[420px] overflow-hidden">
          <img
            src={meteorite.image}
            alt={meteorite.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Classification Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-obsidian">
              {meteorite.classification}
            </span>
          </div>

          {/* Widmanstatten pattern overlay on Iron hover */}
          {meteorite.classification === 'Iron' && (
            <div className="absolute inset-0 widmanstatten-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold leading-tight">
                {meteorite.name}
              </h3>
              <p className="text-xs text-slate-muted mt-1 tracking-wide">
                {meteorite.subclass && `${meteorite.subclass} \u00B7 `}
                {meteorite.origin}
              </p>
            </div>
            <span
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: meteorite.accentColor }}
            />
          </div>
          <p className="text-sm text-slate-muted mt-3 line-clamp-2 leading-relaxed">
            {meteorite.description}
          </p>
          <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
            <span className="text-xs text-slate-muted">
              {meteorite.year} &middot; {meteorite.mass}
            </span>
            <span className="text-xs font-medium text-meteor-bronze tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">
              View &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
