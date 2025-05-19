import { styles } from '@/assets/styles/profile.styles'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const UserProfileScreen = () => {
  const router = useRouter()
  const {id} = useLocalSearchParams()
  const profile = useQuery(api.users.getUserProfile,{id:id as Id<"users">})
  const posts = useQuery(api.posts.getPostByUser,{userId:id as Id<"users">})

  const isFollowing = useQuery(api.users.isFollowing,{followingId: id as Id<"users">})

  const toggleFollow = useMutation(api.users.toggleFollow)

  const handleBack = ()=>{
    if(router.canGoBack()) router.back()
      else router.replace("/(tabs)")
  }

  if(profile === undefined || posts=== undefined || isFollowing===undefined) return <Loader/>
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profile.username}</Text>
        <View style={{width:24}}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.profileInfo}>
                {/* Avatar and stats */}
                <View style={styles.avatarAndStats}>
                  <View style={styles.avatarContainer}>
                    <Image source={profile.image} style={styles.avatar} contentFit='cover' transition={200} cachePolicy="memory-disk"/>
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{profile.posts}</Text>
                      <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{profile.followers}</Text>
                      <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{profile.following}</Text>
                      <Text style={styles.statLabel}>Following</Text>
                    </View>
                  </View>
                </View>
                  <Text style={styles.name}>{profile.fullname}</Text>
                  {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
      
              <Pressable style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={()=>toggleFollow({followingId:id as Id<"users">})}
              >
                <Text style={[styles.followButtonText, isFollowing && styles.followButtonText]}>{isFollowing? "Following":"Follow"}</Text>
              </Pressable>
                </View>
                <View style={styles.postsGrid}>
                   {posts.length === 0 && <NoPostFound/>}
                  
                          <FlatList data={posts} 
                          numColumns={3} scrollEnabled={false}
                           renderItem={({item})=>(
                            <TouchableOpacity style={styles.gridItem}>
                              <Image source={item.imageUrl} style={styles.gridImage} contentFit='cover' transition={200}/>
                            </TouchableOpacity>
                           )}
                           keyExtractor={(item)=>item._id}
                           />
                </View>
            </ScrollView>
    </View>
  )
}

export default UserProfileScreen

function NoPostFound(){
  return(
    <View style={{
      height:"100%",
      backgroundColor:COLORS.background,
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Ionicons name='image-outline' size={48} color={COLORS.primary}/>
      <Text style={{fontSize:20, color:COLORS.white}}>No posts yet</Text>
    </View>
  )
}