<template>
  <div class="flex w-full flex-row rounded-md bg-gray-200" :class="componentName">
    <div v-if="showUrlInput" class="flex grow overflow-hidden">
      <input
        ref="inputRef"
        v-model="value"
        class="mx-auto w-full truncate rounded-md bg-gray-200 p-2 leading-8 focus:outline-none"
        @keydown.enter="handleSubmitUrl"
      />
    </div>
    <div
      v-if="!showUrlInput"
      class="flex grow cursor-pointer flex-row overflow-hidden rounded-md bg-gray-200"
      @click.stop="openLink(linkPreviewContent.url)"
    >
      <div
        v-if="linkPreviewContent.image && !previewIsLoading"
        class="flex flex-shrink-0 flex-grow-0 basis-32 rounded-l-md bg-gray-200"
      >
        <img
          class="h-24 w-32 object-cover"
          :src="linkPreviewContent.image"
          :alt="linkPreviewContent.title"
        />
      </div>
      <div class="flex flex-shrink flex-col overflow-hidden p-2">
        <h2
          v-if="linkPreviewContent.title && !previewIsLoading"
          class="truncate text-base font-bold leading-[18px]"
        >
          {{ linkPreviewContent.title }}
        </h2>
        <p
          v-if="linkPreviewContent.description && !previewIsLoading"
          class="text-xs leading-4 line-clamp-2"
        >
          {{ linkPreviewContent.description }}
        </p>
        <a
          :href="linkPreviewContent.url"
          target="_blank"
          class="mt-auto truncate"
          :class="
            linkPreviewContent.image &&
            linkPreviewContent.title &&
            linkPreviewContent.description
              ? 'text-xs leading-4 text-[#73757B]'
              : 'text-base leading-8 text-[#4338CA] underline'
          "
        >
          {{ linkPreviewContent.url }}
        </a>
      </div>
    </div>
    <div v-if="previewIsLoading" class="mr-2 self-center">
      <div
        style="border-top-color: transparent !important"
        class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-opacity-30"
      />
    </div>
    <div v-if="!previewIsLoading" class="text-gray-500">
      <slot
        name="block-menu"
        :customBlockMenuItems="[
          { id: `edit-${block.uuid}`, title: 'Edit', callback: editUrl },
        ]"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import { findOpenGraphData } from '@/domain/blocks/linkBlock/services/openGraphApiClient.js'
import { log } from '@/app/services/errorService.js'

export const componentName = 'LinkBlock'

export default defineComponent({
  name: componentName,
  props: {
    block: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const blocksStore = useBlocksStore()
    const value = ref(props.block?.payload?.value ?? null)

    const inputRef = ref(null)
    const previewIsLoading = ref(false)
    const showUrlInput = ref(!value.value)

    const linkPreviewContent = reactive({
      image: null,
      title: null,
      description: null,
      url: null,
    })

    onMounted(async () => {
      if (value.value !== null) {
        await fetchContentPreview(value.value)
      }
    })

    const handleSubmitUrl = async (e) => {
      e.preventDefault()
      await fetchContentPreview(value.value)
    }

    const editUrl = async () => {
      showUrlInput.value = true
      await nextTick()
      inputRef?.value?.focus()
    }

    const fetchContentPreview = async (url) => {
      linkPreviewContent.url = url
      linkPreviewContent.title = null
      linkPreviewContent.image = null
      linkPreviewContent.description = null

      previewIsLoading.value = true
      showUrlInput.value = false

      if (props.block.payload.value !== url) {
        await blocksStore.updateBlock(props.block.uuid, {
          ...props.block,
          payload: { value: url },
        })
      }

      try {
        const data = await findOpenGraphData(url)
        linkPreviewContent.url = data?.url ?? url
        linkPreviewContent.title = data?.title ?? null
        linkPreviewContent.image = data?.image ?? null
        linkPreviewContent.description = data?.description ?? null
      } catch (error) {
        // @todo: handle error cases in UI
        log(error)
      }

      previewIsLoading.value = false
    }

    const openLink = (url) => {
      window.open(url, '_blank')
    }

    return {
      componentName,
      showUrlInput,
      linkPreviewContent,
      previewIsLoading,
      value,
      editUrl,
      handleSubmitUrl,
      inputRef,
      openLink,
    }
  },
})
</script>

<style scoped></style>
