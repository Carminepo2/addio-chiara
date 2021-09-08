import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from "react";
import useReCaptchaV3 from "../lib/hooks/useReCaptchaV3";
import BottoneAggiungi from "./BottoneAggiungi";
import ReCaptchaTermsAndConditions from "./ReCaptchaTermsAndConditions";
import settings from "../settings/index.json";
import { MoonLoader } from "react-spinners";

export default function ModaleMessaggio() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(
    "Qualcosa è andato storto. Riprova. Contatta Carmine se si ripete constantemente."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nome: "", messaggio: "" });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setError("");
    setIsSubmitting(false);
    setIsOpen(true);
  }

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const { withReCaptcha } = useReCaptchaV3();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setIsSubmitting(true);
      withReCaptcha((token) => {
        const payload = {
          nome: formData.nome,
          messaggio: formData.messaggio,
          reCaptchaToken: token,
        };
        fetch("/api/messaggi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(() => {
            closeModal();
            setFormData({ nome: "", messaggio: "" });
          })
          .catch((err) => {
            console.error(err);
            setError("Qualcosa è andato storto. Riprova. Contatta Carmine se si ripete.");
            setIsSubmitting(false);
          });
      });
    },
    [formData, withReCaptcha]
  );

  return (
    <>
      <BottoneAggiungi onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {!isSubmitting ? "Inserisci un messaggio per Chiaretta." : "Invio in corso..."}
                </Dialog.Title>
                <div className="max-w-xl text-gray-400 text-xs">
                  <p>
                    {!isSubmitting
                      ? "Un piccolo messaggio, una dedica, un pensiero..."
                      : "Sto inserendo il messaggio nel database dell'amore..."}
                  </p>
                </div>
                {error && <p className="bg-red-100 mt-4 rounded-md p-2 text-xs text-red-900">{error}</p>}
                {!isSubmitting ? (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                          Chi sei?
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            id="nome"
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            placeholder="Sei Pona?"
                            maxLength={settings.MAX_CARATTERI_NOME}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700">
                        Messaggio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="messaggio"
                          name="messaggio"
                          value={formData.messaggio}
                          onChange={handleChange}
                          maxLength={settings.MAX_CARATTERI_MESSAGGIO}
                          rows={3}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Cara Chiaretta..."
                        />
                        <div className="max-w-xl text-gray-300 text-xs font-medium">
                          <p>Caratteri rimanenti: {settings.MAX_CARATTERI_MESSAGGIO - formData.messaggio.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        disabled={!formData.nome || !formData.messaggio}
                        type="submit"
                        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        Invia Messaggio
                      </button>
                      <button
                        type="button"
                        className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Annulla
                      </button>
                    </div>
                    <ReCaptchaTermsAndConditions />
                  </form>
                ) : (
                  <div className="py-12 flex justify-center">
                    <MoonLoader color="blue" />
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
