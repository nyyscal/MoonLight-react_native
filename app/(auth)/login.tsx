import { styles } from '@/assets/styles/auth.styles'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Login() {
  
  const {startSSOFlow} = useSSO()
  const router = useRouter()

  const handleGoogleSignin = async()=>{
    try {
      const{ createdSessionId,setActive}= await startSSOFlow({strategy:"oauth_google"})

      if(setActive && createdSessionId){
      setActive({session:createdSessionId})
      router.replace("/(tabs)")
      }
    } catch (error) {
      console.log("OAuth error:",error)
    }
  }
  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name='leaf' size={32} color={COLORS.primary}/>
        </View>
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagline}>Don&apos;t miss any important update!</Text>
        </View>
        <View style={styles.illustrationContainer}>
          <Image source={require("../../assets/images/banner.png")} style={styles.illustration} resizeMode='cover'/>
      </View>
      {/* Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity style={styles.googleButton}  onPress={handleGoogleSignin}  activeOpacity={0.9}>
          <View style={styles.googleIconContainer}>
            <Ionicons name='logo-google' size={20} color={COLORS.surface} />
          </View>
          <Text>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
      </View>
    </View>
  )
}