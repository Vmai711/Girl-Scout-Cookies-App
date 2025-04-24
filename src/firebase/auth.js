import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email, password, role, name, phone = '') => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userRoles = Array.isArray(role) ? role : [role];

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    name,
    phone,
    role: userRoles,
    currentRole: userRoles[0],
    createdAt: new Date()
  });

  return user;
};


export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const userRoles = ["parent-scout"];
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        role: userRoles,
        currentRole: userRoles[0],
        createdAt: new Date(),
      });
    }

    return user; 
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error; 
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
