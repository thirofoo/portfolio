export const getUrl = (public_id: string): string => {
  return (
    'https://res.cloudinary.com/' +
    process.env.CLOUDINARY_CLOUD_NAME +
    '/image/upload/v1684482420/portfolio/' +
    public_id
  )
}
