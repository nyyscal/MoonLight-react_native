import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '@/assets/styles/feed.styles'
import React from 'react'
import { Image } from 'expo-image'

type Story ={
  id:string,
  username:string,
  avatar:string,
  hasStory:boolean
}

const Story = ({story}:{story:Story}) => {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{uri: story.avatar}} style={styles.storyAvatar}/>
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  )
}

export default Story

