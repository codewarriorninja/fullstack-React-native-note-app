import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'

const NoteItem = ({note, onDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);

  // const handleSave = () =>{
  //   if(editedText.trim() === '') return;
    
  // }
  return (
     <View style={styles.noteItems}>
     <Text style={styles.noteText}>{note.text}</Text>
     <TouchableOpacity onPress={() => onDelete(note.$id)}>
       <Text style={styles.delete}>❌</Text>
     </TouchableOpacity>
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
      delete:{
        fontSize:18,
        color:'red'
      }
})

export default NoteItem