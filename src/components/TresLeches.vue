<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, toRefs, unref, computed } from 'vue'
import { useWindowSize, useDark, useToggle } from '@vueuse/core'
import { UseDraggable } from '../composables/useDraggable/component'
import { useControlsProvider } from '../composables/useControls'
import type { Control } from '../types'
import Folder from './Folder.vue'

import ControlInput from './ControlInput.vue'

const props = defineProps<{
  uuid?: string
}>()

const { uuid } = toRefs(props)
const isDark = useDark()
const toggleDark = useToggle(isDark)

const { width } = useWindowSize()

const DEFAULT_WIDTH = 280

const handle = ref<HTMLElement | null>(null)

const controls = useControlsProvider(uuid?.value)

function onChange(key: Ref<string>, value: string) {
  controls[unref(key)].value = value as any
  controls[unref(key)][unref(key)] = value as any
}

const groupedControls = computed(() => {
  const groups: { [folder: string]: Control[] } = {}

  for (const key in controls) {
    const control = controls[key]
    const folderName = control.folder || 'default' // Ensure we access the value of the ref

    if (!groups[folderName as unknown as string]) {
      groups[folderName as unknown as string] = []
    }
    groups[folderName as unknown as string].push(control)
  }

  return groups
})
</script>

<template>
  <UseDraggable
    :id="uuid"
    :initial-value="{ x: width - DEFAULT_WIDTH - 40, y: 10 }"
    class="tl-absolute tl-select-none tl-z-24 tl-w-280px tl-font-sans tl-text-xs"
    :class="$attrs.class"
    :handle="handle"
  >
    <div
      tabindex="0"
      class="tl-shadow-xl
      tl-rounded 
      tl-border-4 
      tl-border-solid 
      tl-bg-primary 
      tl-border-primary 
      tl-overflow-hidden 
      tl-w-full 
      tl-h-full 
      tl-flex 
      tl-flex-col 
      tl-justify-between"
    >
      <header
        ref="handle"
        class="tl-relative  tl-p-4 tl-flex tl-justify-between tl-items-center tl-text-gray-200"
      >
        <i class="tl-cta-icon tl-bg-secondary">🍰</i>
        <div class="tl-cursor-grabbing">
          <i class="i-ic-baseline-drag-indicator tl-text-primary" />
          <i class="i-ic-baseline-drag-indicator tl-text-primary" />
          <i class="i-ic-baseline-drag-indicator tl-text-primary" />
        </div>
        <div class="actions">
          <i
            class="tl-text-sm tl-text-primary hover:tl-text-secondary tl-cursor-pointer"
            :class="{
              'i-carbon-moon': !isDark,
              'i-carbon-sun': isDark,
            }"
            @click="toggleDark()"
          />
        </div>
      </header>
      <template
        v-for="(group, folderName) of groupedControls"
        :key="folderName"
      >
        <Folder
          v-if="folderName !== 'default'"
          :label="folderName"
          :controls="group"
        />
        <template v-if="folderName === 'default'">
          <ControlInput 
            v-for="control in group"  
            :key="control.label" 
            :control="control" 
            @change="newValue => onChange(control.key, newValue)" 
          />
        </template>
      </template>
    </div>
  </UseDraggable>
</template>
