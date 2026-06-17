import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'

const navLinks = [
  { label: 'Discovery', href: '#discovery' },
  { label: 'Specimens', href: '#specimens' },
  { label: 'Classification', href: '#classification' },
  { label: 'Research', href: '#research' },
  { label: 'Community', href: '#community' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-alabaster/95 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-alabaster'
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo / Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-obsidian flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="#8C7A6B" />
              <circle cx="8" cy="8" r="6" stroke="#8C7A6B" strokeWidth="0.5" opacity="0.5" />
              <circle cx="8" cy="8" r="7.5" stroke="#8C7A6B" strokeWidth="0.3" opacity="0.3" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-[0.15em] uppercase leading-none">
              Imphal
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-slate-muted leading-none mt-0.5">
              Meteorite Association
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-muted hover:text-obsidian transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-meteor-bronze group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#community"
            className="ml-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase bg-obsidian text-white rounded-full hover:bg-meteor-bronze transition-colors duration-300"
          >
            Report a Find
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-obsidian block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-px bg-obsidian block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-obsidian block"
          />
        </button>
      </nav>

      {/* ── Ticker Bar (part of fixed header) ── */}
      <TickerBar />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden overflow-hidden bg-alabaster/95 backdrop-blur-xl border-b border-border-subtle"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-lg font-display text-obsidian"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#community"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-obsidian text-white rounded-full text-center"
              >
                Report a Find
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ── Inline Ticker Bar (renders inside the fixed header) ── */
const tickerUpdates = [
  'New observed fall: Sikhote-Alin fragment recovered in Primorsky Krai',
  'Community milestone: 14,200+ verified specimens catalogued',
  'Research paper published: Pallasite formation in tropical climates',
  'Monthly meetup: Classification workshop — June 28, 2026',
  'New strewn field discovered in Nagaland, India — under investigation',
  'Video program update: 47 new allsky camera stations deployed',
]

function TickerBar() {
  return (
    <div className="bg-obsidian overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl flex items-center h-8">
        {/* Live indicator */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 lg:px-5 border-r border-white/10 h-full">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/80">
            Live
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ x: { duration: 40, repeat: Infinity, ease: 'linear' } }}
          >
            {[...tickerUpdates, ...tickerUpdates].map((update, i) => (
              <span key={i} className="flex items-center">
                <span className="text-[11px] text-white/60 px-5">{update}</span>
                <span className="text-meteor-bronze/60 text-[6px]">&#9679;</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
