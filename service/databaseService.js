import { database } from "./appwrite";

const databaseService = {
    //List Documents
   async listDocuments(dbId, colId){
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
        console.error('error fetching document', error);
        return {error: error.message};
    }
   },
   //Create Document
   async createDocument(dbId, colId, data, id = null){
    try {
       return await database.createDocument(dbId, colId, id || undefined, data) 
    } catch (error) {
        console.error('error creating document', error);
        return {error: error.message}; 
    };
   },

   //Delete Document
   async deleteDocument(dbId, colId, id){
    try {
       await database.deleteDocument(dbId, colId, id);
       return {success: true} 
    } catch (error) {
     console.log('Error deleting document', error.message);
     return {error: error.message}
    }
   },
   //update Document
   async updateDocument(dbId, colId, id, data){
    try {
     return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
     console.error('Error updating document', error.message);
     return {error: error.message};
    }
   }
};

export default databaseService