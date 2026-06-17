import { motion } from 'framer-motion'

/**
 * NewsTicker — A subtle, auto-scrolling marquee of breaking updates.
 * Inspired by AMS's event-based header bar. Adds urgency and life.
 */

const updates = [
  'New observed fall: Sikhote-Alin fragment recovered in Primorsky Krai',
  'Community milestone: 14,200+ verified specimens catalogued',
  'Research paper published: Pallasite formation in tropical climates',
  'Monthly meetup: Classification workshop — June 28, 2026',
  'New strewn field discovered in Nagaland, India — under investigation',
  'Video program update: 47 new allsky camera stations deployed',
]

export default function NewsTicker() {
  return (
    <div className="relative bg-obsidian overflow-hidden">
      <div className="mx-auto max-w-7xl flex items-center h-9">
        {/* Live indicator */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 lg:px-6 border-r border-white/10 h-full">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/80">
            Live
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {[...updates, ...updates].map((update, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs text-white/70 px-6">{update}</span>
                <span className="text-meteor-bronze text-[8px]">&#9679;</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
