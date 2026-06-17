import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Meteorite } from '../data/meteorites'
import { cn } from '../lib/utils'

/**
 * SpecimenPlacard — Museum-style exhibition card (Enhanced).
 *
 * Upgrades from AMS inspiration:
 * - Community contribution badge (photo credit style like AMS)
 * - Richer metadata row with contributor info
 * - Classification-specific visual accents
 * - Cleaner hierarchy with editorial typography
 */

interface SpecimenPlacardProps {
  meteorite: Meteorite
  index: number
}

export default function SpecimenPlacard({ meteorite, index }: SpecimenPlacardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const heightClass = {
    tall: 'h-[480px]',
    medium: 'h-[380px]',
    short: 'h-[300px]',
  }[meteorite.height]

  return (
    <motion.article
      className="masonry-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div
        className="specimen-card group relative rounded-2xl overflow-hidden bg-warm-white border border-border-subtle hover:border-meteor-bronze/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={cn('relative overflow-hidden', heightClass)}>
          <motion.img
            src={meteorite.image}
            alt={meteorite.name}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Hover Overlay — Structure Reveal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-obsidian/40 backdrop-blur-[2px]" />
            <div className="relative z-10 text-center px-6">
              {meteorite.classification === 'Iron' && (
                <div className="widmanstatten-overlay absolute inset-0 rounded-xl opacity-40" />
              )}
              {meteorite.classification === 'Stony-Iron' && (
                <div
                  className="absolute inset-0 rounded-xl opacity-30"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 40%, rgba(184,155,106,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(184,155,106,0.3) 0%, transparent 40%)',
                  }}
                />
              )}
              {meteorite.classification === 'Stony' && (
                <div
                  className="absolute inset-0 rounded-xl opacity-20"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
                  }}
                />
              )}
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative z-10 text-white text-[11px] tracking-[0.2em] uppercase font-medium"
              >
                {meteorite.classification === 'Iron'
                  ? 'Widmanst\u00e4tten Pattern'
                  : meteorite.classification === 'Stony-Iron'
                  ? 'Olivine Crystal Matrix'
                  : 'Chondritic Structure'}
              </motion.span>
            </div>
          </motion.div>

          {/* Top badges */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full z-20">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-obsidian">
              {meteorite.classification}
            </span>
          </div>
          <div className="absolute top-4 left-4 z-20">
            <span
              className={cn(
                'px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase',
                meteorite.fallType === 'Observed Fall'
                  ? 'bg-meteor-bronze/90 text-white'
                  : 'bg-white/90 text-slate-muted'
              )}
            >
              {meteorite.fallType === 'Observed Fall' ? 'Observed' : 'Found'}
            </span>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-white to-transparent" />
        </div>

        {/* Card Content — Editorial Placard Style */}
        <div className="p-6 pt-3">
          {/* Accent line */}
          <div
            className="w-8 h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:w-14"
            style={{ backgroundColor: meteorite.accentColor }}
          />

          <h3 className="font-display text-xl font-semibold leading-tight">
            {meteorite.name}
          </h3>

          <p className="text-[11px] text-slate-muted mt-1 tracking-wide">
            {meteorite.subclass && `${meteorite.subclass} \u00B7 `}
            {meteorite.origin}
          </p>

          <p className="text-sm text-slate-muted mt-3 leading-relaxed line-clamp-3">
            {meteorite.description}
          </p>

          {/* Community Contribution Credit (AMS photo credit style) */}
          <div className="mt-4 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-ivory border border-border-subtle flex items-center justify-center">
              <svg className="w-3 h-3 text-slate-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 3a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 14.5c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-slate-muted">
                Catalogued by <span className="text-obsidian font-medium">IMA Research Division</span>
              </span>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
            <div className="flex gap-4">
              <span className="text-[11px] text-slate-muted uppercase tracking-wider">
                {meteorite.year}
              </span>
              <span className="text-[11px] text-slate-muted uppercase tracking-wider">
                {meteorite.mass}
              </span>
            </div>
            <span className="text-[10px] font-medium text-meteor-bronze tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">
              View &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
