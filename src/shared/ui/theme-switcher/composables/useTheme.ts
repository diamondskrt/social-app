import { type BasicColorSchema, useColorMode } from '@vueuse/core'
import { computed } from 'vue'

export function useTheme() {
  const { store } = useColorMode()
  const setStore = (value: BasicColorSchema) => {
    store.value = value
  }

  const isDark = computed(() => store.value === 'dark')
  const isAuto = computed(() => store.value === 'auto')
  const isLight = computed(() => store.value === 'light')

  return {
    store,
    setStore,
    isDark,
    isAuto,
    isLight,
  }
}
