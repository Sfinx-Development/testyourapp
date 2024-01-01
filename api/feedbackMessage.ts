import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { App, FeedbackMessage, TesterToApp } from "../types";
import { db } from "./config";

export const addFeedbackMessageToDb = async (feedback: FeedbackMessage) => {
  const feedbackCollectionRef = collection(db, "feedbackMessages");
  try {
    const docRef = await addDoc(feedbackCollectionRef, {});

    feedback.id = docRef.id;

    await updateDoc(docRef, feedback as Partial<FeedbackMessage>);

    const feedbackDoc = await getDoc(docRef);
    if (feedbackDoc.exists()) {
      const feedbackData = feedbackDoc.data();
      return feedbackData as FeedbackMessage;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getFeedbackMessagesByDeveloperId = async (accountId: string) => {
  const feedbackCollectionRef = collection(db, "feedbackMessages");

  const queryFeedbackByDeveloperId = query(
    feedbackCollectionRef,
    where("developerId", "==", accountId)
  );

  try {
    const querySnapshot = await getDocs(queryFeedbackByDeveloperId);

    const feedbackMessages: FeedbackMessage[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const feedbackData = doc.data();
        feedbackMessages.push(feedbackData as FeedbackMessage);
      }
    });

    return feedbackMessages;
  } catch (error) {
    throw error;
  }
};

export const deleteFeedbackMessageFromDb = async (
  feedbackMessageId: string
) => {
  const feedbackDocRef = collection(db, "feedbackMessages");

  const q = query(feedbackDocRef, where("id", "==", feedbackMessageId));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await deleteDoc(doc.ref);
      return feedbackMessageId;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
