<template>
  <div></div>
  <hr />
  <div class="ml-5 flex py-3">
    <svg
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.875 14V20M12.25 17H17.5M5.25 10H7C7.9665 10 8.75 9.10457 8.75 8V6C8.75 4.89543 7.9665 4 7 4H5.25C4.2835 4 3.5 4.89543 3.5 6V8C3.5 9.10457 4.2835 10 5.25 10ZM14 10H15.75C16.7165 10 17.5 9.10457 17.5 8V6C17.5 4.89543 16.7165 4 15.75 4H14C13.0335 4 12.25 4.89543 12.25 6V8C12.25 9.10457 13.0335 10 14 10ZM5.25 20H7C7.9665 20 8.75 19.1046 8.75 18V16C8.75 14.8954 7.9665 14 7 14H5.25C4.2835 14 3.5 14.8954 3.5 16V18C3.5 19.1046 4.2835 20 5.25 20Z"
        stroke="#5F75D7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <p class="ml-3 text-sm text-base-content">
      {{ statistics.payload.value.cardCount }} cards
    </p>
  </div>
  <hr />
  <div class="ml-5 flex py-3">
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 2.35418C10.1413 1.52375 11.0796 1 12.125 1C14.058 1 15.625 2.79086 15.625 5C15.625 7.20914 14.058 9 12.125 9C11.0796 9 10.1413 8.47624 9.5 7.64582M12.125 19H1.625V18C1.625 14.6863 3.97551 12 6.875 12C9.77449 12 12.125 14.6863 12.125 18V19ZM12.125 19H17.375V18C17.375 14.6863 15.0245 12 12.125 12C11.1687 12 10.2722 12.2922 9.5 12.8027M10.375 5C10.375 7.20914 8.808 9 6.875 9C4.942 9 3.375 7.20914 3.375 5C3.375 2.79086 4.942 1 6.875 1C8.808 1 10.375 2.79086 10.375 5Z"
        stroke="#5F75D7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <p class="ml-3 text-sm text-base-content">
      {{ statistics.payload.value.knowledgeContributors }} Knowledge Contributors
    </p>
  </div>
  <hr />
  <div
    v-if="statistics?.isMarketingCard?.payload?.value === false"
    class="ml-5 flex py-3"
  >
    <svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.875 17H19.25V15C19.25 13.3431 18.0747 12 16.625 12C15.7888 12 15.044 12.4468 14.5633 13.1429M14.875 17H6.125M14.875 17V15C14.875 14.3438 14.7644 13.717 14.5633 13.1429M6.125 17H1.75V15C1.75 13.3431 2.92525 12 4.375 12C5.21116 12 5.956 12.4468 6.43672 13.1429M6.125 17V15C6.125 14.3438 6.23562 13.717 6.43672 13.1429M6.43672 13.1429C7.08181 11.301 8.65796 10 10.5 10C12.342 10 13.9182 11.301 14.5633 13.1429M13.125 4C13.125 5.65685 11.9497 7 10.5 7C9.05025 7 7.875 5.65685 7.875 4C7.875 2.34315 9.05025 1 10.5 1C11.9497 1 13.125 2.34315 13.125 4ZM18.375 7C18.375 8.10457 17.5915 9 16.625 9C15.6585 9 14.875 8.10457 14.875 7C14.875 5.89543 15.6585 5 16.625 5C17.5915 5 18.375 5.89543 18.375 7ZM6.125 7C6.125 8.10457 5.3415 9 4.375 9C3.4085 9 2.625 8.10457 2.625 7C2.625 5.89543 3.4085 5 4.375 5C5.3415 5 6.125 5.89543 6.125 7Z"
        stroke="#5F75D7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <p class="ml-3 text-sm text-base-content">
      {{ statistics.payload.value.mjneContributors }} $MJNE Contributors
    </p>
  </div>
  <div v-else class="mt-72px"></div>
  <div v-if="statistics?.isMarketingCard?.payload?.value === false">
    <hr />
    <div class="mb-6"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CardTopicStatisticsBlock'

let statistics
export default defineComponent({
  name: componentName,
  props: {
    statistics,
  },
  setup: () => ({ componentName }),
  created() {
    // eslint-disable-next-line no-console
    console.log(this.statistics?.isMarketingCard?.payload?.value)
  },
})
</script>
