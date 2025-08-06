import React from "react";
import Move, { Mover } from "@/models/Move/Move.model";
import GoogleMap from "google-maps-react-markers";

import {
  StartDotImg,
  defaultCetner,
} from "@/features/book-move/utils/mapProps";
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

const fakeMover: Mover = {
  id: 11,
  first_name: "Dr",
  last_name: "Labor",
  email: "terzian.cezar@outlook.sa",
  phone_number: "1234123456",
  pivot: {
    is_started: true,
    started_at: "2024-03-26T17:27:22.000000Z",
    confirm_started: true,
    confirm_started_at: "2024-04-07T13:36:56.000000Z",
    is_finished: true,
    finished_at: "2024-03-26T23:10:57.000000Z",
    confirm_finished: true,
    confirm_finished_at: "2024-04-07T13:37:26.000000Z",
  },
  user_role: {
    key: ROLE.LABOR,
  },
};

type MoversTracker = {
  mover: Mover;
  longitude: number;
  latitude: number;
};

const TrackMap = ({ move }: IProps) => {
  const moveId = move.id;
  const mapRef = React.useRef<any>(null);

  const [moversTracker, setMoversTracker] = React.useState<MoversTracker[]>([]);
  const [moverToDisplay, setMoverToDisplay] = React.useState<Mover | null>(
    null
  );

  const handleReceive = (mover: Mover, longitude: number, latitude: number) => {
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

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        options={{
          clickableIcons: true,
          fullscreenControl: false,
          gestureHandling: "greedy",
        }}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
        defaultCenter={defaultCetner}
        defaultZoom={14}
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
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
      </GoogleMap>
      <MoverDetailsPopper
        mover={moverToDisplay}
        onClose={() => setMoverToDisplay(null)}
      />
    </div>
  );
};

export default TrackMap;
