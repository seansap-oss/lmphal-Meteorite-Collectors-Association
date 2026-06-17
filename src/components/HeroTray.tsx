import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'
import { meteorites, type Meteorite } from '../data/meteorites'

/**
 * HeroTray — Editorial authority hero with featured specimen + event sidebar.
 *
 * Inspired by AMS's layout: large featured content on the left with a
 * data-driven sidebar on the right, plus the interactive tray below.
 * Elevated with luxury editorial aesthetics.
 */

const CARD_WIDTH = 300
const CARD_GAP = 24
const FOCUS_SCALE = 1.05

/** Recent "events" for the sidebar — gives it the AMS data-driven feel */
const recentEvents = [
  { date: 'Jun 14', location: 'Manipur, India', reports: 527, status: 'Investigating' },
  { date: 'Jun 10', location: 'Nagaland, India', reports: 189, status: 'Verified' },
  { date: 'Jun 8', location: 'Imphal Valley', reports: 91, status: 'Verified' },
  { date: 'Jun 2', location: 'Assam, India', reports: 316, status: 'Investigating' },
  { date: 'May 31', location: 'Mizoram, India', reports: 49, status: 'Pending' },
]

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

  useEffect(() => {
    const unsubscribe = dragX.on('change', (latest) => {
      const centerOffset = containerWidth / 2 - CARD_WIDTH / 2
      const rawIndex = (centerOffset - latest) / (CARD_WIDTH + CARD_GAP)
      const idx = Math.round(Math.abs(rawIndex))
      setActiveIndex(Math.min(Math.max(idx, 0), meteorites.length - 1))
    })
    return unsubscribe
  }, [dragX, containerWidth])

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
  const featured = meteorites[0]

  return (
    <section className="relative w-full overflow-hidden bg-alabaster">
      {/* ── Background watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.span
          key={activeMeteorite.classification}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.03, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-[14vw] lg:text-[10vw] font-bold uppercase tracking-tight text-obsidian select-none whitespace-nowrap"
        >
          {activeMeteorite.classification}
        </motion.span>
      </div>

      {/* ── Top Editorial Section: Featured + Sidebar ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — Featured Specimen (Editorial Style) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-meteor-bronze">
                  Featured Specimen
                </span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>

              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div className="relative h-[350px] lg:h-[420px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase text-obsidian">
                        {featured.classification}
                      </span>
                      <span className="px-2.5 py-0.5 bg-meteor-bronze/90 backdrop-blur-sm rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase text-white">
                        {featured.fallType}
                      </span>
                    </div>
                    <h1 className="font-display text-3xl lg:text-4xl font-semibold text-white leading-tight">
                      {featured.name}
                    </h1>
                    <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-white/50 text-xs">{featured.origin}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="text-white/50 text-xs">{featured.year}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="text-white/50 text-xs">{featured.mass}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Data Sidebar (AMS event list style) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Sidebar header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-meteor-bronze">
                  Recent Events
                </span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Total Specimens', value: '8' },
                  { label: 'This Month', value: '3' },
                  { label: 'Pending Review', value: '2' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl bg-warm-white border border-border-subtle text-center"
                  >
                    <span className="block font-display text-xl font-bold text-obsidian">
                      {stat.value}
                    </span>
                    <span className="text-[9px] text-slate-muted tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Event list */}
              <div className="space-y-0">
                {recentEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-4 py-3.5 border-b border-border-subtle last:border-0 group cursor-pointer hover:bg-warm-white/50 transition-colors -mx-2 px-2 rounded-lg"
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-ivory flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-obsidian leading-none">
                        {event.date.split(' ')[1]}
                      </span>
                      <span className="text-[9px] text-slate-muted uppercase tracking-wider">
                        {event.date.split(' ')[0]}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-obsidian truncate">
                        {event.location}
                      </p>
                      <p className="text-[11px] text-slate-muted">
                        {event.reports} community reports
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`flex-shrink-0 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        event.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : event.status === 'Investigating'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      {event.status}
                    </span>
                  </motion.div>
                ))}
              </div>

              <a
                href="#"
                className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-border-subtle text-xs font-medium text-slate-muted hover:text-obsidian hover:border-obsidian transition-all group"
              >
                Browse all events
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Interactive Tray Section ── */}
      <div className="relative z-10 mt-20 lg:mt-28">
        {/* Refined section divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-8">
          <div className="relative">
            {/* Double-line divider for editorial feel */}
            <div className="h-px bg-border-subtle" />
            <div className="h-px bg-border-subtle mt-px opacity-40" />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-meteor-bronze">
              The Collection
            </span>
            <div className="flex-1 h-px bg-border-subtle" />
            <span className="text-[10px] text-slate-muted tracking-wider">
              Drag to explore
            </span>
          </div>
        </div>

        <div ref={containerRef} className="w-full overflow-visible">
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
            className="flex gap-6 px-[calc(50vw-150px)] cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
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

        {/* Active specimen info bar */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-8">
          <motion.div
            key={activeMeteorite.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 py-4 border-t border-b border-border-subtle"
          >
            <div className="flex-1">
              <h3 className="font-display text-xl sm:text-2xl font-semibold">
                {activeMeteorite.name}
              </h3>
              <p className="text-slate-muted text-xs mt-0.5">
                {activeMeteorite.subclass && `${activeMeteorite.subclass} \u00B7 `}
                {activeMeteorite.origin}
              </p>
            </div>
            <div className="flex gap-6">
              {[
                { label: 'Class', value: activeMeteorite.classification },
                { label: 'Mass', value: activeMeteorite.mass },
                { label: 'Type', value: activeMeteorite.fallType },
              ].map((item) => (
                <div key={item.label} className="text-right">
                  <span className="block text-sm font-semibold text-obsidian font-display">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-slate-muted tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-20" />
    </section>
  )
}

/* ── Individual Tray Card (Refined) ── */
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

  const scale = useTransform(dragX, inputRange, [0.9, FOCUS_SCALE, 0.9])
  const y = useTransform(dragX, inputRange, [8, -10, 8])
  const opacity = useTransform(dragX, inputRange, [0.45, 1, 0.45])

  return (
    <motion.div
      className="flex-shrink-0 relative group"
      style={{ width: CARD_WIDTH, scale, y, opacity }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-warm-white border border-border-subtle group-hover:border-meteor-bronze/30 transition-all duration-500 group-hover:shadow-xl">
        {/* Image */}
        <div className="relative h-[360px] overflow-hidden">
          <img
            src={meteorite.image}
            alt={meteorite.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-obsidian">
              {meteorite.classification}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase ${
                meteorite.fallType === 'Observed Fall'
                  ? 'bg-meteor-bronze/90 text-white'
                  : 'bg-white/90 text-slate-muted'
              }`}
            >
              {meteorite.fallType === 'Observed Fall' ? 'Observed' : 'Found'}
            </span>
          </div>

          {/* Widmanstatten overlay */}
          {meteorite.classification === 'Iron' && (
            <div className="absolute inset-0 widmanstatten-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold leading-tight">
                {meteorite.name}
              </h3>
              <p className="text-[11px] text-slate-muted mt-0.5 tracking-wide">
                {meteorite.subclass && `${meteorite.subclass} \u00B7 `}
                {meteorite.origin}
              </p>
            </div>
            <span
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: meteorite.accentColor }}
            />
          </div>
          <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed">
            {meteorite.description}
          </p>
          <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between">
            <span className="text-[10px] text-slate-muted">
              {meteorite.year} &middot; {meteorite.mass}
            </span>
            <span className="text-[10px] font-medium text-meteor-bronze tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">
              Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
