import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const NoteItem = ({note}) => {
  return (
     <View style={styles.noteItems}>
     <Text style={styles.noteText}>{note.text}</Text>
     </View>
  )
}

const styles = StyleSheet.create({
    noteItems:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f5f5f5',
        padding:15,
        borderRadius:5,
        marginVertical:5,
      },
      noteText:{
        fontSize:18
      },
})

export default NoteItem