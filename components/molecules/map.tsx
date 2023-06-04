import { DEFAULT_MAP_HEIGHT, DEFAULT_MAP_WIDTH } from '@/lib';
import Leaflet from 'leaflet';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import * as ReactLeaflet from 'react-leaflet';

// @ts-expect-error
interface Props extends ReactLeaflet.MapContainerProps {
  width: string | number;
  height: string | number;
  children: (f1: typeof ReactLeaflet, f2: typeof Leaflet) => React.ReactNode;
  location: RentFormData['location'];
}

const Map = (props: Props) => {
  const {
    location,
    width = DEFAULT_MAP_WIDTH,
    height = DEFAULT_MAP_HEIGHT,
    ...rest
  } = props;

  const DynamicMap = useMemo(() => {
    return dynamic(() => import('../atoms/base-map'), {
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
