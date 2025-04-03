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
    }
   }

};

export default databaseService