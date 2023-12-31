import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User, UserCreate } from "../types";
import { getAccountByUid } from "./account";
import { auth, db } from "./config";

export const addUserToDB = async (createUser: UserCreate) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(
      auth,
      createUser.email
    );

    if (signInMethods.length > 0) {
      throw new Error("This email address is already registered.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      createUser.email,
      createUser.password
    );
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email ?? null,
    } satisfies User;
  } catch (error: any) {
    throw error;
  }
};

export const signInWithAPI = async (createUser: UserCreate) => {
  console.log("create use: ", createUser);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      createUser.email,
      createUser.password
    );
    // console.log(userCredential);
    return {
      uid: userCredential.user.uid,
      email: createUser.email,
    } as User;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserFromDb = async (user: UserCreate) => {
  try {
    const auth = getAuth();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await deleteUserRelatedFromDB(userCredential.user.uid);

    await auth.currentUser?.delete();

    return true;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const deleteUserRelatedFromDB = async (userId: string) => {
  try {
    //hämta accountet det gäller
    const account = await getAccountByUid(userId);

    if (account) {
      //radera alla testertoapps som denna testern är i
      const testerToAppQuery = query(
        collection(db, "testerToApps"),
        where("accountId", "==", account.id)
      );
      const testerToAppSnapshot = await getDocs(testerToAppQuery);

      testerToAppSnapshot.forEach(async (testerToAppDoc) => {
        await deleteDoc(testerToAppDoc.ref);
      });

      //radera alla appar som den har
      const appQuery = query(
        collection(db, "apps"),
        where("accountId", "==", account.id)
      );
      const appSnapshot = await getDocs(appQuery);
      appSnapshot.forEach(async (appDoc) => {
        console.log("RADERAR: ", appDoc);
        await deleteDoc(appDoc.ref);
      });

      //radera accountet som den har
      const accountDocRef = doc(db, "accounts", account.id);
      await deleteDoc(accountDocRef);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const handleForgotPasswordFirestore = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

export const getUserByUserId = async (userId: string) => {
  try {
    const userCollectionRef = collection(db, "users");
    const userQuery = query(userCollectionRef, where("id", "==", userId));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      console.error("User not found with ID:", userId);
      return null;
    }

    const userData = querySnapshot.docs[0].data() as User;
    return userData;
  } catch (error) {
    throw error;
  }
};
