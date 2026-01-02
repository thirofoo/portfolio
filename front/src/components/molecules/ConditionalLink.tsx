import { LinkCard } from '@/components/molecules/LinkCard'

type ConditionalLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  title?: string
  description?: string
  img?: string
  icon?: string
  url?: string
  twitter_normal?: string
  twitter_dark?: string
}

export const ConditionalLink = ({
  children,
  title,
  description,
  img,
  icon,
  url,
  twitter_normal,
  twitter_dark,
  className,
  ...props
}: ConditionalLinkProps) => {
  const isLinkCard = !!(title || twitter_normal)
  const href = props.href ?? url

  if (isLinkCard) {
    if (!href) {
      return (
        <span className={className} style={{ textDecoration: 'underline' }}>
          {children}
        </span>
      )
    }
    return (
      <LinkCard
        url={href}
        title={title ?? ''}
        description={description ?? ''}
        img={img ?? ''}
        icon={icon ?? ''}
        twitter_normal={twitter_normal ?? ''}
        twitter_dark={twitter_dark ?? ''}
      />
    )
  }

  if (!href) {
    return (
      <span className={className} style={{ textDecoration: 'underline' }}>
        {children}
      </span>
    )
  }

  return (
    <a {...props} href={href} style={{ textDecoration: 'underline' }}>
      {children}
    </a >
  )
}
