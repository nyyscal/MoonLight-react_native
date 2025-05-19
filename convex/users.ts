import { v } from "convex/values"
import { mutation,MutationCtx,query,QueryCtx } from "./_generated/server"

export const createUser = mutation({
  args:{
    username:v.string(),
    fullname:v.string(),
    image:v.string(),
    bio:v.optional(v.string()),
    email:v.string(),
    clerkId:v.string(),
  },
  handler: async(ctx,args)=>{
   const existingUser = await ctx.db.query("users")
   .withIndex("by_clerk_id",(q)=>q.eq("clerkId",args.clerkId)).first()
   if(existingUser) return
    //create a user in db
    await ctx.db.insert("users",{
    username:args.username,
    fullname:args.fullname,
    image:args.image,
    bio:args.bio,
    email:args.email,
    clerkId:args.clerkId,
    followers:0,
    following:0,
    posts:0
    })
  }
})

export async function getAuthUser(ctx:QueryCtx | MutationCtx){
  const identify = await ctx.auth.getUserIdentity()
      if(!identify) throw new Error("Unauthorized")

      const currentUser = await ctx.db.query("users").withIndex("by_clerk_id",(q)=>q.eq("clerkId",identify.subject)).first()

      if(!currentUser) throw new Error("User not found")

        return currentUser
}

export const getUserByClerkId = query({
  args:{clerkId:v.string()},
  handler: async(ctx,args)=>{
    const user = await ctx.db.query("users")
    .withIndex("by_clerk_id",
    (q)=>q.eq("clerkId",args.clerkId))
    .unique()
    return user
  }
})