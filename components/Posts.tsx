import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from "../assets/styles/feed.styles"

type PostProps ={
  post:{
    _id:Id<"posts">;
    imageUrl:string;
    caption?:string;
    likes:number;
    comments:number;
    _creationTime:number;
    isLiked:boolean;
    isBookmarked:boolean;
    author:{
      _id:string;
      username:string;
      image:string;
    }
  }
}


const Posts = ({post}:PostProps) => {
  const [isLiked,setIsLiked] = useState(post.isLiked)
  const [likesCount,setLikesCount] = useState(post.likes)

  const toggleLike = useMutation(api.posts.toggleLike)
  
  const handleLiked = async()=>{
    try {
      const newIsLiked = await toggleLike({
        postId:post._id
      })
      setIsLiked(newIsLiked)
      setLikesCount((prev)=>(newIsLiked ? prev +1 : prev-1))
    } catch (error) {
      console.log("Error toggling like:",error)
    }
  }

  return (
    <View style={styles.post}>
     {/* Post Header */}
     <View style={styles.postHeader}>
      <Link href={"/(tabs)/notifications"}>
      <TouchableOpacity style={styles.postHeaderLeft}>
        <Image source={post.author.image}
        style={styles.postAvatar}
        contentFit='cover'
        transition={200}
        cachePolicy="memory-disk"
        />
        <Text style={styles.postUsername}>{post.author.username}</Text>
      </TouchableOpacity>
      </Link>
      {/* Shows Delete button if owner */}
      {/* <TouchableOpacity>
        <Ionicons name='ellipsis-horizontal' size={20} color={COLORS.white}/>
      </TouchableOpacity> */}
      <TouchableOpacity>
        <Ionicons name='trash-outline' size={20} color={COLORS.primary}/>
      </TouchableOpacity>
     </View>
     {/* Image */}
     <Image source={post.imageUrl} style={styles.postImage} contentFit='cover' transition={200} cachePolicy="memory-disk"/>

     {/* Post Actions */}
     <View style={styles.postActions}>
      <View style={styles.postActionsLeft}>
        <TouchableOpacity onPress={handleLiked}>
          <Ionicons name={isLiked?'heart':'heart-outline'} size={24} color={isLiked? COLORS.primary : COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity>
           <Ionicons name='chatbubble-outline' size={24} color={COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity>
           <Ionicons name='bookmark-outline' size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Ionicons name='share-outline' size={24} color={COLORS.white}/>
      </TouchableOpacity>
     </View>

     {/* Post Info */}
     <View style={styles.postInfo}>
      <Text style={styles.likesText}>
        {likesCount > 0 ?`${likesCount.toLocaleString()} likes`:"Be first to like"}
      </Text>
      {
        post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )
      }
      <TouchableOpacity>
        <Text style={styles.commentText}>View all 2 comments</Text>
      </TouchableOpacity>

      <Text style={styles.timeAgo
      }>2 hours ago</Text>
     </View>
    </View>
  )
}

export default Posts
