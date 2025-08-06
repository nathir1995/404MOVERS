// import React from "react";

// import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
// import { useFormikContext } from "formik";
// import GoogleMapReact from "google-map-react";
// import { EndDotImg, StartDotImg, defaultZoom, height } from "../utils/mapProps";
// import { ValuesType } from "./formUtils";

// import PlacesAutocomplete from "../components/PlacesAutocomplete";

// const DropoffLocationForm = ({
//   controls,
// }: {
//   controls: MuiStepSliderControlType;
// }) => {
//   const formik = useFormikContext<ValuesType>();
//   const [map, setMap] = React.useState<any>(null);

//   const { start_lat, start_lang } = formik.values;
//   const renderStartMarker = React.useCallback(
//     (map: any, maps: any) => [
//       new maps.Marker({
//         position: { lat: start_lat, lng: start_lang },
//         map,
//         icon: { url: StartDotImg },
//       }),
//     ],
//     [start_lat, start_lang]
//   );

//   const onAutoCompleteChange = ({ lat, lng }: { lat: number; lng: number }) => {
//     map?.panTo?.({ lat, lng });
//   };

//   return (
//     <>
//       <div
//         style={{ height: height, width: "100%", position: "relative" }}
//         key="2"
//       >
//         <GoogleMapReact
//           resetBoundsOnResize={true}
//           options={{
//             clickableIcons: true,
//             fullscreenControl: false,
//             gestureHandling: "greedy",
//           }}
//           bootstrapURLKeys={{
//             key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
//             libraries: ["places"],
//           }}
//           defaultCenter={{
//             lat: formik.values.end_lat || (formik.values.start_lat as number),
//             lng: formik.values.end_lang || (formik.values.start_lang as number),
//           }}
//           onChange={(map) => {
//             formik.setFieldValue("end_lat", map.center.lat);
//             formik.setFieldValue("end_lang", map.center.lng);
//           }}
//           defaultZoom={defaultZoom}
//           onGoogleApiLoaded={({ map: _map, maps }) => {
//             setMap(_map);
//             return renderStartMarker(_map, maps);
//           }}
//           yesIWantToUseGoogleMapApiInternals
//         ></GoogleMapReact>
//         <img
//           src={EndDotImg}
//           alt="End"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-37.5%, -90%)",
//             pointerEvents: "none",
//           }}
//         />
//         {map !== null && (
//           <PlacesAutocomplete type="end" onSelect={onAutoCompleteChange} />
//         )}
//       </div>
//     </>
//   );
// };

// export default DropoffLocationForm;
