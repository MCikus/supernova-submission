<template>
  <Menu as="div" class="relative inline-block text-left" :class="[$options.name]">
    <div>
      <MenuButton
        class="m-1 flex items-center rounded-sm p-0 text-base-400 hover:text-base-400 focus:outline-none focus:ring-0"
      >
        <span class="sr-only">Open options</span>
        <DotsVerticalIcon class="-m-1 h-6 w-6" aria-hidden="true" />
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
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="definition in blockDefinitions"
            :key="definition.typeId"
            v-slot="{ active }"
          >
            <AButton
              is-unstyled
              class="block w-full px-4 py-2 text-left text-sm"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-base-700']"
              :data-test="definition.typeId"
              @a-button-clicked="updateBlock(definition.typeId)"
            >
              {{ definition.title }}
            </AButton>
          </MenuItem>
          <MenuItem
            v-for="menuItem in customBlockMenuItems"
            :key="menuItem.id"
            v-slot="{ active }"
          >
            <AButton
              is-unstyled
              class="block w-full px-4 py-2 text-left text-sm"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-base-700']"
              :data-test="menuItem.id"
              @a-button-clicked="menuItem.callback()"
            >
              {{ menuItem.title }}
            </AButton>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <AButton
              is-unstyled
              class="block w-full px-4 py-2 text-left text-sm"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-base-700']"
              data-test="delete-button"
              @a-button-clicked="deleteBlock"
            >
              Delete
            </AButton>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { defineComponent } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon } from '@heroicons/vue/solid'
import AButton from '@/app/components/AButton.vue'
import { useBlocksStore } from '@/domain/blocks/base/services/stores/useBlocksStore.js'
import { useBlockDefinitionsStore } from '@/domain/blocks/base/services/stores/useBlockDefinitionsStore.js'
import { storeToRefs } from 'pinia'

export const componentName = 'BlockMenu'

export default defineComponent({
  name: componentName,
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    AButton,
  },
  props: {
    block: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    customBlockMenuItems: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  setup(props) {
    const blocksStore = useBlocksStore()
    const { blockDefinitions } = storeToRefs(useBlockDefinitionsStore())

    return {
      componentName,
      blockDefinitions,
      deleteBlock: () => blocksStore.removeBlockFromList(props.block.uuid),
      updateBlock: (typeId) =>
        blocksStore.updateBlock(props.block.uuid, {
          ...props.block,
          typeId: typeId,
          definition: blockDefinitions.value.find(
            (definition) => definition.typeId === typeId,
          ),
        }),
    }
  },
})
</script>

<style scoped></style>
