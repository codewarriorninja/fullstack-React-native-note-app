import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator, Alert } from 'react-native'
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

    useEffect(() => {
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

   const addNote = async() => {
    if(newNote.trim() === '') return;
     const response = await noteService.addNotes(newNote);
     if(response.error){
      setError(response.error);
      return;
     }
    setNotes([...notes, response.data]);
    setNewNote('');
    setModalVisible(false);
   }

   //delete note
   const deleteNote = async(id) =>{
    Alert.alert('Delete Note', 'Are you sure you want to delete this note',[
      {
        text:'Cancel',
        style:'cancel'
      },
      {
        text:'Delete',
        style:'destructive',
        onPress: async() => {
          const response = await noteService.deleteNote(id);
          if(response.error){
            Alert.alert('Error', response.error);
          }else{
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
   };

   //Edit Note
   const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert('Error', 'Note text cannot be empty');
      return;
    }

    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' style={styles.activityIndicator} />
      ) : (
        <>
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
        <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
        </>
      )}
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
  errorText:{
    color:'red',
    marginBottom:15,
    fontSize:16,
    textAlign:'center'
  },
  activityIndicator:{
    flex:1,
    alignContent:'center',
    justifyContent:'center'
  }
})

export default NotePage