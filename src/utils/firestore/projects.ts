import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const projectsCol = collection(db, "projects");

// Create
export const addProject = async (data: any) => {
  return await addDoc(projectsCol, data);
};

// Read
export const getProjects = async () => {
  const snapshot = await getDocs(projectsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateProject = async (id: string, data: any) => {
  const projectDoc = doc(db, "projects", id);
  return await updateDoc(projectDoc, data);
};

// Delete
export const deleteProject = async (id: string) => {
  const projectDoc = doc(db, "projects", id);
  return await deleteDoc(projectDoc);
};
