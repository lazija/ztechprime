export function ItConstellation() {
  return (
    <svg
      className="h-auto w-full max-w-[420px]"
      viewBox="0 0 420 320"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="draw-line it-edge"
        d="M70 250L140 120L210 70L280 70L350 160"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.1"
      />
      <path
        className="draw-line it-edge"
        d="M140 120L210 190L280 70"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.1"
      />
      <path
        className="draw-line it-edge"
        d="M70 250L210 190L350 160L350 250"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.1"
      />
      {[
        [70, 250],
        [140, 120],
        [210, 70],
        [210, 190],
        [280, 70],
        [350, 160],
        [350, 250],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className="it-node"
          cx={cx}
          cy={cy}
          r={index === 3 ? 6 : 4.2}
          fill={index === 3 ? '#c4a574' : 'currentColor'}
        />
      ))}
    </svg>
  )
}

export function CodeLayers() {
  const layers = [
    { label: 'Interface', detail: 'The surface operators actually touch' },
    { label: 'Domain', detail: 'Rules that survive a redesign' },
    { label: 'Data', detail: 'Owned, queryable, not a side effect' },
    { label: 'Edge', detail: 'Integrations that fail closed' },
  ]

  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      {layers.map((layer) => (
        <div
          key={layer.label}
          className="code-layer border border-current/20 px-5 py-4"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-55">
            {layer.label}
          </p>
          <p className="mt-1 text-[15px] leading-snug">{layer.detail}</p>
        </div>
      ))}
    </div>
  )
}

export function SaasFrame() {
  const rows = [
    { title: 'Tenant', copy: 'Who owns the data, and how isolation holds.' },
    { title: 'Meter', copy: 'What you charge for, and what that forces in the model.' },
    { title: 'Release', copy: 'How a change ships to one customer without waking the rest.' },
  ]

  return (
    <div className="saas-frame w-full max-w-[420px] border border-current/20">
      <div className="flex items-center gap-2 border-b border-current/15 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-current/30" />
        <span className="h-2 w-2 rounded-full bg-current/30" />
        <span className="h-2 w-2 rounded-full bg-prime" />
        <span className="ml-2 text-[11px] tracking-[0.16em] uppercase opacity-50">
          Product decisions
        </span>
      </div>
      {rows.map((row) => (
        <div
          key={row.title}
          className="saas-row border-b border-current/10 px-5 py-5 last:border-b-0"
        >
          <p className="font-serif text-[28px] leading-none">{row.title}</p>
          <p className="mt-2 max-w-[32ch] text-[14px] leading-relaxed opacity-70">
            {row.copy}
          </p>
        </div>
      ))}
    </div>
  )
}
