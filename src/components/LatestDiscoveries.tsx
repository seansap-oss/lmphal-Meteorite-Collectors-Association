import { motion } from 'framer-motion'
import { meteorites } from '../data/meteorites'

/**
 * LatestDiscoveries — AMS-inspired editorial news grid.
 *
 * Layout:
 * - Featured article (large, left) — hero specimen as editorial piece
 * - 3 smaller articles in a grid (right)
 * - Below: additional article rows
 *
 * Mimics AMS's featured article + sidebar grid pattern but elevated.
 */

const newsItems = [
  {
    id: 'n1',
    title: 'Record-Breaking Fireball Over Northeast India',
    excerpt:
      'A brilliant bolide was observed across Manipur, Nagaland, and Assam on June 8th, with over 200 community reports. Preliminary analysis suggests an iron-nickel composition consistent with a deep-space origin.',
    date: 'Jun 10, 2026',
    author: 'Dr. Nameirakpam Singh',
    category: 'Event Report',
    image: meteorites[0].image,
    featured: true,
    comments: 47,
  },
  {
    id: 'n2',
    title: 'New Strewn Field Mapping Initiative',
    excerpt:
      'Our team has deployed LiDAR-equipped drones across three suspected fall zones in the Imphal Valley, revealing promising subsurface anomalies.',
    date: 'Jun 5, 2026',
    author: 'Research Division',
    category: 'Field Report',
    image: meteorites[2].image,
    comments: 12,
  },
  {
    id: 'n3',
    title: 'Classification Workshop Results',
    excerpt:
      'Forty-seven members completed our intensive meteorite classification workshop, gaining hands-on experience with thin-section analysis.',
    date: 'May 28, 2026',
    author: 'Education Committee',
    category: 'Community',
    image: meteorites[4].image,
    comments: 23,
  },
  {
    id: 'n4',
    title: 'Preserving Iron Meteorites in Tropical Humidity',
    excerpt:
      'A new conservation protocol developed in partnership with the National Museum addresses the unique challenges of storing iron specimens in high-humidity environments.',
    date: 'May 20, 2026',
    author: 'Conservation Lab',
    category: 'Research',
    image: meteorites[1].image,
    comments: 8,
  },
]

export default function LatestDiscoveries() {
  const featured = newsItems.find((n) => n.featured)!
  const sidebar = newsItems.filter((n) => !n.featured)

  return (
    <section className="relative py-20 lg:py-28 bg-warm-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-meteor-bronze">
              Latest Intelligence
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-2">
              Discoveries & Reports
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-slate-muted hover:text-obsidian transition-colors group"
          >
            View all news
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </motion.div>

        {/* ── Featured + Sidebar Grid (AMS pattern) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden bg-ivory">
              <div className="relative h-[400px] lg:h-[480px] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category pill */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase text-obsidian">
                    {featured.category}
                  </span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-3 line-clamp-2 max-w-lg">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-white/50 text-xs">{featured.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/50 text-xs">{featured.author}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/50 text-xs">{featured.comments} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar Articles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sidebar.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer flex gap-5"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-ivory">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-meteor-bronze">
                    {item.category}
                  </span>
                  <h4 className="font-display text-base font-semibold leading-tight mt-1 group-hover:text-meteor-bronze transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-slate-muted">{item.date}</span>
                    <span className="text-[11px] text-slate-muted">{item.comments} comments</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
