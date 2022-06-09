<template>
  <div v-if="!signedIn && clientReady">
    <button
      class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="signIn()"
    >
      Sign In
      <img
        alt=""
        style="width: 33px; margin-right: -1em; margin-left: 0.7em"
        :src="dfinityIconUrl"
      />
    </button>
  </div>
  <div v-else class="flex flex-row space-x-6">
    <p>
      Signed in as:
      <code>{{ principal }}</code>
    </p>
    <button
      class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="signOut()"
    >
      Sign out
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { AuthClient } from '@dfinity/auth-client'
import dfinityIconUrl from '@/app/assets/dfinity.svg'

let signedIn = ref(false)
let client
let clientReady = ref(false)
let principal = ref('')

const initAuth = async () => {
  client = await AuthClient.create()
  clientReady.value = true
  const isAuthenticated = await client.isAuthenticated()

  if (isAuthenticated) {
    const identity = client.getIdentity()
    principal.value = identity.getPrincipal().toString()
    signedIn.value = true
  }
}

export default defineComponent({
  name: 'DemoAuth',
  setup: () => {
    const signIn = async () => {
      const result: any = await new Promise((resolve, reject) => {
        client.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: () => {
            const identity = client.getIdentity()
            const principal = identity.getPrincipal().toString()
            resolve({ identity, principal })
          },
          onError: reject,
        })
      })
      principal.value = result.principal
      signedIn.value = true
    }

    const signOut = async () => {
      await client.logout()
      signedIn.value = false
      principal.value = ''
    }

    onMounted(initAuth)

    return { clientReady, principal, signedIn, signOut, signIn, dfinityIconUrl }
  },
})
</script>

<style scoped>
.auth-section {
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  position: fixed;
  top: 0;
  right: 0;
}

.auth-button {
  color: black;
  background: white;
  padding: 0 2em;
  border-radius: 60px;
  font-size: 1em;
  line-height: 40px;
  height: 33px;
  outline: 0;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
  display: flex;
  align-items: center;
}
</style>
