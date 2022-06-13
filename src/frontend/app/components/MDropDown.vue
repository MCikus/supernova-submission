<template>
  <Menu as="div" class="relative inline-block text-left" :class="[$options.name]">
    <div>
      <MenuButton
        class="flex items-center rounded-sm p-1 text-primary hover:text-primary-focus focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2"
        @click="handleMenuButtonClick($event)"
      >
        <span class="sr-only">Open options</span>
        <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="item in menuItems" :key="item.name" v-slot="{ active }">
            <AButton
              is-unstyled
              :is-disabled="item.disabled"
              class="block w-full px-4 py-2 text-left text-sm"
              :class="[
                active ? 'bg-gray-100 text-base-content' : 'text-base-700',
                item.disabled ? 'pointer-events-none text-gray-400' : '',
              ]"
              @a-button-clicked="item.eventHandler"
            >
              {{ item.name }}
            </AButton>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon } from '@heroicons/vue/solid'
import AButton from './AButton.vue'

export default {
  name: 'MDropDown',
  components: {
    AButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({
        componentData: {
          card: null,
          isChild: null,
        },
      }),
    },
  },
  emits: ['m-dropdown-clicked'],
  data() {
    return {
      menuItems: [
        {
          name: 'Show children',
          eventName: 'open-card',
          disabled: this.componentData.card?.children?.length === 0,
          eventHandler: () => this.handleCardOpen(),
        },
        {
          name: 'Delete card',
          eventName: 'remove-card',
          disabled: false,
          eventHandler: () => this.handleRemoveCard(),
        },
      ],
    }
  },
  methods: {
    handleMenuButtonClick(event) {
      this.$emit('m-dropdown-clicked', {
        componentName: this.$options.name,
        event: event,
      })
    },
    handleCardOpen() {
      const nextCardId = this.componentData.isChild
        ? this.componentData.card.id
        : this.componentData.card?.children?.[0]?.id

      if (nextCardId) {
        // @todo: Get card data and change route by using api and router
        /*this.$inertia.visit(this.$route('card', { card_slug: nextCardId }), {
                    method: 'get',
                })*/
      }
    },
    handleRemoveCard() {
      // @todo: Delete card by using api
      /* this.$inertia.delete(
                this.$route('card', { card_slug: this.componentData.card.id })
            )*/
    },
  },
}
</script>
