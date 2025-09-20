import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const articlesCol = collection(db, "articles");

// Create
export const addArticle = async (data: any) => {
  return await addDoc(articlesCol, data);
};

// Read
export const getArticles = async () => {
  const snapshot = await getDocs(articlesCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateArticle = async (id: string, data: any) => {
    const articleDoc = doc(db, 'articles', id)
    return await updateDoc(articleDoc, data)
}

// Delete
export const deleteArticle = async (id: string) => {
    const articleDoc = doc(db, 'articles', id)
    return await deleteDoc(articleDoc)
}