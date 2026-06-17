import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { communityStats } from '../data/meteorites'

/**
 * GroupSyncBanner — Community hub with animated stats.
 * Elevated with AMS-inspired data presentation and editorial polish.
 */

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

const stats = [
  {
    label: 'Active Hunters',
    value: communityStats.activeHunters,
    suffix: '+',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Verified Fragments',
    value: communityStats.verifiedFragments,
    suffix: '+',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Research Papers',
    value: communityStats.researchPapers,
    suffix: '',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M3 3h14v14H3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 7h8M6 10h6M6 13h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Community Since',
    value: communityStats.memberSince,
    suffix: '',
    isYear: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function GroupSyncBanner() {
  return (
    <section id="community" className="relative py-24 lg:py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-meteor-bronze/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-meteor-bronze/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-meteor-bronze-light">
            Connected Community
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-white leading-tight">
            Imphal Meteorite Association
          </h2>
          <p className="mt-4 text-slate-light max-w-lg mx-auto">
            A thriving community of researchers, hunters, and enthusiasts dedicated
            to the study and preservation of meteorite specimens.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="p-5 lg:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-white/15 transition-all duration-500 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="text-meteor-bronze-light">{stat.icon}</div>
                  {!stat.isYear && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl lg:text-3xl font-bold text-white">
                  {stat.isYear ? stat.value : <AnimatedCounter target={stat.value} />}
                  <span className="text-meteor-bronze-light text-lg">{stat.suffix}</span>
                </div>
                <p className="text-xs text-slate-light mt-1.5 tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://facebook.com/groups"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-meteor-bronze text-white rounded-full font-medium text-sm tracking-wide hover:bg-meteor-bronze-light transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" />
            </svg>
            Join Our Facebook Community
            <span className="text-meteor-amber">&rarr;</span>
          </a>
          <p className="text-xs text-slate-light/60 mt-4">
            Share discoveries, discuss classifications, and connect with fellow hunters worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
