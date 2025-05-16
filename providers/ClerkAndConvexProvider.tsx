import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import {ConvexProviderWithClerk} from "convex/react-clerk"
import {ConvexReactClient} from "convex/react"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  if(!publishableKey){
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    )
  }

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!,{
    unsavedChangesWarning:false,
  })

const ClerkAndConvexProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>

    </ClerkProvider>
  )
}

export default ClerkAndConvexProvider