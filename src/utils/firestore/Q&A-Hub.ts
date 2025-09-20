import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const qaCol = collection(db, "Q&A-Hub");

// Create
export const addQA = async (data: any) => {
  return await addDoc(qaCol, data);
};

// Read
export const getQAs = async () => {
  const snapshot = await getDocs(qaCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateQA = async (id: string, data: any) => {
  const qaDoc = doc(db, "Q&A-Hub", id);
  return await updateDoc(qaDoc, data);
};

// Delete
export const deleteQA = async (id: string) => {
  const qaDoc = doc(db, "Q&A-Hub", id);
  return await deleteDoc(qaDoc);
};
