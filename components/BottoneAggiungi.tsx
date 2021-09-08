import React from "react";

function BottoneAggiungi({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-white flex items-center shadow-md z-50 "
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white" />
      </svg>
    </button>
  );
}

export default BottoneAggiungi;
