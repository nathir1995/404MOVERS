import client from "@/api/client";
import React from "react";

const useLocationTracker = (move_id: number) => {
  const [currentLatitude, setCurrentLatitude] = React.useState<null | number>(
    null
  );
  const [currentLongitude, setCurrentLongitude] = React.useState<null | number>(
    null
  );

  React.useEffect(() => {
    if (currentLatitude !== null && currentLongitude !== null) {
      client
        .post(`/api/tracking/location`, {
          move_id: move_id,
          latitude: currentLatitude,
          longitude: currentLongitude,
        })
        .catch(() => {});
    }
  }, [currentLatitude, currentLongitude, move_id]);

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
      },
      () => {},
      { maximumAge: 5000 }
    );
  }, []);
};

export const LocationTracker = ({ move_id }: { move_id: number }) => {
  useLocationTracker(move_id);
  return null;
};

export default useLocationTracker;
