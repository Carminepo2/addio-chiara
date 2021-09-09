import React from "react";

function Player() {
  return (
    <>
      <iframe
        className="invisible"
        loading="lazy"
        width="0px"
        height="0px"
        src={`https://www.youtube-nocookie.com/embed/6I_gY_fyY_8?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </>
  );
}

export default Player;
