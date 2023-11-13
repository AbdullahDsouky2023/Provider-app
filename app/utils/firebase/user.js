import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";


// Update the user's profile picture URL
export const updateuserData = async (uid, info) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    info
  });
};

export const getUserInformation = async (phoneNumber) => {
  const userRef = doc(db, 'users', phoneNumber);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    // User document exists, and you can access its data
    const userData = userDoc.data();
    return userData;
  } else {
    // User document doesn't exist
    return null;
  }
};

