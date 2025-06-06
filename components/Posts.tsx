import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from "@clerk/clerk-expo"
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from "../assets/styles/feed.styles"
import CommentsModal from './CommentsModal'
import { formatDistanceToNow } from './Time'

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
  const [isBookmarked,setIsBookmarked] = useState(post.isBookmarked)
  const [showComments,setShowComments] = useState(false)


  const toggleLike = useMutation(api.posts.toggleLike)
  const toggleBookmark = useMutation(api.bookmark.toggleBookmark)
  const deletePost = useMutation(api.posts.deletePost)
  
  const handleLiked = async()=>{
    try {
      const newIsLiked = await toggleLike({
        postId:post._id
      })
      setIsLiked(newIsLiked)
    } catch (error) {
      console.log("Error toggling like:",error)
    }
  }

  const handleBookmarks = async()=>{
    const newIsBookmarked = await toggleBookmark({postId:post._id})
    setIsBookmarked(newIsBookmarked)
  }

  const {user} = useUser()
  // console.log("User",user)
  const currentUser = useQuery(api.users.getUserByClerkId,user ? {clerkId:user?.id}: "skip")

  const handleDelete = async()=>{
    try {
      await deletePost({postId:post._id})
    } catch (error) {
      console.error("Error deleting post:",error)
    }
  }


  return (
    <View style={styles.post}>
     {/* Post Header */}
     <View style={styles.postHeader}>
      <Link href={currentUser?._id === post.author._id ? "/(tabs)/profile" : `/user/${post.author._id}`} asChild>
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
     {post.author._id !== currentUser?._id ? (
         <TouchableOpacity>
        <Ionicons name='ellipsis-horizontal' size={20} color={COLORS.white}/>
      </TouchableOpacity>
     ):(
       <TouchableOpacity onPress={handleDelete}>
      <Ionicons name='trash-outline' size={20} color={COLORS.primary}/>
      </TouchableOpacity>)
     }
       
     </View>
     {/* Image */}
     <Image source={post.imageUrl} style={styles.postImage} contentFit='cover' transition={200} cachePolicy="memory-disk"/>

     {/* Post Actions */}
     <View style={styles.postActions}>
      <View style={styles.postActionsLeft}>
        <TouchableOpacity onPress={handleLiked}>
          <Ionicons name={isLiked?'heart':'heart-outline'} size={24} color={isLiked? COLORS.primary : COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShowComments(true)}>
           <Ionicons name='chatbubble-outline' size={24} color={COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookmarks}>
           <Ionicons name={isBookmarked ?'bookmark':'bookmark-outline'} size={24} color={isBookmarked? COLORS.primary: COLORS.white}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Ionicons name='share-outline' size={24} color={COLORS.white}/>
      </TouchableOpacity>
     </View>

     {/* Post Info */}
     <View style={styles.postInfo}>
      <Text style={styles.likesText}>
        {post.likes > 0 ?`${post.likes.toLocaleString()} likes`:"Be first to like"}
      </Text>
      {
        post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )
      }
      {post.comments >0 && <TouchableOpacity onPress={()=>setShowComments(true)}>
        <Text style={styles.commentText}>
         View all {post.comments} comments
        </Text>
      </TouchableOpacity>}

      <Text style={styles.timeAgo
      }>{formatDistanceToNow(post._creationTime,{addSuffix:true})}</Text>
     </View>
     <CommentsModal 
     postId={post._id} 
     visible={showComments}
     onClose={()=>setShowComments(false)}
      />
    </View>
  )
}

export default Posts
