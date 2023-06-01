import Leaflet from "leaflet";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import * as ReactLeaflet from "react-leaflet";

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shifts
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

// @ts-expect-error
interface Props extends ReactLeaflet.MapContainerProps {
  width: string | number;
  height: string | number;
  children: (f1: typeof ReactLeaflet, f2: typeof Leaflet) => React.ReactNode;
  location: ICountry;
}

const Map = (props: Props) => {
  const {
    location,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    ...rest
  } = props;

  const DynamicMap = useMemo(() => {
    return dynamic(() => import("../atoms/base-map"), {
      ssr: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <section style={{ aspectRatio: Number(width) / Number(height) }}>
      <DynamicMap {...rest} />
    </section>
  );
};

export { Map };
