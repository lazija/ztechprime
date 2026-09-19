import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { brandImages } from '../assets/brand'
import { buildLogoLayers, renderLogoLayers, type LogoLayer } from '../lib/splitLogo'

export type ScrollLogoHandle = {
  setProgress: (progress: number) => void
}

type ScrollLogoProps = {
  className?: string
}

export const ScrollLogo = forwardRef<ScrollLogoHandle, ScrollLogoProps>(
  function ScrollLogo({ className = '' }, ref) {
    const stageRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const layersRef = useRef<LogoLayer[]>([])
    const progressRef = useRef(0)

    const apply = () => {
      renderLogoLayers(layersRef.current, progressRef.current)
    }

    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        progressRef.current = progress
        apply()
      },
    }))

    useEffect(() => {
      const img = imgRef.current
      const stage = stageRef.current
      if (!img || !stage) return

      let cancelled = false

      const start = () => {
        if (cancelled || !img.naturalWidth) return
        layersRef.current.forEach((layer) => layer.node.remove())
        layersRef.current = buildLogoLayers(img, stage)
        stage.classList.add('is-ready')
        apply()
      }

      if (img.complete && img.naturalWidth) start()
      else img.addEventListener('load', start, { once: true })

      return () => {
        cancelled = true
        layersRef.current.forEach((layer) => layer.node.remove())
        layersRef.current = []
        stage.classList.remove('is-ready')
      }
    }, [])

    return (
      <div
        ref={stageRef}
        className={`scroll-logo ${className}`.trim()}
        aria-label="ztech prime"
      >
        <img
          ref={imgRef}
          className="scroll-logo-fallback"
          src={brandImages.mark}
          alt="ztech prime"
          draggable={false}
        />
      </div>
    )
  },
)
