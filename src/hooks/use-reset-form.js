import { useEffect } from 'react'
import { useStore } from 'react-redux'

export const useResetForm = reset => {
  const store = useStore()

  useEffect(() => {
    let curWasLoagout = store.getState().app.wasLogout

    return store.subscribe(() => {
      let preWasLoagout = curWasLoagout
      curWasLoagout = store.getState().app.wasLogout

      if (preWasLoagout !== curWasLoagout) {
        reset()
      }
    })
  }, [reset, store])
}
