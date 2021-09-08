//@ts-nocheck

import { useEffect } from "react";

function useReCaptchaV3() {
  const clientKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_CLIENT_KEY!;

  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback?: () => void) => {
      // Loads the reCatcha script if it is missing
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${clientKey}`);
  }, [clientKey]);

  return {
    withReCaptcha: (callback: (token: string) => void) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(clientKey, {
            action: "submitform",
          })
          .then((token: string) => {
            console.log("Got key: ", token);
            callback(token);
          });
      });
    },
  };
}

export default useReCaptchaV3;
