import chiara from "../public/chiara.jpeg";
import Image from "next/image";
import ModaleMessaggio from "../components/ModaleMessaggio";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import settings from "../settings/index.json";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const arrayMessaggiScorrevoli = new Array(1).fill("");

export default function Index() {
  const { data, error } = useSWR("/api/messaggi", fetcher, { refreshInterval: 10000 });

  return (
    <>
      <Player />
      <div className="bg-white relative min-h-[600px] h-screen overflow-hidden">
        <Image objectPosition="27% 20%" layout="fill" objectFit="cover" src={chiara} placeholder="blur" alt="chiara" />
        <div className="absolute inset-0 bg-black/50" />
        <ModaleMessaggio />
        {data &&
          arrayMessaggiScorrevoli.map((_, i) => {
            return <Messaggio key={i} messaggi={data.messaggi} />;
          })}
      </div>
    </>
  );
}

const Messaggio = ({ messaggi }: { messaggi: any }) => {
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [chosenMessage, setChosenMessage] = useState({ nome: "", messaggio: "" });
  useEffect(() => {
    function changeMessage() {
      if (messaggi.length > 0) {
        const randomIndex = Math.floor(Math.random() * messaggi.length);
        setChosenMessage(messaggi[randomIndex]);
      }
    }
    intervalRef.current = setInterval(changeMessage, settings.SECONDI_TRANSIZIONE * 1000);
    return () => {
      clearInterval(intervalRef.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chosenMessage.nome && !chosenMessage.messaggio) return null;

  return (
    <div className="text-white relative z-20 scroll-top-animation inline-block max-w-xl ml-4 sm:ml-8">
      <div className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold">&quot;{chosenMessage.messaggio}&quot;</div>
      <div className="text-base sm:text-xl sm:mt-1 xl:mt-2">- {chosenMessage.nome}</div>
    </div>
  );
};
