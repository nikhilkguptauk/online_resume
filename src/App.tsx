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
import ContactModal from './components/ContactModal'
import {
  typography,
  ui,
  heroData,
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
  const [totalPages, setTotalPages] = useState(1)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const scrollTimeoutRef = useRef<number | null>(null)
  const scrollRafRef = useRef<number | null>(null)
  const pageHeightRef = useRef<number>(0)
  const totalPagesRef = useRef<number>(1)
  const [isContactOpen, setIsContactOpen] = useState(false)

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
  const updateZoom = (nextValue: number) => {
    const clamped = Math.min(maxZoom, Math.max(minZoom, nextValue))
    setZoom(clamped)
  }

  useEffect(() => {
    const updatePageMetrics = () => {
      if (!contentRef.current || !pageHeightRef.current) return
      const contentHeight = contentRef.current.getBoundingClientRect().height
      const pages = Math.max(1, Math.ceil(contentHeight / pageHeightRef.current))
      totalPagesRef.current = pages
      setTotalPages((prev) => (prev === pages ? prev : pages))
    }

    const updateActivePage = () => {
      if (!contentRef.current || !pageHeightRef.current) return
      const contentTop = contentRef.current.getBoundingClientRect().top + window.scrollY
      const viewportCenter = window.scrollY + window.innerHeight / 2
      const rawIndex =
        Math.floor((viewportCenter - contentTop) / pageHeightRef.current) + 1
      const clampedIndex = Math.min(
        totalPagesRef.current,
        Math.max(1, rawIndex),
      )
      setActivePage((prev) => (prev === clampedIndex ? prev : clampedIndex))
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

    if (measureRef.current) {
      pageHeightRef.current = measureRef.current.getBoundingClientRect().height
    }
    updatePageMetrics()
    updateActivePage()

    const resizeObserver = new ResizeObserver(() => {
      if (measureRef.current) {
        pageHeightRef.current = measureRef.current.getBoundingClientRect().height
      }
      updatePageMetrics()
      updateActivePage()
    })

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updatePageMetrics)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updatePageMetrics)
      resizeObserver.disconnect()
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
        color: '#111827',
        fontFamily: typography.bodyFontFamily,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <ContactModal
        isOpen={isContactOpen}
        toEmail={heroData.email}
        onClose={() => setIsContactOpen(false)}
      />
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          height: '297mm',
          width: '1px',
        }}
      />
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
        onContact={() => setIsContactOpen(true)}
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
        <div
          ref={contentRef}
          className="resume-content"
          style={{
            maxWidth: '210mm',
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
            paddingBottom: '10px',
          }}
        >
          <Hero compact onContact={() => setIsContactOpen(true)} />
          <ProfileSummary compact />
          <TechnologySkills compact />

          <div style={{ height: '10px' }} />
          <SectionTable data={employmentHistory} compact />
          <SectionTable data={domainExperience} compact />
          <SectionTable data={globalExposure} compact />
          <SectionTable data={awardsRecognition} compact />
          <SectionTable data={certifications} compact />
          <SectionTable data={education} compact />
          <SectionTable data={personalDetails} compact />

          <div style={{ height: '10px' }} />
          <SectionHeadingBar title="PROJECTS" compact />
          {projectsPage3.map((entry) => (
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
          {projectsPage4.map((entry) => (
            <ProjectBlock key={entry.heading} compact {...entry} />
          ))}

          <div style={{ height: '10px' }} />
          <SectionHeadingBar title="DECLARATION" compact />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 24px 0 32px',
              fontSize: typography.bodyFontSize,
              lineHeight: typography.bodyLineHeight,
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
  )
}
