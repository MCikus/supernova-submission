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
    </template>
  </BaseAppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import Navigation from '@/app/components/Navigation.vue'
import CreateNewTopicDialog from '@/domain/createTopic/components/CreateNewTopicDialog.vue'
import AcceptChangesDialog from '@/domain/updateTopic/components/AcceptChangesDialog.vue'
import ProposeChangesDialog from '@/domain/updateTopic/components/ProposeChangesDialog.vue'
import CardListingForATopic from '@/domain/cards/components/CardListingForATopic.vue'

export const componentName = 'PTopic'

export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
    Navigation,
    AcceptChangesDialog,
    ProposeChangesDialog,
    CreateNewTopicDialog,
    CardListingForATopic,
  },
  setup() {
    return {
      componentName,
    }
  },
})
</script>

<style scoped></style>
