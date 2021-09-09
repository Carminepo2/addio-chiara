import React, { useEffect } from "react";

function Player() {
  useEffect(() => {
    const audio = new Audio("/per_dimenticare.mp3");
    audio.loop = true;
    audio.play();
  }, []);
  return <></>;
}

export default Player;
