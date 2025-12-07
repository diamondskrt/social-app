import { useWindowScroll } from '@vueuse/core'
import { ref, watch } from 'vue'

export function useHideOnScroll() {
  const { y } = useWindowScroll()

  const isHidden = ref(false)
  const lastY = ref(0)

  // Sensitivity threshold (so that it doesn't twitch)
  const DELTA = 10

  watch(y, (current, previous) => {
    if (current <= 0) {
      isHidden.value = false
      lastY.value = 0
      return
    }

    // ignore small movements
    if (Math.abs(current - lastY.value) < DELTA) return

    isHidden.value = current > previous // down — hide, up — show
    lastY.value = current
  })

  return {
    isHidden,
  }
}
