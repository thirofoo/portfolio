import { checkAuth } from '@/lib/auth'
import { NextRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export const useCheckAuth = (onSuccess: () => void, router: NextRouter) => {
  // 初回レンダリング時にのみ、onSuccessが定義される
  // React.StrictMode を有効にしている場合、useEffectで2回レンダリングされる様になる
  // → 初回でignoreをクリーンアップ関数でいじって2回目を無視する

  const [isLoading, setIsLoading] = useState(true)
  const ignoreRef = useRef(false)
  
  useEffect(() => {
    ignoreRef.current = false
    const fetchData = async () => {
      const res = await checkAuth(router)
      if (ignoreRef.current) {
        return
      }
      if (res.ok) {
        onSuccess()
        setIsLoading(false) // 認証完了後にisLoadingをfalseに設定
      } else {
        router.push('/login')
      }
    }
    fetchData()
    return () => {
      ignoreRef.current = true
    }
  }, [onSuccess, router])
  
  return isLoading
}
