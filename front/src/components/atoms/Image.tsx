import NextImage from 'next/image'

type Props = {
  className?: string
  src: string
  alt: string
  width?: number
  height?: number
}

// default width and height are 10000px (適当に大きい値)
export const Image = ({ className, src, alt, width = 10000, height = 10000 }: Props) => {
  return <NextImage className={className} src={src} alt={alt} width={width} height={height} />
}
