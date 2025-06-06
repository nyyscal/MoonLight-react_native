import { styles } from '@/assets/styles/notifications.styles'
import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { formatDistanceToNow } from './Time'

export default function NotificationItem({notification}:any) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/user/${notification.sender._id}`} asChild>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image source={notification.sender.image} 
          style={styles.avatar} 
          contentFit='cover' 
          transition={200}/>
          <View>
            {notification.type === "like"?(
              <Ionicons name="heart" size={14} color={COLORS.primary}/>
            ): notification.type==="follow"?(
              <Ionicons name='person-add' size={14} color="#8B5CF6"/>
            ):(
              <Ionicons name='chatbubble' size={14} color="#3B82F6"/>
            )}
          </View>
        </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link href={`/user/${notification.sender._id}`} asChild>
          <TouchableOpacity>
            <Text style={styles.username}>{notification.sender.username}</Text>
          </TouchableOpacity>
          </Link>
          <Text style={styles.action}>
            {notification.type === "follow"?"started following you"
            :notification.type ==="like"?"liked your post"
            : `commented: "${notification.comment}"`  
          }
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime,{addSuffix:true})}
          </Text>
        </View>
      </View>
      {
        notification.postId && (
          <Image source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit='cover'
          transition={200}
          />
        )
      }
    </View>
  )
}