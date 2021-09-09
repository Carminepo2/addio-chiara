import React from "react";
import ReactPlayer from "react-player";

function Player() {
  return (
    <>
      <ReactPlayer playing loop width={0} height={0} url={`https://www.youtube-nocookie.com/embed/6I_gY_fyY_8`} />
    </>
  );
}

export default Player;
