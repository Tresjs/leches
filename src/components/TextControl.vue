<script setup lang="ts">
import type { Control } from '../types'
import ControlLabel from './ControlLabel.vue'

defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).value)
}
</script>

<template>
  <div class="tl-flex tl-px-4 tl-justify-between tl-gap-4 tl-items-center tl-mb-2 tl-min-h-32px">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :id="control.uniqueKey"
      :value="control.value"
      type="text"
      tabindex="0"
      class=" 
        tl-bg-secondary
        tl-text-primary
        tl-p-2
        tl-w-2/3
        tl-rounded
        tl-text-right
        tl-text-xs
        focus:tl-border-gray-200
        tl-border-none
        tl-font-sans
      "
      :aria-label="label"
      placeholder="Enter value here..."
      @change="onChange"
    >
  </div>
</template>
