type BrandMarkProps = {
  className?: string
  tone?: 'paper' | 'ink'
}

export function BrandMark({ className = '', tone = 'paper' }: BrandMarkProps) {
  const stroke = tone === 'ink' ? '#0b0b0c' : '#f3efe6'
  const prime = '#c4a574'

  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.2h12.4L5 20.8h13"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path
        d="M20.8 5.4v5.2"
        stroke={prime}
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  )
}
