import Navigation from './components/Navigation'
import HeroTray from './components/HeroTray'
import LatestDiscoveries from './components/LatestDiscoveries'
import ClassificationExplorer from './components/ClassificationExplorer'
import SpecimenVault from './components/SpecimenVault'
import ResearchSection from './components/ResearchSection'
import GroupSyncBanner from './components/GroupSyncBanner'
import Footer from './components/Footer'

/**
 * App — Main layout.
 * Header is fixed (nav + ticker). Main content has pt-24 to clear it.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-alabaster">
      {/* Fixed header with nav + ticker lives here */}
      <Navigation />

      {/* Push content below the fixed header (nav 64px + ticker 32px = 96px) */}
      <main className="pt-24">
        {/* Hero — Featured specimen + event sidebar + interactive tray */}
        <div id="discovery">
          <HeroTray />
        </div>

        {/* Latest Discoveries — AMS-style editorial news grid */}
        <LatestDiscoveries />

        {/* Classification Explorer — Interactive data widget */}
        <div id="classification">
          <ClassificationExplorer />
        </div>

        {/* Specimen Vault — Filterable exhibition grid */}
        <SpecimenVault />

        {/* Research Publications */}
        <div id="research">
          <ResearchSection />
        </div>

        {/* Community / Facebook Sync */}
        <GroupSyncBanner />
      </main>

      <Footer />
    </div>
  )
}
