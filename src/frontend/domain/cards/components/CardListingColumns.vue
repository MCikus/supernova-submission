<template>
  <Draggable
    v-model="parents"
    class="flex flex-row"
    :class="componentName"
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
        <div
          @click="expandCard(parent, parents)"
          class="relative z-20 mx-2.5 h-[176px] w-[320px] rounded-md bg-[#B6C3FF] p-2 drop-shadow-xl"
        >
          {{ parent.title }}
        </div>
        <div class="no-scrollbar relative z-10 h-full overflow-y-scroll px-2.5">
          <CardListingChildColumn :parent-card-id="parent.id" />
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
import CardListingChildColumn from '@/domain/cards/components/CardListingChildColumn.vue'
import { useCardsStore } from '@/domain/cards/services/useCardsStore.js'
import { useCardExpandedDialogStore } from '@/domain/cardExpanded/services/useCardExpandedDialogStore.js'

import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { v4 as uuid } from 'uuid'

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
    const useCardExpandedDialog = useCardExpandedDialogStore()

    const parents = computed({
      get() {
        return parentsFromStore.value
      },
      set(value) {
        useCards.updateParents(titleCardId.value, value)
      },
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

    const handleAddParentButtonClick = async () => {
      const parentCardToBeAdded = {
        id: uuid(),
        title: '',
        meta: {},
        blocks: [],
        children: [],
      }

      await useCards.updateParents(titleCardId.value, [
        ...(parents?.value ?? []),
        parentCardToBeAdded,
      ])
      await useCards.createCard(parentCardToBeAdded)
    }

    return {
      componentName,
      titleCardId,
      parents,
      drag,
      dragOptions,
      handleAddParentButtonClick,
      expandCard: useCardExpandedDialog.open,
    }
  },
})
</script>
