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

  if (isLinkCard) {
    return (
      <LinkCard
        url={props.href ?? url ?? ''}
        title={title ?? ''}
        description={description ?? ''}
        img={img ?? ''}
        icon={icon ?? ''}
        twitter_normal={twitter_normal ?? ''}
        twitter_dark={twitter_dark ?? ''}
      />
    )
  }

  return (
    <a {...props} style={{ textDecoration: 'underline' }}>
      {children}
    </a >
  )
}