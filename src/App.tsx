import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Hero from './components/Hero'
import ProfileSummary from './components/ProfileSummary'
import TechnologySkills from './components/TechnologySkills'
import ZoomToolbar from './components/ZoomToolbar'
import SectionTable from './components/SectionTable'
import SectionHeadingBar from './components/SectionHeadingBar'
import ProjectBlock from './components/ProjectBlock'
import PageIndicator from './components/PageIndicator'
import {
  typography,
  ui,
  employmentHistory,
  domainExperience,
  globalExposure,
  awardsRecognition,
  certifications,
  education,
  personalDetails,
  projectsPage3,
  druvaContinuationBullets,
  projectsPage4,
  declaration,
} from './config/resume'

export default function App() {
  const minZoom = 0.8
  const maxZoom = 1.5
  const zoomStep = 0.1
  const [zoom, setZoom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [showPageIndicator, setShowPageIndicator] = useState(false)
  const totalPages = 4
  const pageRefs = useRef<Array<HTMLDivElement | null>>([])
  const scrollTimeoutRef = useRef<number | null>(null)
  const scrollRafRef = useRef<number | null>(null)

  const downloadButtonStyle =
    ui.downloadButtonStyles[ui.downloadButtonVariant] ?? ui.downloadButtonStyles.option3

  const zoomButtonStyle: CSSProperties = {
    backgroundColor: downloadButtonStyle.backgroundColor,
    color: downloadButtonStyle.color,
    border: downloadButtonStyle.border,
    borderRadius: downloadButtonStyle.borderRadius ?? '6px',
    padding: '6px 10px',
    fontSize: '12px',
    textDecoration: downloadButtonStyle.textDecoration ?? 'none',
  }

  const canZoomOut = zoom > minZoom
  const canZoomIn = zoom < maxZoom
  const [firstProject, ...remainingProjects] = projectsPage3
  const [firstPage4Project, ...remainingPage4Projects] = projectsPage4

  const updateZoom = (nextValue: number) => {
    const clamped = Math.min(maxZoom, Math.max(minZoom, nextValue))
    setZoom(clamped)
  }

  useEffect(() => {
    const updateActivePage = () => {
      const viewportCenter = window.innerHeight / 2
      let bestPage = 1
      let bestDistance = Number.POSITIVE_INFINITY

      pageRefs.current.forEach((node, index) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        const pageCenter = rect.top + rect.height / 2
        const distance = Math.abs(pageCenter - viewportCenter)
        if (distance < bestDistance) {
          bestDistance = distance
          bestPage = index + 1
        }
      })

      setActivePage((prev) => (prev === bestPage ? prev : bestPage))
    }

    const handleScroll = () => {
      setShowPageIndicator(true)
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setShowPageIndicator(false)
      }, 1200)

      if (scrollRafRef.current) return
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null
        updateActivePage()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActivePage()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#e5e5e5',
        fontFamily: typography.bodyFontFamily,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <PageIndicator
        activePage={activePage}
        totalPages={totalPages}
        visible={showPageIndicator}
      />
      <ZoomToolbar
        zoom={zoom}
        canZoomOut={canZoomOut}
        canZoomIn={canZoomIn}
        onZoomOut={() => updateZoom(zoom - zoomStep)}
        onZoomIn={() => updateZoom(zoom + zoomStep)}
        onDownload={() => window.print()}
        downloadButtonStyle={downloadButtonStyle}
        zoomButtonStyle={zoomButtonStyle}
      />

      <div
        className="resume-zoom"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Page 1 */}
        <div
          ref={(node) => {
            pageRefs.current[0] = node
          }}
          className="resume-page resume-page-1"
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
          ref={(node) => {
            pageRefs.current[1] = node
          }}
          className="resume-page resume-page-2"
          style={{
            maxWidth: '210mm',
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              paddingTop: '4px',
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <SectionTable data={employmentHistory} compact />
            <SectionTable data={domainExperience} compact />
            <SectionTable data={globalExposure} compact />
            <SectionTable data={awardsRecognition} compact />
            <SectionTable data={certifications} compact />
            <SectionTable data={education} compact />
            <SectionTable data={personalDetails} compact />
            {firstProject && (
              <>
                <SectionHeadingBar title="PROJECTS" compact />
                <ProjectBlock compact {...firstProject} />
              </>
            )}
          </div>
        </div>

        {/* Page 3 */}
        <div
          ref={(node) => {
            pageRefs.current[2] = node
          }}
          className="resume-page resume-page-3"
          style={{
            maxWidth: '210mm',
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              paddingTop: '4px',
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {remainingProjects.map((entry) => (
              <ProjectBlock key={entry.heading} compact {...entry} />
            ))}
            {druvaContinuationBullets.length > 0 && (
              <ProjectBlock
                bullets={druvaContinuationBullets}
                showHeading={false}
                showSummary={false}
                showContributionsLabel={false}
                compact
              />
            )}
            {firstPage4Project && <ProjectBlock key={firstPage4Project.heading} compact {...firstPage4Project} />}
          </div>
        </div>

        {/* Page 4 */}
        <div
          ref={(node) => {
            pageRefs.current[3] = node
          }}
          className="resume-page resume-page-4"
          style={{
            maxWidth: '210mm',
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              paddingTop: '4px',
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {remainingPage4Projects.map((entry) => (
              <ProjectBlock key={entry.heading} compact {...entry} />
            ))}
            <SectionHeadingBar title="DECLARATION" compact />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 24px 0 32px',
                fontSize: '10pt',
                lineHeight: '1.2',
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{declaration.name}</div>
                {declaration.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              <div>{declaration.date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
