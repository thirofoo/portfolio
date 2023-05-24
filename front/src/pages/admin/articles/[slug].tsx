import { NextPage } from 'next'
import { AdminEdit } from '@/components/organisms/AdminEdit'

const EditArticlePage: NextPage = () => {
  return (
    <>
      <AdminEdit genre='articles'></AdminEdit>
    </>
  )
}

export default EditArticlePage
