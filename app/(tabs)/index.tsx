import { styles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {signOut} = useAuth()
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Homepage</Text>
      <TouchableOpacity onPress={()=>signOut( )}>
        <Text style={{color:COLORS.primary}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
