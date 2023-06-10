import { AdminEdit } from '@/components/organisms/AdminEdit'
import { NextPage } from 'next'

const EditArticlePage: NextPage = () => {
  return (
    <>
      <AdminEdit genre='articles'></AdminEdit>
    </>
  )
}

export default EditArticlePage
