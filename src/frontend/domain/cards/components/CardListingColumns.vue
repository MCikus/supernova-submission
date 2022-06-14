<template>
    <Draggable
      v-if="parents.length > 0"
      class="flex flex-row"
      :class="componentName"
      :list="parents"
      item-key="id"
      v-bind="dragOptions"
      :component-data="{
        type: 'transition-group',
        name: !drag ? 'transition-transform duration-500' : null,
      }"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element: parent }">
        <div :key="parent.id">
          <div class="relative z-20 mx-2 p-2 h-[176px] w-[320px] bg-[#B6C3FF] rounded-md drop-shadow-md">
            {{ parent.title }}
          </div>
          <div class="no-scrollbar relative z-10 h-full overflow-y-scroll pt-2 px-2">
            <Draggable
              v-if="parent.children.length > 0"
              :list="children[parent.id]"
              item-key="id"
              v-bind="dragOptions"
              :component-data="{
                type: 'transition-group',
                name: !drag ? 'transition-transform duration-500' : null,
              }"
              @start="drag = true"
              @end="drag = false"
            >
              <template #item="{ element: child }">
                <div
                  :key="child.id"
                  class="mt-2 h-[176px] w-[320px] bg-white rounded-md p-2 drop-shadow-md"
                >
                  {{ child.title }}
                </div>
              </template>
              <template #footer>
                <div class="flex w-full justify-center py-4">
                  <button>AddButton</button>
                </div>
                <div class="h-[176px]"></div>
              </template>
            </Draggable>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="mx-2 flex items-start justify-start py-4">
          <button>AddButton</button>
        </div>
      </template>
    </Draggable>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from 'vue'
import Draggable from 'vuedraggable'
import { useCardsStore } from '@/domain/cards/services/useCardsStore.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

export const componentName = 'CardListingColumn'

export default defineComponent({
  name: componentName,
  components: {
    Draggable,
  },
  setup() {
    const titleCardId = computed(() => useRoute().params.titleCardId)
    const useCards = useCardsStore()
    const { parents, children } = storeToRefs(useCards)

    const drag = ref(false)
    const dragOptions = {
      animation: 200,
      disabled: false,
      ghostClass: 'opacity-50',
    }

    onMounted(async () => {
      await useCards.findAllParentsAndChildren(titleCardId.value)
    })

    return {
      componentName,
      titleCardId,
      parents,
      children,
      drag,
      dragOptions,
    }
  },
})
</script>
