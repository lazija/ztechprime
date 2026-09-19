import { LOGO_ANIM } from '../assets/brand'

export type LogoLayer = {
  node: HTMLCanvasElement
  dx: number
  dy: number
  area: number
  index: number
  total: number
  body: boolean
}

type Component = {
  pixels: number[]
  minX: number
  minY: number
  maxX: number
  maxY: number
  area: number
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function erode(mask: Uint8Array, width: number, height: number) {
  const next = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x
      if (!mask[i]) continue
      if (
        mask[i - 1] &&
        mask[i + 1] &&
        mask[i - width] &&
        mask[i + width] &&
        mask[i - width - 1] &&
        mask[i - width + 1] &&
        mask[i + width - 1] &&
        mask[i + width + 1]
      ) {
        next[i] = 1
      }
    }
  }
  return next
}

function dilate(mask: Uint8Array, width: number, height: number) {
  const next = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x
      if (!mask[i]) continue
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          next[(y + dy) * width + (x + dx)] = 1
        }
      }
    }
  }
  return next
}

function floodMask(mask: Uint8Array, width: number, height: number, minArea: number) {
  const visited = new Uint8Array(mask.length)
  const queue = new Int32Array(mask.length)
  const components: Component[] = []

  for (let start = 0; start < mask.length; start++) {
    if (visited[start] || !mask[start]) continue
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
          if (!visited[next] && mask[next]) {
            visited[next] = 1
            queue[tail++] = next
          }
        }
      }
    }

    if (pixels.length >= minArea) {
      components.push({ pixels, minX, minY, maxX, maxY, area: pixels.length })
    }
  }

  return components
}

function peelAppendages(component: Component, width: number, height: number) {
  if (component.area <= LOGO_ANIM.bodyArea) {
    return { cores: [component], traces: [] as Component[] }
  }

  let mask = new Uint8Array(width * height)
  component.pixels.forEach((pixel) => {
    mask[pixel] = 1
  })

  for (let i = 0; i < 6; i++) mask = erode(mask, width, height)
  for (let i = 0; i < 5; i++) mask = dilate(mask, width, height)

  const coreMask = new Uint8Array(width * height)
  const traceMask = new Uint8Array(width * height)
  component.pixels.forEach((pixel) => {
    if (mask[pixel]) coreMask[pixel] = 1
    else traceMask[pixel] = 1
  })

  const cores = floodMask(coreMask, width, height, 2500)
  const traces = floodMask(traceMask, width, height, 80)
  return {
    cores: cores.length ? cores : [component],
    traces,
  }
}

function connectedComponents(image: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { frame: null, components: [] as Component[], width: 0, height: 0 }

  ctx.drawImage(image, 0, 0)
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const { data, width, height } = frame
  const sourceMask = new Uint8Array(width * height)
  for (let i = 0; i < sourceMask.length; i++) {
    if (data[i * 4 + 3] > 22) sourceMask[i] = 1
  }

  const raw = floodMask(sourceMask, width, height, 200)
  raw.sort((a, b) => b.area - a.area)

  const components: Component[] = []
  raw.forEach((component) => {
    const { cores, traces } = peelAppendages(component, width, height)
    components.push(...cores, ...traces)
  })

  components.sort((a, b) => b.area - a.area)
  return { frame, components, width, height }
}

function makeLayer(
  frame: ImageData,
  component: Component,
  width: number,
  height: number,
  stage: HTMLElement,
) {
  const boxWidth = component.maxX - component.minX + 1
  const boxHeight = component.maxY - component.minY + 1
  const layer = document.createElement('canvas')
  layer.width = boxWidth
  layer.height = boxHeight
  layer.className = 'scroll-logo-layer'
  const layerCtx = layer.getContext('2d')
  if (!layerCtx) return null

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
  let dx = x - width / 2
  let dy = y - height / 2
  const length = Math.hypot(dx, dy) || 1
  dx /= length
  dy /= length

  layer.style.inset = 'auto'
  layer.style.left = `${(component.minX / width) * 100}%`
  layer.style.top = `${(component.minY / height) * 100}%`
  layer.style.width = `${(boxWidth / width) * 100}%`
  layer.style.height = `${(boxHeight / height) * 100}%`
  layer.style.transformOrigin = '50% 50%'
  stage.appendChild(layer)

  return {
    node: layer,
    dx,
    dy,
    area: component.area,
    body: component.area > LOGO_ANIM.bodyArea,
  }
}

export function buildLogoLayers(image: HTMLImageElement, stage: HTMLElement) {
  const { frame, components, width, height } = connectedComponents(image)
  if (!frame) return []

  const built = components
    .map((component) => makeLayer(frame, component, width, height, stage))
    .filter((layer): layer is NonNullable<typeof layer> => layer !== null)

  return built.map((layer, index) => ({
    ...layer,
    index,
    total: built.length,
  }))
}

export function renderLogoLayers(layers: LogoLayer[], progress: number) {
  document.documentElement.style.setProperty('--logo-glow', String(LOGO_ANIM.glow))
  const apart = Math.sin(clamp(progress) * Math.PI)

  layers.forEach((layer) => {
    const p = layer.body ? apart * 0.34 : apart
    const distance = LOGO_ANIM.spread * p
    const bias = layer.index % 2 ? 1 : -1
    const x = layer.dx * distance + bias * p * 4
    const y = layer.dy * distance
    const rotation = bias * LOGO_ANIM.rotation * p * 0.55
    layer.node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`
    layer.node.style.opacity = '1'
    layer.node.style.visibility = 'visible'
  })
}
