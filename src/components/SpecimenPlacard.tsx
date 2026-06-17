import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Meteorite } from '../data/meteorites'
import { cn } from '../lib/utils'

/**
 * SpecimenPlacard — Museum-style exhibition card.
 *
 * Features:
 * - Irregular masonry aspect ratios (tall/medium/short)
 * - Generous padding, clean borders, isolated photography
 * - Hover: card lifts, reveals internal structure overlay
 * - Smooth micro-interactions via Framer Motion
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
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Hover Overlay — Reveal Internal Structure */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background darkening */}
            <div className="absolute inset-0 bg-obsidian/40 backdrop-blur-[2px]" />

            {/* Structure revelation — different per classification */}
            <div className="relative z-10 text-center px-6">
              {meteorite.classification === 'Iron' && (
                <div className="widmanstatten-overlay absolute inset-0 rounded-xl opacity-40" />
              )}
              {meteorite.classification === 'Stony-Iron' && (
                <div className="absolute inset-0 rounded-xl opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 30% 40%, rgba(184,155,106,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(184,155,106,0.3) 0%, transparent 40%)',
                  }}
                />
              )}
              {meteorite.classification === 'Stony' && (
                <div className="absolute inset-0 rounded-xl opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
                  }}
                />
              )}

              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative z-10 text-white text-xs tracking-[0.2em] uppercase font-medium"
              >
                {meteorite.classification === 'Iron'
                  ? 'Widmanst\u00e4tten Pattern'
                  : meteorite.classification === 'Stony-Iron'
                  ? 'Olivine Crystal Matrix'
                  : 'Chondritic Structure'}
              </motion.span>
            </div>
          </motion.div>

          {/* Top-right classification pill */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full z-20">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-obsidian">
              {meteorite.classification}
            </span>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-white to-transparent" />
        </div>

        {/* Card Content — Museum Placard Style */}
        <div className="p-6 pt-2">
          {/* Accent line */}
          <div
            className="w-8 h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:w-12"
            style={{ backgroundColor: meteorite.accentColor }}
          />

          <h3 className="font-display text-xl font-semibold leading-tight">
            {meteorite.name}
          </h3>

          <p className="text-xs text-slate-muted mt-1.5 tracking-wide">
            {meteorite.subclass && `${meteorite.subclass} \u00B7 `}
            {meteorite.origin}
          </p>

          <p className="text-sm text-slate-muted mt-3 leading-relaxed line-clamp-3">
            {meteorite.description}
          </p>

          {/* Metadata Row */}
          <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between">
            <div className="flex gap-4">
              <span className="text-[11px] text-slate-muted uppercase tracking-wider">
                {meteorite.year}
              </span>
              <span className="text-[11px] text-slate-muted uppercase tracking-wider">
                {meteorite.mass}
              </span>
            </div>
            <span
              className={cn(
                'text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wider uppercase',
                meteorite.fallType === 'Observed Fall'
                  ? 'bg-meteor-bronze/10 text-meteor-bronze'
                  : 'bg-slate-muted/10 text-slate-muted'
              )}
            >
              {meteorite.fallType}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
