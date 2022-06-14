<template>
  <div v-if="editor" class="flex w-full flex-nowrap" :class="[componentName]">
    <BlockHandle class="mt-1 mr-1" />
    <div
      class="flex w-full flex-row rounded-md hover:bg-gray-200 hover:bg-opacity-70 focus:outline-none"
    >
      <div class="flex grow overflow-hidden px-2">
        <editor-content class="w-full" :editor="editor" />
      </div>
    </div>
    <div class="mt-1">
      <slot name="block-menu" />
    </div>
  </div>
</template>

<script>
import BlockHandle from '@/domain/blocks/base/components/BlockHandle.vue'
import { defineComponent, ref } from 'vue'
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import OneLinerDoc from '@/domain/blocks/base/components/OneLinerDoc.js'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export const componentName = 'TextBlock'

export default defineComponent({
  name: componentName,
  components: {
    BlockHandle,
    EditorContent,
  },
  props: {
    block: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const blocksStore = useBlocksStore()
    const value = ref(props.block?.payload?.value ?? '')

    const editor = useEditor({
      content: `<p>${value.value}</p>`,
      extensions: [OneLinerDoc, Paragraph, Text],
      onUpdate({ editor }) {
        const change = editor.getJSON()
        const payload = {
          ...props.block,
          payload: {
            value: change?.content?.[0]?.content?.[0]?.text ?? '',
          },
        }

        blocksStore.updateBlock(props.block.uuid, payload)
      },
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
        },
      },
    })

    return {
      componentName,
      editor,
    }
  },
})
</script>

<style scoped></style>
