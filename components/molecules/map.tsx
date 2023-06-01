import Leaflet from "leaflet";
import dynamic from "next/dynamic";
import * as ReactLeaflet from "react-leaflet";

const DynamicMap = dynamic(() => import("../atoms/base-map"), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shifts
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

// @ts-expect-error
interface Props extends ReactLeaflet.MapContainerProps {
  width: string | number;
  height: string | number;
  children: (f1: typeof ReactLeaflet, f2: typeof Leaflet) => React.ReactNode;
}

const Map = (props: Props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: Number(width) / Number(height) }}>
      <DynamicMap {...props} />
    </div>
  );
};

export { Map };
