import React from "react";
import Move, { Mover } from "@/models/Move/Move.model";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { safeFind, hasItems } from "@/utility/arraySafety";

import { defaultCetner } from "@/features/book-move/utils/mapProps";
import useFirebaseContext from "@/firebase/FirebaseContext";
import { getMessaging, onMessage } from "firebase/messaging";
import { app as firebaseApp } from "@/firebase";
import { NotificationMeta } from "@/models/notification";
import { ROLE } from "@/constants/roles";
import MoverUserMarker from "@/components/MoverUserMarker";
import MoverDetailsPopper from "./MoverDetailsPopper";

type IProps = {
  move: Move;
};

type MoversTracker = {
  mover: Mover;
  longitude: number;
  latitude: number;
};

const TrackMap = ({ move }: IProps) => {
  const moveId = move.id;
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const [moversTracker, setMoversTracker] = React.useState<MoversTracker[]>([]);
  const [moverToDisplay, setMoverToDisplay] = React.useState<Mover | null>(
    null
  );

  const handleReceive = (mover: Mover, longitude: number, latitude: number) => {
    setMoversTracker((prev) => {
      if (prev.length === 0 && mapRef.current) {
        mapRef.current.panTo({ lat: latitude, lng: longitude });
      }
      // Use safe array utilities to prevent TypeError
      const exists = safeFind(prev, (i) => i.mover.id === mover.id) !== undefined;
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
        let meta: NotificationMeta | undefined;
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

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
        <Map
          defaultCenter={defaultCetner}
          defaultZoom={14}
          style={{ width: "100%", height: "100%" }}
          gestureHandling="greedy"
          disableDefaultUI={true}
          zoomControl
          onLoad={handleMapLoad}
        >
          {hasItems(moversTracker) && moversTracker.map(({ latitude, longitude, mover }) => (
            <AdvancedMarker
              key={mover.id}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => setMoverToDisplay(mover)}
            >
              <MoverUserMarker
                mover={mover}
                onClick={() => setMoverToDisplay(mover)}
                isClicked={mover.id === moverToDisplay?.id}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
      
      <MoverDetailsPopper
        mover={moverToDisplay}
        onClose={() => setMoverToDisplay(null)}
      />
    </div>
  );
};

export default TrackMap;
