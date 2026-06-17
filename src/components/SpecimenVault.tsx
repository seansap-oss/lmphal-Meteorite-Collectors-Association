import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { meteorites, type MeteoriteClass, type FallType } from '../data/meteorites'
import SpecimenPlacard from './SpecimenPlacard'
import { cn } from '../lib/utils'

/**
 * SpecimenVault — Filterable masonry exhibition grid.
 *
 * Features:
 * - Asynchronous filter by Class (Stony/Iron/Stony-Iron)
 * - Filter by Fall Type (Observed Fall / Found)
 * - Smooth layout transitions via AnimatePresence
 * - Museum exhibition placard aesthetic
 */

const classes: (MeteoriteClass | 'All')[] = ['All', 'Stony', 'Iron', 'Stony-Iron']
const fallTypes: (FallType | 'All')[] = ['All', 'Observed Fall', 'Found']

export default function SpecimenVault() {
  const [activeClass, setActiveClass] = useState<MeteoriteClass | 'All'>('All')
  const [activeFallType, setActiveFallType] = useState<FallType | 'All'>('All')

  const filtered = useMemo(() => {
    return meteorites.filter((m) => {
      const classMatch = activeClass === 'All' || m.classification === activeClass
      const fallMatch = activeFallType === 'All' || m.fallType === activeFallType
      return classMatch && fallMatch
    })
  }, [activeClass, activeFallType])

  return (
    <section id="specimens" className="relative py-24 lg:py-32 bg-ivory">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-meteor-bronze">
            The Specimen Vault
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 leading-tight">
            Explore Our Collection
          </h2>
          <p className="mt-4 text-slate-muted max-w-lg">
            Browse verified meteorite specimens catalogued by our research community.
            Each entry has been authenticated and classified.
          </p>
        </motion.div>

        {/* ── Filtration Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 mb-12"
        >
          {/* Class Filter */}
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-muted block mb-2.5">
              Classification
            </span>
            <div className="flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setActiveClass(cls)}
                  className={cn(
                    'px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300',
                    activeClass === cls
                      ? 'bg-obsidian text-white border-obsidian'
                      : 'bg-transparent text-slate-muted border-border-medium hover:border-obsidian hover:text-obsidian'
                  )}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Fall Type Filter */}
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-muted block mb-2.5">
              Fall Type
            </span>
            <div className="flex flex-wrap gap-2">
              {fallTypes.map((ft) => (
                <button
                  key={ft}
                  onClick={() => setActiveFallType(ft)}
                  className={cn(
                    'px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300',
                    activeFallType === ft
                      ? 'bg-meteor-bronze text-white border-meteor-bronze'
                      : 'bg-transparent text-slate-muted border-border-medium hover:border-meteor-bronze hover:text-meteor-bronze'
                  )}
                >
                  {ft}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Results Count ── */}
        <div className="mb-8">
          <span className="text-xs text-slate-muted tracking-wider">
            Showing{' '}
            <span className="text-obsidian font-medium">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'specimen' : 'specimens'}
          </span>
        </div>

        {/* ── Masonry Grid ── */}
        <div className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => (
              <SpecimenPlacard key={m.id} meteorite={m} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-display text-2xl text-slate-muted">
              No specimens match these filters.
            </p>
            <button
              onClick={() => {
                setActiveClass('All')
                setActiveFallType('All')
              }}
              className="mt-4 text-sm text-meteor-bronze underline underline-offset-4 hover:text-obsidian transition-colors"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
