type PoweredByProps = {
  size?: 'sm' | 'md'
}

export function PoweredBy({ size = 'sm' }: PoweredByProps) {
  return (
    <span className={`powered-by powered-by-${size}`}>
      <span className="powered-by-kicker">Powered by</span>
      <span className="powered-by-name">ztech solutions</span>
    </span>
  )
}
