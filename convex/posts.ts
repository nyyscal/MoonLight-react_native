import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUser } from "./users";

export const generateUploadUrl = mutation(async(ctx)=>{
  const identify = await ctx.auth.getUserIdentity()
  if(!identify) throw new Error("Unauthorized")
    return await ctx.storage.generateUploadUrl()
})

export const createPost = mutation({
  args:{
    caption:v.optional(v.string()),
    storageId: v.id("_storage")
  },
  handler: async(ctx,args)=>{
    const currentUser = await getAuthUser(ctx)

        const imageUrl = await ctx.storage.getUrl(args.storageId)
        if(!imageUrl) throw new Error("Image not found!")

        //createPost
        const postId = await ctx.db.insert("posts",{
          userId: currentUser._id,
          imageUrl,
          storageId:args.storageId,
          caption:args.caption,
          likes:0,
          comments:0,
        })

        //increment the number of post of user
        await ctx.db.patch(currentUser._id,{
          posts:currentUser.posts +1
        })

        return postId

  }
})


export const getFeedPost = query({
  handler: async(ctx) =>{
    const currentUser = await getAuthUser(ctx)

    const posts = await ctx.db.query("posts").order("desc").collect()

    if(posts.length === 0 ) return []

    //enhance post with user data and interaction status

    const postsWithInfo = await Promise.all(
      posts.map(async(post)=>{
          const postAuthor = await ctx.db.get(post.userId)

          const like =await ctx.db.query("likes").withIndex("by_user_and_post",(q)=>q.eq("userId",currentUser._id).eq("postId",post._id)).first()

          const bookmark =await ctx.db.query("bookmarks").withIndex("by_user_and_post",(q)=>q.eq("userId",currentUser._id).eq("postId",post._id)).first()

          return {
            ...post,
            author:{
              _id:postAuthor?._id,
              username:postAuthor?.username,
              image:postAuthor?.image
            },
            isLiked:!!like,
            isBookmarked:!!bookmark
          }
      })
    )
    return postsWithInfo
      
  }
})