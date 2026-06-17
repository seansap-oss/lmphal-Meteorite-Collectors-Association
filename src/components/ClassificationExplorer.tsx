import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { meteorites } from '../data/meteorites'

/**
 * ClassificationExplorer — Interactive data widget showing
 * the breakdown of meteorite classes in the collection.
 * Inspired by AMS's data-driven sidebar widgets.
 */

const classes = [
  {
    name: 'Iron',
    count: meteorites.filter((m) => m.classification === 'Iron').length,
    color: '#8C7A6B',
    description:
      'Composed primarily of nickel-iron alloy. Formed in the cores of differentiated asteroids. Distinguished by Widmanstätten patterns when etched.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6L6 12l6 6 6-6-6-6z" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Stony',
    count: meteorites.filter((m) => m.classification === 'Stony').length,
    color: '#6B7280',
    description:
      'Silicate-based meteorites, the most common type. Includes chondrites with primitive solar system material and achondrites from differentiated bodies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    name: 'Stony-Iron',
    count: meteorites.filter((m) => m.classification === 'Stony-Iron').length,
    color: '#B89B6A',
    description:
      'The rarest class. Pallasites contain olivine crystals in a metal matrix. Mesosiderites are brecciated mixtures of silicate and metal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="8" cy="10" r="2" fill="currentColor" opacity="0.15" />
        <circle cx="15" cy="14" r="2.5" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
]

const total = meteorites.length

export default function ClassificationExplorer() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative py-20 lg:py-28 bg-alabaster">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-meteor-bronze">
              Taxonomy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-2 leading-tight">
              Understanding<br />Meteorite Classification
            </h2>
            <p className="text-slate-muted mt-4 max-w-md leading-relaxed">
              Meteorites are classified by their composition and origin. Our collection
              spans all three major classes, each telling a distinct story of planetary formation.
            </p>

            {/* Class breakdown bars */}
            <div className="mt-8 space-y-4">
              {classes.map((cls) => {
                const pct = Math.round((cls.count / total) * 100)
                return (
                  <motion.div
                    key={cls.name}
                    className="cursor-pointer group"
                    onMouseEnter={() => setActive(cls.name)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span style={{ color: cls.color }}>{cls.icon}</span>
                        <span className="text-sm font-medium">{cls.name}</span>
                      </div>
                      <span className="text-xs text-slate-muted">
                        {cls.count} specimens &middot; {pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-ivory rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cls.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Donut chart visualization */}
            <div className="relative w-72 h-72 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {classes.map((cls, i) => {
                  const pct = cls.count / total
                  const circumference = 2 * Math.PI * 42
                  const offset = classes
                    .slice(0, i)
                    .reduce((sum, c) => sum + (c.count / total) * circumference, 0)
                  const isActive = active === cls.name
                  return (
                    <circle
                      key={cls.name}
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke={cls.color}
                      strokeWidth={isActive ? 10 : 7}
                      strokeDasharray={`${pct * circumference} ${circumference}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                      opacity={active === null || isActive ? 1 : 0.3}
                    />
                  )
                })}
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-center"
                    >
                      <span className="text-3xl font-display font-bold">
                        {classes.find((c) => c.name === active)?.count}
                      </span>
                      <span className="block text-xs text-slate-muted mt-0.5 tracking-wider uppercase">
                        {active}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="total"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <span className="text-3xl font-display font-bold">{total}</span>
                      <span className="block text-xs text-slate-muted mt-0.5 tracking-wider uppercase">
                        Total
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Description card */}
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-8 p-5 rounded-xl bg-warm-white border border-border-subtle"
                >
                  <p className="text-sm text-slate-muted leading-relaxed">
                    {classes.find((c) => c.name === active)?.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
