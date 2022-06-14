<template>
  <div class="w-full" :class="[componentName]">
    <div v-if="blocks.length > 0">
      <Draggable
        v-model="blocks"
        item-key="uuid"
        v-bind="dragOptions"
        :component-data="{
          type: 'transition-group',
          name: !isDragging ? 'transition-transform duration-500' : null,
        }"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <div :key="element.uuid" class="my-2 flex">
            <component :is="element.definition.componentName" :block="element">
              <template #block-menu="{ customBlockMenuItems }">
                <BlockMenu
                  :block="element"
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
import { computed, defineComponent, onMounted, ref } from 'vue'
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
    cardId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const blocksStore = useBlocksStore()
    const { completeCardBlocks } = storeToRefs(blocksStore)
    const dragOptions = {
      animation: 200,
      disabled: false,
      ghostClass: 'opacity-50',
    }
    const isDragging = ref(false)

    onMounted(async () => {
      await blocksStore.completeBlocksForCard(props.cardId)
    })

    return {
      componentName,
      blocks: computed({
        get() {
          return completeCardBlocks.value
        },
        set(value) {
          blocksStore.reorderBlockList(value)
        },
      }),
      dragOptions,
      isDragging,
      onDragStart: () => (isDragging.value = true),
      onDragEnd: () => (isDragging.value = false),
    }
  },
})
</script>

<style scoped></style>
