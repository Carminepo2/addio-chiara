import { NextApiRequest, NextApiResponse } from "next";
const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

async function verifyReCaptchaToken(token: string) {
  const SECRET_KEY = process.env.RECAPTCHA_SECRET!;

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${SECRET_KEY}&response=${token}`,
  });
  const data = await response.json();
  return data.score >= 0.5;
}
//@ts-ignore
const reCaptchaProtectedRoute = async (req, res, next) => {
  if (req.method !== "GET") {
    const reCaptchaToken = req.body?.reCaptchaToken;

    if (!reCaptchaToken) {
      res.status(400).json({});
      return;
    }

    const isBot = !(await verifyReCaptchaToken(reCaptchaToken));
    if (isBot) {
      res.status(403).json({});
      return;
    }
  }
  next();
};

export default reCaptchaProtectedRoute;
