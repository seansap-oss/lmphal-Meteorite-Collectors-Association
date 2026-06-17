import { motion } from 'framer-motion'

/**
 * ResearchSection — Editorial overview of ongoing research initiatives.
 * Purely informational with elegant typography and scroll-reveal animations.
 */

const articles = [
  {
    category: 'Classification',
    title: 'Understanding Pallasite Formation',
    excerpt:
      'Pallasites form at the core-mantle boundary of differentiated asteroids, where olivine crystals crystallize within a nickel-iron matrix over millions of years.',
    date: '2024',
    readTime: '8 min read',
  },
  {
    category: 'Discovery',
    title: 'New Strewn Field Mapping Techniques',
    excerpt:
      'ModernLiDAR and drone-based photogrammetry are revolutionizing how we locate and map meteorite strewn fields across remote terrain.',
    date: '2024',
    readTime: '12 min read',
  },
  {
    category: 'Preservation',
    title: 'Conserving Iron Meteorites in Tropical Climates',
    excerpt:
      'High-humidity environments accelerate oxidation in iron meteorites. This paper examines climate-controlled storage protocols for tropical regions.',
    date: '2023',
    readTime: '6 min read',
  },
]

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-24 lg:py-32 bg-alabaster">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-meteor-bronze">
            Publications
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 leading-tight">
            Research & Insights
          </h2>
          <p className="mt-4 text-slate-muted max-w-lg">
            Academic contributions and field reports from our research division
            and collaborating institutions.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group cursor-pointer"
            >
              <div className="h-48 rounded-xl bg-ivory border border-border-subtle mb-6 overflow-hidden relative group-hover:border-meteor-bronze/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-meteor-bronze/5 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-meteor-bronze">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-muted mb-3">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-light" />
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-meteor-bronze transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-sm text-slate-muted mt-3 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-meteor-bronze tracking-wider uppercase group-hover:gap-2.5 transition-all duration-300">
                Read Paper
                <span>&rarr;</span>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
