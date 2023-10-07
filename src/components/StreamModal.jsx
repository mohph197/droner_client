import OvenPlayer from "ovenplayer";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useModalsContext } from "../hooks/useModalsContext";
import { AiFillCloseCircle } from "react-icons/ai";

const StreamModal = ({ streamURL }) => {
  useEffect(() => {
    const player = OvenPlayer.create("player", {
      autoStart: true,
      mute: true,
      controls: false,
      sources: [
        {
          type: "webrtc",
          file: streamURL,
        },
      ],
      events: {
        onReady: () => {
          console.log("Player is ready");
        },
        onPlay: () => {
          console.log("Player is playing");
        },
        onPause: () => {
          console.log("Player is paused");
        },
        onEnded: () => {
          console.log("Player is ended");
        },
        onError: (error) => {
          console.log("Player is error", error);
        },
      },
    });

    return () => {
      player.remove();
    };
  }, []);

  const { closeModal } = useModalsContext();

  return (
    <div className="relative rounded-xl overflow-hidden h-3/4 aspect-video isolate">
      <button
        className="text-red-500 absolute right-2 top-2 z-10"
        onClick={closeModal}
      >
        <AiFillCloseCircle className="text-3xl text-white" />
      </button>
      <div id="player"></div>
    </div>
  );
};
StreamModal.propTypes = {
  streamURL: PropTypes.string.isRequired,
};

export default StreamModal;
