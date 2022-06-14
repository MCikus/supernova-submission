<template>
    <Draggable
      v-if="parents.length > 0"
      class="flex flex-row"
      :class="componentName"
      v-model="parents"
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
          <div class="relative z-20 mx-2.5 p-2 h-[176px] w-[320px] bg-[#B6C3FF] rounded-md drop-shadow-xl">
            {{ parent.title }}
          </div>
          <div class="no-scrollbar relative z-10 h-full overflow-y-scroll px-2.5">
            <CardListingChildColumn :parent-card-id="parent.id"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="mx-2 flex items-start justify-start py-4">
          <button @click="handleAddParentButtonClick">AddButton</button>
        </div>
      </template>
    </Draggable>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from 'vue'
import Draggable from 'vuedraggable'
import CardListingChildColumn from "@/domain/cards/components/CardListingChildColumn.vue"
import { useCardsStore } from '@/domain/cards/services/useCardsStore.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

export const componentName = 'CardListingColumn'

export default defineComponent({
  name: componentName,
  components: {
    Draggable,
    CardListingChildColumn,
  },
  setup() {
    const titleCardId = computed(() => useRoute().params.titleCardId)
    const useCards = useCardsStore()
    const { parents: parentsFromStore } = storeToRefs(useCards)

    const parents = computed({
      get() {
        return parentsFromStore.value
      },
      set(value) {
        useCards.updateParentsCardOrder(titleCardId.value, value)
      }
    })

    const drag = ref(false)
    const dragOptions = {
      animation: 200,
      disabled: false,
      ghostClass: 'opacity-50',
    }

    onMounted(async () => {
      await useCards.findAllParentsAndChildren(titleCardId.value)
    })

    const handleAddParentButtonClick = (event) => {
      console.error('🚨 handleAddParentButtonClick not implemented yet', event)
    }

    return {
      componentName,
      titleCardId,
      parents,
      drag,
      dragOptions,
      handleAddParentButtonClick
    }
  },
})
</script>
