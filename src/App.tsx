import Navigation from './components/Navigation'
import HeroTray from './components/HeroTray'
import SpecimenVault from './components/SpecimenVault'
import ResearchSection from './components/ResearchSection'
import GroupSyncBanner from './components/GroupSyncBanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-alabaster">
      <Navigation />

      {/* Hero — The Galactic Museum Tray */}
      <main>
        <HeroTray />

        {/* Specimen Vault — Filterable Exhibition Grid */}
        <SpecimenVault />

        {/* Research Publications */}
        <ResearchSection />

        {/* Community / Facebook Sync */}
        <GroupSyncBanner />
      </main>

      <Footer />
    </div>
  )
}
