export function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string
  title: string
  intro?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-prime uppercase">
        {label}
      </p>
      <h2 className="mt-4 max-w-[18em] text-[clamp(1.85rem,4.2vw,3.15rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-navy">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-mute">{intro}</p>
      ) : null}
    </div>
  )
}
