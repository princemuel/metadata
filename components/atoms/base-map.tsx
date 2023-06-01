"use client";

import { cx } from "cva";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";

const { MapContainer } = ReactLeaflet;

// @ts-expect-error
interface Props extends ReactLeaflet.MapContainerProps {
  children: (f1: typeof ReactLeaflet, f2: typeof Leaflet) => React.ReactNode;
}

const Map = ({ children, className, ...rest }: Props) => {
  useEffect(() => {
    (async function init() {
      //@ts-expect-error
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer className={cx("h-[35vh] rounded-lg", className)} {...rest}>
      {children?.(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
};

export default Map;

{
  /* <TileLayer url={url} attribution={attribution} />
{center ? <Marker position={center} /> : null} */
}
