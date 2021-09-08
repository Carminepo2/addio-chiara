//@ts-nocheck

import { nanoid } from "nanoid";

export async function getMessaggi(db) {
  return db.collection("messaggi").find().toArray();
}

export async function insertMessaggio(db, { nome, messaggio }) {
  return db.collection("messaggi").insertOne({
    _id: nanoid(12),
    nome,
    messaggio,
    createdAt: new Date(),
  });
}
