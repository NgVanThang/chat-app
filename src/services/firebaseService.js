import { db, addDoc, collection, serverTimestamp } from '~/config/firebase';

export const addDocument = async (nameConllection, data) => {
  try {
    const docRef = await addDoc(collection(db, nameConllection), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
