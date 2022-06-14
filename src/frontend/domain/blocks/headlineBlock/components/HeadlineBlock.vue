<template>
  <div v-if="editor" class="flex flex-nowrap w-full" :class="[componentName]">
    <bubble-menu
      v-if="editor"
      class="space-x-1 rounded-md bg-white"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <button
        v-for="headlineLevel in levelConfig"
        :key="headlineLevel"
        class="rounded-md border-2 border-gray-200 bg-white px-1"
        :class="
          editor.isActive('heading', { level: headlineLevel })
            ? 'border-blue-300 bg-blue-300'
            : ''
        "
        @click="handleBubbleButtonClick(editor, headlineLevel)"
      >
        H{{ headlineLevel }}
      </button>
    </bubble-menu>
    <BlockHandle class="mt-1 mr-1"/>
    <div
      class="flex w-full flex-row rounded-md hover:bg-gray-200 hover:bg-opacity-70 focus:outline-none"
    >
      <div class="flex grow  px-2 overflow-hidden">
        <editor-content class="w-full" :editor="editor" />
      </div>
    </div>
    <div class="mt-1">
      <slot name="block-menu" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import BlockHandle from "@/domain/blocks/base/components/BlockHandle.vue"
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/vue-3'
import OneLinerDoc from '@/domain/blocks/base/components/OneLinerDoc.js'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'

export const componentName = 'HeadlineBlock'

export default defineComponent({
  name: componentName,
  components: {
    BubbleMenu,
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
    const passedLevel = ref(props.block?.payload?.level ?? 1)
    const resolvedLevel = computed(() =>
      [1, 2, 3, 4, 5, 6].includes(passedLevel.value) ? passedLevel.value : 1,
    )

    const levelConfig = [1, 2, 3, 4, 5, 6]

    const editor = useEditor({
      content: `<h${resolvedLevel.value}>${value.value}</h${resolvedLevel.value}>`,
      extensions: [
        OneLinerDoc,
        Paragraph,
        Text,
        Heading.configure({
          levels: levelConfig,
        }),
      ],
      onUpdate({ editor }) {
        const change = editor.getJSON()
        const payload = {
          ...props.block,
          payload: {
            level: change?.content?.[0]?.attrs?.level ?? resolvedLevel.value,
            value: change?.content?.[0]?.content?.[0]?.text ?? '',
          },
        }

        blocksStore.updateBlock(props.block.uuid, payload)

        // fix tiptap losing headline level when text is deleted
        if (!change?.content?.[0]?.attrs?.level) {
          editor.chain().focus().toggleHeading({ level: payload.level }).run()
        }
      },
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
        },
      },
    })

    const handleBubbleButtonClick = (editorInstance, level) => {
      editorInstance.chain().focus().toggleHeading({ level: level }).run()
    }

    return {
      componentName,
      editor,
      levelConfig,
      handleBubbleButtonClick,
    }
  },
})
</script>

<style scoped></style>
