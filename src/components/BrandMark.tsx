import { brandImages } from '../assets/brand'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <img
      src={brandImages.mark}
      alt=""
      className={className}
      width={28}
      height={22}
    />
  )
}
