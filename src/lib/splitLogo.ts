import { LOGO_ANIM } from '../assets/brand'

export type LogoLayer = {
  node: HTMLCanvasElement
  dx: number
  dy: number
  area: number
  index: number
  total: number
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function ease(t: number) {
  return 1 - (1 - t) ** 3
}

function connectedComponents(image: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { frame: null, components: [], width: 0, height: 0 }

  ctx.drawImage(image, 0, 0)
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const { data, width, height } = frame
  const total = width * height
  const visited = new Uint8Array(total)
  const queue = new Int32Array(total)
  const components: {
    pixels: number[]
    minX: number
    minY: number
    maxX: number
    maxY: number
    area: number
  }[] = []
  const alphaLimit = 22

  for (let start = 0; start < total; start++) {
    if (visited[start] || data[start * 4 + 3] <= alphaLimit) continue
    let head = 0
    let tail = 0
    let minX = width
    let minY = height
    let maxX = 0
    let maxY = 0
    const pixels: number[] = []
    queue[tail++] = start
    visited[start] = 1

    while (head < tail) {
      const index = queue[head++]
      pixels.push(index)
      const x = index % width
      const y = (index / width) | 0
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y

      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy
        if (ny < 0 || ny >= height) continue
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          const nx = x + dx
          if (nx < 0 || nx >= width) continue
          const next = ny * width + nx
          if (!visited[next] && data[next * 4 + 3] > alphaLimit) {
            visited[next] = 1
            queue[tail++] = next
          }
        }
      }
    }

    if (pixels.length > 350) {
      components.push({ pixels, minX, minY, maxX, maxY, area: pixels.length })
    }
  }

  components.sort((a, b) => b.area - a.area)
  return { frame, components, width, height }
}

export function buildLogoLayers(image: HTMLImageElement, stage: HTMLElement) {
  const { frame, components, width, height } = connectedComponents(image)
  const layers: LogoLayer[] = []
  if (!frame) return layers

  const centerX = width / 2
  const centerY = height / 2

  components.forEach((component, index) => {
    const boxWidth = component.maxX - component.minX + 1
    const boxHeight = component.maxY - component.minY + 1
    const layer = document.createElement('canvas')
    layer.width = boxWidth
    layer.height = boxHeight
    layer.className = 'scroll-logo-layer'
    const layerCtx = layer.getContext('2d')
    if (!layerCtx) return

    const isolated = layerCtx.createImageData(boxWidth, boxHeight)
    component.pixels.forEach((pixel) => {
      const sourceOffset = pixel * 4
      const sourceX = pixel % width
      const sourceY = (pixel / width) | 0
      const localPixel =
        (sourceY - component.minY) * boxWidth + sourceX - component.minX
      const targetOffset = localPixel * 4
      isolated.data[targetOffset] = frame.data[sourceOffset]
      isolated.data[targetOffset + 1] = frame.data[sourceOffset + 1]
      isolated.data[targetOffset + 2] = frame.data[sourceOffset + 2]
      isolated.data[targetOffset + 3] = frame.data[sourceOffset + 3]
    })

    layerCtx.putImageData(isolated, 0, 0)

    const x = (component.minX + component.maxX) / 2
    const y = (component.minY + component.maxY) / 2
    let dx = x - centerX
    let dy = y - centerY
    const length = Math.hypot(dx, dy) || 1
    dx /= length
    dy /= length

    if (component.area > 70000) {
      dx = index % 2 ? -0.72 : 0.72
      dy = index % 2 ? 0.48 : -0.48
    }

    layer.style.inset = 'auto'
    layer.style.left = `${(component.minX / width) * 100}%`
    layer.style.top = `${(component.minY / height) * 100}%`
    layer.style.width = `${(boxWidth / width) * 100}%`
    layer.style.height = `${(boxHeight / height) * 100}%`
    layer.style.transformOrigin = '50% 50%'
    stage.appendChild(layer)

    layers.push({
      node: layer,
      dx,
      dy,
      area: component.area,
      index,
      total: components.length,
    })
  })

  return layers
}

function layerProgress(layer: LogoLayer, raw: number) {
  const stagger = LOGO_ANIM.stagger / 100
  if (!stagger) return ease(raw)
  const rank = layer.index / Math.max(1, layer.total - 1)
  const delay = rank * stagger
  return ease(clamp((raw - delay) / Math.max(0.01, 1 - stagger)))
}

export function renderLogoLayers(layers: LogoLayer[], progress: number) {
  document.documentElement.style.setProperty('--logo-glow', String(LOGO_ANIM.glow))

  layers.forEach((layer) => {
    const body = layer.area > LOGO_ANIM.bodyArea
    const p = body ? 0 : layerProgress(layer, progress)
    const distance = LOGO_ANIM.spread * p
    const bias = layer.index % 2 ? 1 : -1
    const x = layer.dx * distance + bias * p * 8
    const y = layer.dy * distance
    const rotation =
      bias * LOGO_ANIM.rotation * p * (0.45 + (layer.index % 4) * 0.18)
    layer.node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`
    layer.node.style.opacity = String(1 - p)
  })
}
