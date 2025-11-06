import React from "react";

import Thunderstorm from "../assets/Thunderstorm.gif";
import Rain from "../assets/Rain.gif";
import SnowDay from "../assets/Snow.gif";
import ClearDay from "../assets/ClearDay.gif";
import ClearNight from "../assets/ClearNight.gif";
import CloudsDay from "../assets/CloudsDay.gif";
import CloudsNight from "../assets/CloudsNight.gif";
import Haze from "../assets/Haze.gif";
import video from "../assets/video1.mp4";

const WeatherBackground = ({ condition }) => {
  const gifs = {
    Thunderstorm,
    Drizzle: Rain,
    Rain,
    Snow: SnowDay,
    Clear: { day: ClearDay, night: ClearNight },
    Clouds: { day: CloudsDay, night: CloudsNight },
    Mist: Haze,
    Smoke: Haze,
    Haze,
    Fog: Haze,
    default: video,
  };

  // If no condition, show default video
  if (!condition) return renderBackground(video);

  const weatherType = condition.main;
  const asset = gifs[weatherType] || gifs.default;

  // Handle day/night logic if asset is an object (Clear, Clouds)
  const background =
    typeof asset === "object"
      ? condition.isDay
        ? asset.day
        : asset.night
      : asset;

  return renderBackground(background);
};

// Helper function to render image/video
const renderBackground = (background) => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    {background === video ? (
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in"
      >
        <source src={video} type="video/mp4" />
      </video>
    ) : (
      <img
        src={background}
        alt="weather background"
        className="w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in"
      />
    )}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>
);

export default WeatherBackground;
