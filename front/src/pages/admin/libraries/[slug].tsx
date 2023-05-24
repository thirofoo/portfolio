import { NextPage } from 'next'
import { AdminEdit } from '@/components/organisms/AdminEdit'

const EditLibraryPage: NextPage = () => {
  return (
    <>
      <AdminEdit genre='libraries'></AdminEdit>
    </>
  )
}

export default EditLibraryPage
