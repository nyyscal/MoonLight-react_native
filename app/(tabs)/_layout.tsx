import { COLORS } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarActiveTintColor:COLORS.primary,
      tabBarInactiveTintColor:COLORS.grey,
      tabBarStyle:{
        backgroundColor:"black",
        borderTopWidth:0,
        position:"absolute",
        elevation:0,
        height:60,
        paddingTop:10,
        paddingBottom:8,
      }
    }}
    >
      <Tabs.Screen name="index" 
      options={{
        tabBarIcon: ({size,color})=><Ionicons name="home" size={size} color={color}/>
      }}
      />
      <Tabs.Screen name="bookmarks" 
      options={{
        tabBarIcon: ({size,color})=><Ionicons name="bookmark" size={size} color={color}/>
      }}
      />
      <Tabs.Screen name="create" 
      options={{
        tabBarIcon: ({size,color})=><Ionicons name="add-circle" size={size} color={color}/>
      }}
      />
      <Tabs.Screen name="notifications" 
      options={{
        tabBarIcon: ({size,color})=><Ionicons name="notifications" size={size} color={color}/>
      }}
      />
      <Tabs.Screen name="profile" 
      options={{
        tabBarIcon: ({size,color})=><Ionicons name="person-circle" size={size} color={color}/>
      }}
      />
    </Tabs>
  )
}

export default TabLayout