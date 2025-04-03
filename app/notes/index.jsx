import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import NoteList from '../../components/NoteList';
import AddNoteModal from '../../components/AddNoteModal';
import noteService from '../../service/noteService';

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
     fetchNotes();
    },[]);

    const fetchNotes = async () =>{
      setLoading(true);
      const response = await noteService.getNotes();
      if(response.error){
        setError(response.error);
        setLoading(false);
        return;
      }
      setNotes(response.data);
      setLoading(false);
      setError(null);
    }

   const addNote = () => {
    if(newNote.trim() === '') return;

    setNotes((prevNotes) => [
        ...prevNotes,
        {id: Date.now().toString(), text: newNote}
    ]);
    setNewNote('');
    setModalVisible(false);
   }

  return (
    <View style={styles.container}>
        <NoteList notes={notes}/>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+Add Note</Text>
      </TouchableOpacity>
      <AddNoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} newNote={newNote} setNewNote={setNewNote} addNote={addNote}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#fff'
  },
  addButton:{
    position:'absolute',
    left:20,
    right:20,
    bottom:20,
    backgroundColor:'#007bff',
    padding:15,
    borderRadius:8,
    alignItems:'center'
  },
  addButtonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
})

export default NotePage