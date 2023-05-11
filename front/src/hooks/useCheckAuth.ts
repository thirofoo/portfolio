import { useEffect, useCallback } from 'react'
import { checkAuth } from '@/lib/auth'
import { useRouter } from 'next/router'

export const useCheckAuth = (onSuccess: () => void) => {
  const router = useRouter()
  // onSuccessがuseEffectのhooklistに無い為、callback関数でまとめないと、
  // useEffect → onSuccess生成 → useEffect → ...
  // と無限renderingになる。
  const handleSuccess = useCallback(onSuccess, [])
  useEffect(() => {
    const fetchData = async () => {
      const res = await checkAuth()
      if (res.ok) {
        handleSuccess()
      } else {
        router.push('/login')
      }
    }
    fetchData()
  }, [handleSuccess, router])
}
