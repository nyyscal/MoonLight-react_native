
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const[fontsLoaded] =useFonts({
    // "JetBrains":require("../assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrains":require("../assets/fonts/JetBrainsMono-SemiBold.ttf")
  })

  const onLayoutRootView = useCallback(async()=>{
      if(fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded])

  return (
      <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1, backgroundColor:"#000"}} onLayout={onLayoutRootView}>
        <InitialLayout/>
        </SafeAreaView>
      </SafeAreaProvider>
      </ClerkAndConvexProvider>

)
}
