"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  auth.protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
};

export const deleteDocument = async (roomId: string) => {
  auth.protect();

  try {
    // delete the document reference itself
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    // delete the room reference in the user's collection for every users in the room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // delete the room in liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const inviteUserToDocument = async (roomId: string, email: string) => {
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const removeUserFromDocument = async (roomId: string, email: string) => {
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
