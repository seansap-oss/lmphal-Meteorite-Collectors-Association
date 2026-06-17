import Navigation from './components/Navigation'
import NewsTicker from './components/NewsTicker'
import HeroTray from './components/HeroTray'
import LatestDiscoveries from './components/LatestDiscoveries'
import ClassificationExplorer from './components/ClassificationExplorer'
import SpecimenVault from './components/SpecimenVault'
import ResearchSection from './components/ResearchSection'
import GroupSyncBanner from './components/GroupSyncBanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-alabaster">
      <NewsTicker />
      <Navigation />

      <main>
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
