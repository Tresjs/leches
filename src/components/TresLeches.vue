<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { UseDraggable } from '@vueuse/components'

import { computed, ref } from 'vue'
import { useControlsProvider } from '../composables/useControls'
import ControlInput from './ControlInput.vue'

const { width } = useWindowSize()

const DEFAULT_WIDTH = 280

const handle = ref<HTMLElement | null>(null)

const state = useControlsProvider()
</script>
<template>
  <UseDraggable
    :initial-value="{ x: width - DEFAULT_WIDTH - 20, y: 10 }"
    class="fixed select-none z-24 w-280px font-sans text-xs"
    :handle="handle"
  >
    <div class="bg-white shadow-xl rounded border-4 border-solid border-black">
      <header ref="handle" class="relative cursor-grabbing p-4 flex justify-between text-gray-200 relative">
        <i class="h-4 w-4 p-1 rounded-full bg-gray-100 text-xs">🍰</i>
        <div>
          <i class="i-ic-baseline-drag-indicator" /><i class="i-ic-baseline-drag-indicator" /><i
            class="i-ic-baseline-drag-indicator"
          />
        </div>
        <div></div>
      </header>
      <div class="p-4">
        <template v-for="control in state.controls" :key="control.label">
          <ControlInput :control="control" />
        </template>
      </div>
    </div>
  </UseDraggable>
</template>