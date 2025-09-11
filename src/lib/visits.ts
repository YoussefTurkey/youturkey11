// lib/visits.ts
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function incrementVisit() {
  const docRef = doc(db, "analytics", "site_visits");
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    await updateDoc(docRef, { count: increment(1) });
  } else {
    await setDoc(docRef, { count: 1 });
  }
}

export async function getVisitsCount() {
  const docRef = doc(db, "analytics", "site_visits");
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data().count as number;
  }
  return 0;
}
