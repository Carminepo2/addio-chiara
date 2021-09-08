import nc from "next-connect";
import database from "./database";
import reCaptchaProtectedRoute from "./reCaptchaV3";

const all = nc();

all.use(reCaptchaProtectedRoute).use(database);

export default all;
