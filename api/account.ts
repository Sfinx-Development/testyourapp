import "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Account } from "../types";
import { db } from "./config";

export const addAccountToDB = async (account: Account) => {
  const accountCollectionRef = collection(db, "accounts");

  try {
    const docRef = await addDoc(accountCollectionRef, {});

    account.id = docRef.id;

    await updateDoc(docRef, account as Partial<Account>);

    const accountDoc = await getDoc(docRef);
    if (accountDoc.exists()) {
      const accountData = accountDoc.data();
      return accountData as Account;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getAccountByUid = async (uid: string) => {
  try {
    console.log("UID: ", uid);
    const accountCollectionRef = collection(db, "accounts");
    console.log("coll: ", accountCollectionRef);

    const q = query(accountCollectionRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    const accountData = querySnapshot.docs[0].data() as Account;

    console.log("konto som returneras av uid: ", accountData);
    if (accountData) {
      return accountData;
    }
    return null;
  } catch (error) {
    console.log("ERROR:", error);
    throw error;
  }
};

export const editAccountToDB = async (account: Account) => {
  const accountCollectionRef = collection(db, "accounts");

  try {
    const accountRef = doc(accountCollectionRef, account.id);

    const updatedAccountData = {
      id: account.id,
      username: account.username,
      uid: account.uid,
      playStoreMail: account.playStoreMail,
      appStoreMail: account.appStoreMail,
    };

    await updateDoc(accountRef, updatedAccountData);

    return account;
  } catch (error) {
    throw error;
  }
};
// export const deactivateAccountInDB = async (profileId: string) => {
//   const profileDocRef = doc(db, "profiles", profileId);

//   try {
//     await updateDoc(profileDocRef, {
//       isActive: false,
//     });

//     return { success: true };
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return { success: false, error: error.message };
//     } else {
//       return { success: false, error: "Unknown error" };
//     }
//   }
// };
