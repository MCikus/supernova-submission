/* eslint-disable no-eval */
<template>
  <BaseAppLayout class="bg-secondary" :class="$options.name">
    <template #navigation>
      <Navigation />
    </template>
    <template #content>
      <div class="flex h-full flex-col">
        <div
          v-if="computedTTopicChildrenViewData.parent"
          class="px-4 pb-7 pt-10 md:px-6 md:pb-3 md:pt-8 2xl:px-[10.5rem]"
        >
          <AParentCardButton
            :component-data="computedTTopicChildrenViewData"
            @a-parent-card-button-clicked="
              handleCardOpen(computedCardContext?.parent?.id)
            "
          />
        </div>
        <OCardsContainer>
          <template #userCards>
            <Draggable
              v-if="computedCardContext?.siblings"
              :list="computedCardContext?.siblings"
              tag="transition-group"
              item-key="id"
              v-bind="dragOptions"
              :component-data="{
                type: 'transition-group',
                name: !drag ? 'transition-transform duration-500' : null,
              }"
              @start="onDragStart"
              @end="onDragEnd"
              @change="onDragChange($event, computedCardContext.siblings)"
            >
              <template #item="{ element, index }">
                <MCard
                  :key="element.id"
                  :component-data="{
                    ...element,
                    cardSiblings: computedCardContext.siblings,
                    currentCard: computedCardContext.current,
                  }"
                >
                  <!-- @todo: Add template/slot for BlockList.vue-->
                  <Draggable
                    :list="element.children"
                    tag="transition-group"
                    item-key="id"
                    v-bind="dragOptions"
                    :component-data="{
                      type: 'transition-group',
                      name: !drag ? 'transition-transform duration-500' : null,
                    }"
                    @start="onDragStart"
                    @end="onDragEnd"
                    @change="onDragChange($event, element.children)"
                  >
                    <!-- eslint-disable vue/no-template-shadow -->
                    <template #item="{ element }">
                      <MCard
                        :key="element.id"
                        :ref="element.id"
                        :component-data="{
                          ...element,
                          cardSiblings: computedCardContext.siblings[index].children,
                        }"
                        :is-child="true"
                      />
                    </template>
                    <!--eslint-enable-->
                  </Draggable>
                  <ACreateCardButton
                    :is-child="true"
                    :create-card-is-disabled="false"
                    @a-create-card-button-clicked="
                      handleCreateCardButtonClick(element?.id)
                    "
                  />
                </MCard>
              </template>
            </Draggable>
          </template>
          <template #defaultCard>
            <ACreateCardButton
              :is-disabled="false"
              @aCreateCardButtonClicked="
                handleCreateCardButtonClick(computedCardContext?.parent?.id)
              "
            />
          </template>
        </OCardsContainer>
      </div>
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
import { v4 as uuidv4 } from 'uuid'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import Navigation from '@/app/components/Navigation.vue'
import CreateNewTopicDialog from '@/domain/createTopic/components/CreateNewTopicDialog.vue'
import AcceptChangesDialog from '@/domain/updateTopic/components/AcceptChangesDialog.vue'
import ProposeChangesDialog from '@/domain/updateTopic/components/ProposeChangesDialog.vue'
import AParentCardButton from '@/domain/cards/components/AParentCardButton.vue'
import OCardsContainer from '@/domain/cards/components/OCardsContainer.vue'
import MCard from '@/domain/cards/components/MCard.vue'
import ACreateCardButton from '@/domain/cards/components/ACreateCardButton.vue'
import Draggable from 'vuedraggable'
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import { useBlockDefinitionsStore } from '@/domain/blocks/base/services/stores/useBlockDefinitionsStore.js'
import { useProposalsStore } from '@/domain/updateTopic/services/useProposalsStore.js'
import { reactive } from 'vue'
import { log } from '@/app/services/errorService.js'
import { useAnalyticsInfoStore } from '@/app/services/useAnalyticsInfoStore.js'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'PCard',
  components: {
    AcceptChangesDialog,
    ProposeChangesDialog,
    BaseAppLayout,
    CreateNewTopicDialog,
    Navigation,
    AParentCardButton,
    OCardsContainer,
    MCard,
    ACreateCardButton,
    Draggable,
  },
  data() {
    return {
      drag: false,
      dragOptions: {
        animation: 200,
        disabled: false,
        ghostClass: 'opacity-50',
      },
      cardContext: {},
    }
  },
  computed: {
    computedCardContext() {
      return reactive({ ...this.cardContext })
    },
    computedTTopicChildrenViewData() {
      return {
        parent: this.cardContext?.parent,
        navBar: {
          name: 'Thomas Cook',
        },
      }
    },
  },
  async mounted() {
    // @todo: temporary solution. Move this up to app.js once the app is fully migrated to a SPA
    try {
      await useBlocksStore().fetchAllBlocks()
      await useBlockDefinitionsStore().fetchAllBlockDefinitions()
      await useProposalsStore().findAllProposals()
    } catch (error) {
      // @todo: handle errors properly instead logging them
      log(error)
    }

    const analyticsInfoStore = useAnalyticsInfoStore()
    const { defineUserInfo, defineVersionInfo, defineEnvironmentInfo } =
      analyticsInfoStore
    const { isSmartlookInitialized, analyticsInformation } =
      storeToRefs(analyticsInfoStore)

    defineUserInfo(this?.$page?.props?.auth?.user)
    defineVersionInfo(this?.$page?.props?.__version ?? {})
    defineEnvironmentInfo(this?.$page?.props?.environment ?? null)

    const smartlook = window?.smartlook

    if (smartlook && !isSmartlookInitialized.value) {
      const smartlookInformation = {
        email: analyticsInformation.value.user.email,
        environment: analyticsInformation.value.environment,
        buildId: analyticsInformation.value.version.buildId,
        commit: analyticsInformation.value.version.commit,
        buildTag: analyticsInformation.value.version.buildTag,
      }
      smartlook('identify', analyticsInformation.value.user.id, smartlookInformation)
    }
  },
  methods: {
    onDragStart() {
      this.drag = true
    },
    onDragEnd() {
      this.drag = false
    },
    onDragChange({ moved }, siblings) {
      let previousCardId

      if (moved.newIndex === 0) {
        previousCardId = null
      }

      if (moved.newIndex > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        previousCardId = siblings[moved.newIndex - 1].id
      }

      // @todo: Patch new order by using api
      /*this.$inertia.patch(moved.element.id, {
                id: moved.element.id,
                previousId: previousCardId,
            })*/
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleCreateCardButtonClick(parentId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const uuid = uuidv4()

      // @todo: Post new card by using api
      /* this.$inertia.post(this.$route('card', { card_slug: uuid }), {
                parentId,
            })*/
    },
    handleCardOpen(id) {
      if (id) {
        // @todo: Get card data and change route by using api and router
        /*this.$inertia.visit(this.$route('card', { card_slug: id }), {
                    method: 'get',
                })*/
      }
    },
  },
})
</script>

<style scoped></style>
