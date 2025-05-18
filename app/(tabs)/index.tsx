import Loader from "@/components/Loader";
import Posts from "@/components/Posts";
import Story from "@/components/Story";
import { STORIES } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../assets/styles/feed.styles";

export default function Index() {
  const {signOut} = useAuth()
  const post = useQuery(api.posts.getFeedPost)
  if(post === undefined) return <Loader/>

  if(post.length === 0) return <NoPostsFound/>
  return (
    <View
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>moonlight</Text>
        <TouchableOpacity onPress={()=>signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </View>

      {/* Scroll View */}
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:60}}
      >
        {/* Stories */}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
        >
          {STORIES.map((story)=>(
            <Story key={story.id} story={story}/>
          ))}
        </ScrollView>
        {post.map((post)=>(
          <Posts key={post._id} post={post}/>
        ))}
      </ScrollView>
    </View>
  );
}

const NoPostsFound = () =>(
  <View style={{
    flex:1, 
    backgroundColor:COLORS.background, 
    justifyContent:"center", 
    alignItems:"center"}}>
    <Text style={{fontSize:20, color:COLORS.primary}}>No posts yet</Text>
  </View>
)
