<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { TresLeches, useControls } from '@tresjs/leches'

const isDark = useDark()
const toggleDark = useToggle(isDark)

useControls('fpsgraph')
useControls({
  slider: {
    label: 'Slider',
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  darkMode: {
    label: isDark.value ? 'Light' : 'Dark',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      toggleDark()
    },
    icon: isDark.value ? 'i-carbon-sun' : 'i-carbon-moon',
    size: 'block',
  },
})
</script>

<template>
  <div class="w-full h-full bg-white dark:bg-black">
    <button @click="toggleDark">
      {{ isDark ? 'Light' : 'Dark' }}
    </button>
    <TresLeches />
  </div>
</template>
