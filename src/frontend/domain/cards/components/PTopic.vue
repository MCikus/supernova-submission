<template>
  <BaseAppLayout class="bg-base-200" :class="componentName">
    <template #navigation>
      <Navigation />
    </template>
    <template #content>
      {{ titleCardId }}
      {{ parents }}
      {{ children }}
    </template>
    <template #dialog>
      <AcceptChangesDialog />
      <ProposeChangesDialog />
      <CreateNewTopicDialog />
    </template>
  </BaseAppLayout>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import Navigation from '@/app/components/Navigation.vue'
import CreateNewTopicDialog from '@/domain/createTopic/components/CreateNewTopicDialog.vue'
import AcceptChangesDialog from '@/domain/updateTopic/components/AcceptChangesDialog.vue'
import ProposeChangesDialog from '@/domain/updateTopic/components/ProposeChangesDialog.vue'
import {useCardsStore} from "@/domain/cards/services/useCardsStore.js"
import {storeToRefs} from "pinia"
import { useRoute } from 'vue-router'

export const componentName = 'PTopic'

export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
    Navigation,
    AcceptChangesDialog,
    ProposeChangesDialog,
    CreateNewTopicDialog,
  },
  setup() {
    const titleCardId = computed(() => useRoute().params.titleCardId)
    const useCards = useCardsStore()
    const {parents, children} = storeToRefs(useCards)

    onMounted(() => {
      useCards.findAllParentsAndChildren(titleCardId.value)
    })

    return {
      componentName,
      titleCardId,
      parents,
      children,
    }
  }
})
</script>

<style scoped></style>
