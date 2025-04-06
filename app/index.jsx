import { Text, View, StyleSheet,Image,TouchableOpacity,ActivityIndicator } from "react-native";
import PostImage from '@/assets/images/post-it.png'
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

export default function HomePage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() =>{
    if(!loading && user){
      router.replace('/notes');
    }
  },[user,loading])

  if(loading) return <View style={styles.centeredContainer}>
    <ActivityIndicator size='large' color='#007bff' />
  </View>
  return (
    <View
      style={styles.container}
>
      <Image source={PostImage} style={styles.image} />
      <Text style={styles.title}>Welcome to note app</Text>
      <Text style={styles.subtitle}>Capture your toughts anytime,anywhere</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/notes')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
// https://github.com/bradtraversy/notes-app/blob/main/assets/images/post-it.png

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:20,
    backgroundColor:'#f8f9fa'
  },
  image:{
   width:100,
   height:100,
   marginBottom:20,
   borderRadius:10,
  },
  title:{
    fontSize:28,
    fontWeight:'bold',
    marginBottom:10,
    color:'#333'
  },
  subtitle:{
    fontSize:16,
    color:'#666',
    textAlign:'center',
    marginBottom:20
  },
  button:{
    backgroundColor:'#007bff',
    paddingVertical:12,
    paddingHorizontal:25,
    borderRadius:8,
    alignItems:'center'
  },
  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  enteredContainer:{
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
  }
})
