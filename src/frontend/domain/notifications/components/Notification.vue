<template>
  <div
    aria-live="assertive"
    class="pointer-events-none inset-0 flex items-end py-1 sm:items-start"
  >
    <div class="flex w-full flex-col items-center sm:items-end">
      <div
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-[4px] bg-base-content px-3 py-2"
      >
        <div class="px-2 py-4">
          <div class="flex items-start gap-2">
            <div class="flex-shrink-0">
              <SunIcon class="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <div class="ml-3 flex-1">
              <p class="max-w-[30ch] text-sm text-base-100">{{ notification.message }}</p>
              <button
                v-if="notification.action?.text"
                type="button"
                class="mt-3 rounded-md bg-accent px-5 py-2 text-sm text-base-100 shadow-sm focus:outline-none"
                @click="notification.action?.action"
              >
                {{ notification.action?.text }}
              </button>
            </div>
            <div class="flex flex-shrink-0">
              <button
                type="button"
                class="inline-flex text-base-100 hover:text-gray-500 focus:outline-none"
                @click="removeNotification(notification.id)"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { SunIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import {
  NotificationProps,
  useNotificationsStore,
} from '@/domain/notifications/services/useNotificationsStore'

defineProps<{ notification: NotificationProps }>()
const { removeNotification } = useNotificationsStore()
</script>
