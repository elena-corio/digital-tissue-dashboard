import { ref, computed } from 'vue'
import  Clerk  from '@clerk/clerk-js'
import { clerkPubKey } from '../config/clerk.js'

let clerkInstance = null
let clerkInitPromise = null
const isLoaded = ref(false)
const user = ref(null)
const session = ref(null)

const ensureClerk = async () => {
  if (clerkInitPromise) return clerkInitPromise

  clerkInitPromise = (async () => {
    if (!clerkPubKey) {
      throw new Error('Missing Clerk publishable key')
    }

    clerkInstance = new Clerk(clerkPubKey)
    await clerkInstance.load()

    isLoaded.value = true
    user.value = clerkInstance.user
    session.value = clerkInstance.session

    clerkInstance.addListener((resources) => {
      user.value = resources.user
      session.value = resources.session
    })

    return clerkInstance
  })()

  return clerkInitPromise
}

export function useClerk() {
  const initClerk = async () => {
    return ensureClerk()
  }

  const isSignedIn = computed(() => {
    return !!session.value
  })

  const signOut = async (options = {}) => {
    if (clerkInstance) {
      await clerkInstance.signOut(options)
    }
  }

  const getSessionToken = async (template = null) => {
    if (!clerkInstance) {
      await ensureClerk()
    }

    if (!clerkInstance || !clerkInstance.session) {
      return null
    }

    if (template) {
      return await clerkInstance.session.getToken({ template })
    }

    return await clerkInstance.session.getToken()
  }

  return {
    clerk: computed(() => clerkInstance),
    initClerk,
    isLoaded,
    isSignedIn,
    user,
    session,
    signOut,
    getSessionToken
  }
}
