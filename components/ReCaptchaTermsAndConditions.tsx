import React from "react";

function ReCaptchaTermsAndConditions({ className }: { className?: string }) {
  return (
    <div className={`text-xs !mt-1 text-gray-500 dark:text-gray-300 ${className}`}>
      Protetto da reCAPTCHA -{" "}
      <a
        className="text-blue-500 font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://policies.google.com/privacy"
      >
        Privacy Policy
      </a>{" "}
      e{" "}
      <a
        className="text-blue-500 font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://policies.google.com/terms"
      >
        Termini di Servizio
      </a>
    </div>
  );
}

export default ReCaptchaTermsAndConditions;
