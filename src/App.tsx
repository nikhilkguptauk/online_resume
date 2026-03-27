import Hero from './components/Hero'
import ProfileSummary from './components/ProfileSummary'
import TechnologySkills from './components/TechnologySkills'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#e5e5e5',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Page 1 */}
      <div
        className="resume-page-1"
        style={{
          maxWidth: '210mm',
          marginTop: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
        }}
      >
        <Hero compact />
        <ProfileSummary compact />
        <TechnologySkills compact />
      </div>

      {/* Page 2 */}
      <div
        style={{
          maxWidth: '210mm',
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
          minHeight: '297mm',
        }}
      >
        <p
          className="print:hidden"
          style={{
            textAlign: 'center',
            paddingTop: '48px',
            color: '#9ca3af',
          }}
        >
          Future sections will appear here.
        </p>
      </div>
    </div>
  )
}
