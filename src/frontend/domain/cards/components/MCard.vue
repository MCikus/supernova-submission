<template>
  <div class="border-box p-2">
    <div
      :id="componentData.id"
      ref="card"
      tabindex="0"
      class="flex flex-col overflow-hidden rounded-lg transition-size focus:outline-none focus:ring-4 focus:ring-opacity-30 focus:ring-offset-0"
      :class="[computedCardColor, computedCardSize]"
    >
      <div
        class="flex h-[11rem] min-h-[11rem] w-full items-start justify-start px-3 py-4 focus:outline-none"
        :class="[$options.name]"
      >
        <div class="flex h-full flex-1 flex-col px-3 py-1">
          <span class="flex text-base font-medium leading-6 text-black">
            {{ componentData.enumeration.join('.') }}
          </span>
          <div class="flex-1 overflow-hidden">
            <InlineInput
              class="text-base font-medium leading-6 text-black"
              :value="titleText"
              placeholder="Edit card title"
              @inline-input-changed="handleInlineInputChanged"
              @inline-input-is-editing="handleInlineInputIsEditing"
            />
          </div>
        </div>
        <div class="flex h-full flex-col items-center justify-between">
          <MDropDown
            :component-data="{
              card: componentData,
              isChild: isChild,
            }"
          />
          <AButton
            data-test-id="expand-button"
            class="text-primary bg-transparent p-1 hover:bg-transparent hover:text-primary-focus"
            :is-unstyled="true"
            @click="handleCardExpand"
          >
            <ArrowsExpandIcon v-if="!computedExpanded" class="h-6 w-6" />
            <XIcon v-if="computedExpanded" class="h-6 w-6" />
          </AButton>
        </div>
      </div>
      <div
        v-if="computedExpanded"
        class="h-full w-full overflow-hidden border-t-2 border-primary-focus p-3 pt-0"
      >
        <div
          class="flex h-full w-full min-w-full flex-col overflow-y-scroll xl:flex-row xl:overflow-hidden"
        >
          <div class="flex flex-grow flex-col px-3 xl:overflow-y-scroll xl:pr-4">
            <!--    @todo: make this a slot. By default it is empty.            -->
            <BlockList :card-id="componentData?.id" />
            <BlockSelector :card-id="componentData?.id" />
          </div>
          <div
            class="mt-8 flex flex-shrink-0 flex-col xl:mt-0 xl:overflow-y-scroll xl:pl-2 xl:pr-4"
          >
            <!--    @todo: make it a named slot                -->
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AButton from '../../../app/components/AButton.vue'
import BlockList from '@/domain/blocks/base/components/BlockList.vue'
import BlockSelector from '@/domain/blocks/base/components/BlockSelector.vue'
import InlineInput from './InlineInput.vue'
import MDropDown from '../../../app/components/MDropDown.vue'
import { ArrowsExpandIcon, XIcon } from '@heroicons/vue/outline'
import { mapState, mapActions } from 'pinia'
import { useCardsStore } from '@/domain/cards/services/useCardsStore.js'

export default {
  name: 'MCard',
  components: {
    AButton,
    ArrowsExpandIcon,
    XIcon,
    InlineInput,
    MDropDown,
    BlockList,
    BlockSelector,
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({
        id: null,
        title: null,
        children: null,
        cardSiblings: null,
        currentCard: null,
      }),
    },
    isChild: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['a-title-card-clicked-open', 'a-title-card-clicked-expand'],
  data() {
    return {
      titleText: this.componentData.title,
      titleIsEditing: false,
    }
  },
  computed: {
    computedCardColor() {
      if (this.isChild) {
        return 'bg-[#F3DDDD] focus:ring-[#FF1493] focus:ring-offset-primary-content'
      }
      return 'bg-primary-content focus:ring-[#FF1493] focus:ring-offset-primary'
    },
    computedCardSize() {
      if (this.computedExpanded) {
        return 'min-w-[85vw] w-[85vw] md:min-w-[70vw] md:w-[70vw] h-full'
      }
      if (this.isChild) {
        return 'min-w-full w-full h-[11rem] sm:min-w-[20rem] sm:w-[20rem]'
      }
      return 'min-w-[20rem] w-[20rem] h-[11rem]'
    },
    computedExpanded() {
      return this.expandedCardId === this.componentData.id
    },
    computedActiveState() {
      return this.componentData?.currentCard?.id === this.componentData.id
    },
    ...mapState(useCardsStore, ['expandedCardId']),
  },
  mounted() {
    if (this.computedActiveState) {
      this.$refs.card.focus()
    }
  },
  methods: {
    handleCardExpand(event) {
      this.$emit('a-title-card-clicked-expand', {
        componentName: this.$options.name,
        event: event,
      })

      if (!this.computedExpanded) {
        // @todo: Use api
        /*if (
                    !this.$route().current('card', { card_slug: this.componentData.id })
                ) {
                    this.$inertia.visit(
                        this.$route('card', { card_slug: this.componentData.id }),
                        {
                            method: 'get',
                            preserveSroll: true,
                            preserveState: true,
                        }
                    )
                }*/
        this.expandCard(this.componentData.id)
        return
      }

      if (this.computedExpanded) {
        this.collapseCard(this.componentData.id)
      }
    },
    handleInlineInputChanged({ event }) {
      this.titleText = event.target.value
      const cardIndex = this.componentData.cardSiblings.findIndex(
        (card) => card.id === this.componentData.id,
      )
      let previousCardId

      if (cardIndex === 0) {
        previousCardId = null
      }

      if (cardIndex > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        previousCardId = this.componentData.cardSiblings[cardIndex - 1].id
      }

      this.$refs.card.focus()

      // @todo: Use api
      /*this.$inertia.patch(this.componentData.id, {
                id: this.componentData.id,
                previousId: previousCardId,
                title: event.target.value,
            })*/
    },
    handleInlineInputIsEditing({ isEditing }) {
      this.titleIsEditing = isEditing
    },
    ...mapActions(useCardsStore, ['expandCard', 'collapseCard']),
  },
}
</script>

<style scoped></style>
