<template>
  <div
    aria-live="assertive"
    class="inset-0 flex items-end pointer-events-none p-1 sm:items-start"
  >
    <div class="w-full flex flex-col items-center sm:items-end">
      <div
        class="
          max-w-sm
          w-full
          bg-base-content
          rounded-[4px]
          pointer-events-auto
          overflow-hidden
          px-3
          py-2
        "
      >
        <div class="px-2 py-4">
          <div class="flex gap-2 items-start">
            <div class="flex-shrink-0">
              <SunIcon class="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-base-100 max-w-[30ch]">{{ notification.message }}</p>
              <button
                v-if="notification.action?.text"
                type="button"
                class="
                  mt-3
                  rounded-md
                  text-sm
                  shadow-sm
                  bg-accent
                  text-base-100
                  px-5
                  py-2
                  focus:outline-none
                "
                @click="notification.action?.action"
              >
                {{ notification.action?.text }}
              </button>
            </div>
            <div class="flex-shrink-0 flex">
              <button
                type="button"
                class="inline-flex text-base-100 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { SunIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import { NotificationProps } from '@/app/services/useNotificationsStore'

const props = defineProps<{ notification: NotificationProps }>()
</script>