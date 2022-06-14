<template>
  <BaseAppLayout class="bg-base-200" :class="componentName">
    <template #navigation>
      <Navigation />
    </template>
    <template #content>
      <CardListingForATopic />
    </template>
    <template #dialog>
      <AcceptChangesDialog />
      <ProposeChangesDialog />
      <CreateNewTopicDialog />
      <CardExpandedDialog />
    </template>
  </BaseAppLayout>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import Navigation from '@/app/components/Navigation.vue'
import CreateNewTopicDialog from '@/domain/createTopic/components/CreateNewTopicDialog.vue'
import AcceptChangesDialog from '@/domain/updateTopic/components/AcceptChangesDialog.vue'
import ProposeChangesDialog from '@/domain/updateTopic/components/ProposeChangesDialog.vue'
import CardListingForATopic from '@/domain/cards/components/CardListingForATopic.vue'
import CardExpandedDialog from "@/domain/cardExpanded/components/CardExpandedDialog.vue"
import {useBlockDefinitionsStore} from "@/domain/blocks/base/services/stores/useBlockDefinitionsStore.js"

export const componentName = 'PTopic'

export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
    Navigation,
    CardListingForATopic,
    AcceptChangesDialog,
    ProposeChangesDialog,
    CreateNewTopicDialog,
    CardExpandedDialog,
  },
  setup() {
    onMounted(() => {
      useBlockDefinitionsStore().fetchAllBlockDefinitions()
    })
    return {
      componentName,
    }
  },
})
</script>

<style scoped></style>
