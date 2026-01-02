import NextImage from 'next/image'

type Props = {
  className?: string
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  sizes?: string
}

// default width and height are 10000px
export const Image = ({
  className,
  src,
  alt,
  width = 10000,
  height = 10000,
  loading = 'lazy',
  priority = false,
  sizes,
}: Props) => {
  // Check if we are in a development environment
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Add /api/proxy?url= to src only in development environment
  if (
    (isDevelopment ||
      (!src.startsWith('https://res.cloudinary.com') &&
        !src.startsWith('https://cdn.qiita.com') &&
        !src.startsWith('https://qiita-user-contents.imgix.net'))) &&
    src.startsWith('http')
  ) {
    src = `/api/proxy?url=${src}`
  }

  return (
    <NextImage
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
    />
  )
}
