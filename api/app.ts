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
import { App, TesterToApp } from "../types";
import { db } from "./config";

export const addAppToDb = async (app: App) => {
  const appCollectionRef = collection(db, "apps");

  try {
    const docRef = await addDoc(appCollectionRef, {});

    app.id = docRef.id;

    await updateDoc(docRef, app as Partial<App>);

    const appDoc = await getDoc(docRef);
    if (appDoc.exists()) {
      const appData = appDoc.data();
      return appData as App;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const confirmTesterToAppDb = async (testerToAppId: string) => {
  const testerToAppDocRef = doc(db, "testerToApps", testerToAppId);

  try {
    await updateDoc(testerToAppDocRef, {
      confirmed: true,
    });

    const appDoc = await getDoc(testerToAppDocRef);
    if (appDoc.exists()) {
      const appData = appDoc.data();
      return appData as TesterToApp;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllAppsFromDb = async () => {
  const appCollectionRef = collection(db, "apps");

  try {
    const querySnapshot = await getDocs(appCollectionRef);

    const apps: App[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const appData = doc.data();
        apps.push(appData as App);
      }
    });
    return apps;
  } catch (error) {
    throw error;
  }
};

export const getAppsImTestingFromDb = async (accountId: string) => {
  const testerToAppsCollectionRef = collection(db, "testerToApps");

  try {
    const q = query(
      testerToAppsCollectionRef,
      where("accountId", "==", accountId),
      where("confirmed", "==", true)
    );

    const querySnapshot = await getDocs(q);

    const apps: App[] = [];

    for (const doc of querySnapshot.docs) {
      const testerToAppData = doc.data() as TesterToApp;

      const app = await getAppByIdFromDb(testerToAppData.appId);

      if (app) {
        apps.push(app);
      }
    }

    return apps;
  } catch (error) {
    throw error;
  }
};

export const getMyAppsFromDb = async (accountId: string) => {
  const appsCollectionRef = collection(db, "apps");

  try {
    const q = query(appsCollectionRef, where("accountId", "==", accountId));

    const querySnapshot = await getDocs(q);

    const apps: App[] = [];

    for (const doc of querySnapshot.docs) {
      const myApp = doc.data() as App;
      if (myApp) {
        apps.push(myApp);
      }
    }
    return apps;
  } catch (error) {
    throw error;
  }
};

export const getUnconfirmedTesters = async (app: App) => {
  const testersInfo: {
    testerToAppId: string;
    appId: string;
    appName: string;
    testerId: string;
    username: string;
    playStoreMail: string;
    appStoreMail: string;
  }[] = [];

  const testerToAppsCollectionRef = collection(db, "testerToApps");

  try {
    const q = query(
      testerToAppsCollectionRef,
      where("appId", "==", app.id),
      where("confirmed", "==", false)
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const testerToAppData = doc.data() as TesterToApp;

      const testerInfo = await getTesterInfo(testerToAppData, app);
      if (testerInfo) {
        testersInfo.push(testerInfo);
      }
    }
    return testersInfo;
  } catch (error) {
    throw error;
  }
};

export const getAppByIdFromDb = async (appId: string) => {
  const appDocRef = doc(collection(db, "apps"), appId);

  try {
    const appDoc = await getDoc(appDocRef);

    if (appDoc.exists()) {
      const appData = appDoc.data();
      return appData as App;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getTesterInfo = async (testerToAppData: TesterToApp, app: App) => {
  let testersProperties;

  const accountDocRef = doc(
    collection(db, "accounts"),
    testerToAppData.accountId
  );

  try {
    const accountDoc = await getDoc(accountDocRef);

    if (accountDoc.exists()) {
      const accountData = accountDoc.data();
      testersProperties = {
        testerToAppId: testerToAppData.id,
        appId: app.id,
        appName: app.name,
        testerId: accountData.id,
        username: accountData.username,
        playStoreMail: accountData.playStoreMail,
        appStoreMail: accountData.appStoreMail,
      };
      return testersProperties;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const addTesterToAppToDb = async (testerToApp: TesterToApp) => {
  const appCollectionRef = collection(db, "testerToApps");

  try {
    const docRef = await addDoc(appCollectionRef, {});

    testerToApp.id = docRef.id;

    await updateDoc(docRef, testerToApp as Partial<TesterToApp>);

    const testerToAppDoc = await getDoc(docRef);
    if (testerToAppDoc.exists()) {
      const testerToAppData = testerToAppDoc.data();
      return testerToAppData as TesterToApp;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// export const getAccountByUid = async (uid: string) => {
//   try {
//     console.log("UID: ", uid);
//     const accountCollectionRef = collection(db, "accounts");
//     console.log("coll: ", accountCollectionRef);

//     const q = query(accountCollectionRef, where("uid", "==", uid));

//     const querySnapshot = await getDocs(q);

//     const accountData = querySnapshot.docs[0].data() as Account;

//     console.log("konto som returneras av uid: ", accountData);
//     if (accountData) {
//       return accountData;
//     }
//     return null;
//   } catch (error) {
//     console.log("ERROR:", error);
//     throw error;
//   }
// };

// export const editAccountToDB = async (account: Account) => {
//   const accountCollectionRef = collection(db, "accounts");

//   try {
//     const accountRef = doc(accountCollectionRef, account.id);

//     const updatedAccountData = {
//       id: account.id,
//       username: account.username,
//       uid: account.uid,
//       playStoreMail: account.playStoreMail,
//       appStoreMail: account.appStoreMail,
//     };

//     await updateDoc(accountRef, updatedAccountData);

//     return account;
//   } catch (error) {
//     throw error;
//   }
// };
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
