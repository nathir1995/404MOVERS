import { EndDotImg, StartDotImg } from "configs/map";
import GoogleMapReact from "google-map-react";
import React from "react";

import { app as firebaseApp } from "@firebase";
import useFirebaseContext from "@firebase/FirebaseContext";
import MoverUserMarker from "components/smart/MoverUserMarker";
import { getMessaging, onMessage } from "firebase/messaging";
import MoverDetailsPopper from "./MoverDetailsPopper";

const TrackMap = ({ move }) => {
  const moveId = move.id;
  const mapRef = React.useRef(null);

  const [moversTracker, setMoversTracker] = React.useState([]);
  const [moverToDisplay, setMoverToDisplay] = React.useState(null);

  const { start_lat, start_lang } = move;
  const { end_lat, end_lang } = move;

  const start = React.useMemo(
    () => ({
      lat: parseFloat(start_lat),
      lng: parseFloat(start_lang),
    }),
    [start_lat, start_lang]
  );
  const end = React.useMemo(
    () => ({
      lat: parseFloat(end_lat),
      lng: parseFloat(end_lang),
    }),
    [end_lat, end_lang]
  );

  const renderMarkers = React.useCallback(
    (map, maps) => [
      new maps.Marker({
        position: start,
        map,
        icon: { url: StartDotImg },
      }),
      new maps.Marker({
        position: end,
        map,
        icon: { url: EndDotImg },
      }),
    ],
    [start, end]
  );

  const handleReceive = (mover, longitude, latitude) => {
    setMoversTracker((prev) => {
      if (prev.length === 0) {
        mapRef?.current?.panTo?.({ lat: latitude, lng: longitude });
      }
      const exists = prev.find((i) => i.mover.id === mover.id) !== undefined;
      if (exists)
        return prev.map((item) =>
          item.mover.id === mover.id ? { mover, longitude, latitude } : item
        );
      else return [...prev, { mover, longitude, latitude }];
    });
  };

  const { fcmToken } = useFirebaseContext();
  React.useEffect(() => {
    if (typeof window !== "undefined" && fcmToken) {
      const messaging = getMessaging(firebaseApp);
      onMessage(messaging, (payload) => {
        let meta;
        try {
          meta = JSON.parse(payload.data?.meta || "");
        } catch (e) {}

        if (meta?.type === "location" && meta.type_id === moveId) {
          console.log(payload);
          const { user_info, longitude, latitude } = meta;
          const mover = user_info;
          handleReceive(mover, longitude, latitude);
        }
      });
    }
  }, [fcmToken, moveId]);

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GoogleMapReact
        options={{
          clickableIcons: true,
          fullscreenControl: false,
          gestureHandling: "greedy",
        }}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={start}
        defaultZoom={14}
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          renderMarkers(map, maps);
        }}
      >
        {moversTracker.map(({ latitude, longitude, mover }) => (
          <MoverUserMarker
            key={mover.id}
            mover={mover}
            // @ts-ignore
            markerId={mover.id}
            lat={latitude}
            lng={longitude}
            onClick={() => setMoverToDisplay(mover)}
            isClicked={mover.id === moverToDisplay?.id}
          />
        ))}
      </GoogleMapReact>
      <MoverDetailsPopper
        mover={moverToDisplay}
        onClose={() => setMoverToDisplay(null)}
      />
    </div>
  );
};

export default TrackMap;
