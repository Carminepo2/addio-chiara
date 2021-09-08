//@ts-nocheck

import nc from "next-connect";
import { getMessaggi, insertMessaggio } from "../../../db/messaggio";
import all from "../../../middlewares/all";
import settings from "../../../settings/index.json";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const messaggi = await getMessaggi(req.db);
  console.log(messaggi);
  return res.json({ messaggi });
});

handler.post(async (req, res) => {
  if (!req.body.nome || !req.body.messaggio) return res.status(400).send("I campi sono vuoti.");
  if (
    req.body.nome.length > settings.MAX_CARATTERI_NOME ||
    req.body.messaggio.lenght > settings.MAX_CARATTERI_MESSAGGIO
  )
    return res.status(400).send("Dati invalidi.");

  const messaggio = await insertMessaggio(req.db, {
    nome: req.body.nome,
    messaggio: req.body.messaggio,
  });
  console.log(messaggio, "messaggio");

  return res.json({ messaggio });
});

export default handler;
