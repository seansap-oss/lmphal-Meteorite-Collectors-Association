import { motion } from 'framer-motion'

/**
 * Footer — Minimal editorial footer with site links and branding.
 */
export default function Footer() {
  return (
    <footer className="relative bg-warm-white border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-obsidian flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="#8C7A6B" />
                  <circle cx="8" cy="8" r="6" stroke="#8C7A6B" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="8" cy="8" r="7.5" stroke="#8C7A6B" strokeWidth="0.3" opacity="0.3" />
                </svg>
              </div>
              <div>
                <span className="font-display text-sm font-semibold tracking-[0.15em] uppercase">
                  Imphal Meteorite Association
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-muted max-w-sm leading-relaxed">
              Dedicated to the scientific study, classification, and public education of meteorite
              specimens. Bridging the gap between amateur hunters and professional researchers.
            </p>
            <div className="flex gap-4 mt-6">
              {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-9 h-9 rounded-full border border-border-medium flex items-center justify-center text-slate-muted hover:border-obsidian hover:text-obsidian transition-colors duration-300"
                  aria-label={platform}
                >
                  <span className="text-xs font-medium">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {['The Collection', 'Specimen Vault', 'Research Papers', 'Classification Guide'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-muted hover:text-obsidian transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              {['Join the Group', 'Report a Find', 'Member Directory', 'Events Calendar'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-muted hover:text-obsidian transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-light">
            &copy; {new Date().getFullYear()} Imphal Meteorite Association. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-slate-light hover:text-obsidian transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
