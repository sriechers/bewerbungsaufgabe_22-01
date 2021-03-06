import { useState } from "react";
import { getUserLocationCity } from "../utils";
import { useStore } from "../store";
import Toast from "./Toast";

function GetUserLocationButton() {
  const setUserLocation = useStore((state) => state.setUserLocation);
  const loadingLocation = useStore((state) => state.loadingLocation);
  const [error, setError] = useState(null);

  const setLocation = async () => {
    try {
      const city = await getUserLocationCity();
      setUserLocation(city);
    } catch (errorMessage) {
      // Gibt es einen GeolocationError wird dieser übersetzt zurückgegeben
      setError(errorMessage);
    }
  };

  return (
    <>
      {error && <Toast text={error} />}
      <button
        className="button-white get-user-location-button"
        data-is-loading={loadingLocation}
        disabled={loadingLocation}
        onClick={setLocation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>eigenen Standort abrufen</span>
      </button>
    </>
  );
}

export default GetUserLocationButton;
