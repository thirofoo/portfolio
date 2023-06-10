import { checkAuth } from '@/lib/auth'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'

export const useCheckAuth = (onSuccess: () => void, router: NextRouter) => {
  // 初回レンダリング時にのみ、onSuccessが定義される

  // React.StrictMode を有効にしている場合、useEffectで2回レンダリングされる様になる
  // → 初回でignoreをクリーンアップ関数でいじって2回目を無視する
  let ignore = false
  useEffect(() => {
    const fetchData = async () => {
      if (ignore) return
      const res = await checkAuth(router)
      if (res.ok) onSuccess()
      else router.push('/login')
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])
}
