import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const packagesCol = collection(db, "packages");

// Read
export const getPackages = async () => {
  const snapshot = await getDocs(packagesCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
