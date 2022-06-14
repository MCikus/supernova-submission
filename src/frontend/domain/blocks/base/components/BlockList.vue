<template>
  <div class="w-full" :class="componentName">
    <div v-if="blocks.length > 0">
      <Draggable
        v-model="blocks"
        item-key="id"
        v-bind="dragOptions"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'transition-transform duration-500' : null,
        }"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element: block }">
          <div :key="block.id" class="my-2 flex">
            <component :is="block.definition.componentName" :block="block">
              <template #block-menu="{ customBlockMenuItems }">
                <BlockMenu
                  :block="block"
                  :custom-block-menu-items="customBlockMenuItems"
                />
              </template>
            </component>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUpdated, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Draggable from 'vuedraggable'
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import HeadlineBlock from '@/domain/blocks/headlineBlock/components/HeadlineBlock.vue'
import TextBlock from '@/domain/blocks/textBlock/components/TextBlock.vue'
import BlockMenu from '@/domain/blocks/base/components/BlockMenu.vue'
import LinkBlock from '@/domain/blocks/linkBlock/components/LinkBlock.vue'

export const componentName = 'BlockList'

export default defineComponent({
  name: componentName,
  components: {
    Draggable,
    HeadlineBlock,
    TextBlock,
    BlockMenu,
    LinkBlock,
  },
  props: {
    card: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  setup(props) {
    const blocksStore = useBlocksStore()
    const { blocks: blocksFromStore } = storeToRefs(blocksStore)

    const blocks = computed({
      get() {
        return blocksFromStore.value
      },
      set(value) {
        blocksStore.reorderBlocks(value)
      },
    })

    const dragOptions = {
      animation: 200,
      disabled: false,
      ghostClass: 'opacity-50',
    }
    const drag = ref(false)

    onMounted(async () => {
      await blocksStore.findAllBlocks(props.card)
    })

    onUpdated(async () => {
      await blocksStore.findAllBlocks(props.card)
    })

    return {
      componentName,
      blocks,
      dragOptions,
      drag,
    }
  },
})
</script>

<style scoped></style>
