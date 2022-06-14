<template>
  <Draggable

    v-model="children"
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
        class="mt-4 h-[176px] w-[320px] rounded-md bg-white p-2 drop-shadow-md"
      >
        {{ child.title }}
      </div>
    </template>
    <template #footer>
      <div class="flex w-full justify-center py-4">
        <button @click="handleAddChildButtonClick">AddButton</button>
      </div>
      <div class="h-[176px]"></div>
    </template>
  </Draggable>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import Draggable from 'vuedraggable'
import { useCardsStore } from '@/domain/cards/services/useCardsStore.js'
import { v4 as uuid } from 'uuid'
import { storeToRefs } from 'pinia'

export const componentName = 'CardListingChildColumn'

export default defineComponent({
  name: componentName,
  components: {
    Draggable,
  },
  props: {
    parentCardId: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    const useCards = useCardsStore()
    const { children: childrenFromStore } = storeToRefs(useCards)
    const computedParentCardId = computed(() => props.parentCardId)

    const children = computed({
      get() {
        return childrenFromStore.value[computedParentCardId.value]
      },
      set(value) {
        useCards.updateChildren(computedParentCardId.value, value)
      },
    })

    const drag = ref(false)
    const dragOptions = {
      animation: 200,
      disabled: false,
      ghostClass: 'opacity-50',
    }

    const handleAddChildButtonClick = async () => {
      const childCardToBeAdded = {
        id: uuid(),
        title: '',
        meta: {},
        blocks: [],
        children: [],
      }

      await useCards.updateChildren(computedParentCardId.value, [...(children?.value ?? []), childCardToBeAdded])
      await useCards.createCard(childCardToBeAdded)
    }

    return {
      componentName,
      children,
      drag,
      dragOptions,
      handleAddChildButtonClick,
    }
  },
})
</script>
