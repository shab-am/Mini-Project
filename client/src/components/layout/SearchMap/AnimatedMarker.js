import React from 'react';
import drone from '../../../images/drone.png';
import fighter from '../../../images/fighter.png';
import helicopter from '../../../images/helicopter.png';
import {
  GeoJSON,
  LayersControl,
  LayerGroup,
  Polyline,
  useMap,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import Animate from 'leaflet.animatedmarker/src/AnimatedMarker';

const AnimatedMarker = (props) => {
  const map = useMap();

  // Create a ref to store markers and lines for cleanup
  const markersRef = React.useRef([]);

  // Cleanup function to remove layers when component unmounts
  React.useEffect(() => {
    const currentMarkers = markersRef.current;
    return () => {
      if (currentMarkers) {
        currentMarkers.forEach(marker => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map]);

  return (
    <LayerGroup>
      {props.filteredGrid.features.map((item, index) => {
        if (!item.rescue_team) return null;

        if (item.pattern === undefined) {
          return (
            <Marker
              key={index}
              icon={L.icon({
                iconUrl: item.rescue_team === 'helicopterA' 
                  ? fighter 
                  : item.rescue_team === 'helicopterB'
                  ? helicopter
                  : drone,
                iconSize: [30, 30], // Updated to array format
              })}
              position={[
                (item.geometry.coordinates[0][0][1] + item.geometry.coordinates[0][2][1]) / 2,
                (item.geometry.coordinates[0][0][0] + item.geometry.coordinates[0][2][0]) / 2,
              ]}
            />
          );
        }

        // Create and store animated marker and line
        const line = L.polyline(
          item.pattern.coordinates[0].map(([lng, lat]) => [lat, lng]),
          {
            color: 'black',
            weight: 0.5,
            dashArray: '4, 3',
            dashOffset: '0',
          }
        );

        const animatedMarker = L.animatedMarker(line.getLatLngs(), {
          autoStart: true,
          icon: L.icon({
            iconUrl: item.rescue_team === 'helicopterA'
              ? fighter
              : item.rescue_team === 'helicopterB'
              ? helicopter
              : drone,
            iconSize: [30, 30], // Updated to array format
          }),
        });

        // Store references for cleanup
        markersRef.current.push(line, animatedMarker);
        
        // Add to map
        map.addLayer(animatedMarker);
        map.addLayer(line);
        
        return null;
      })}
    </LayerGroup>
  );
};

export default AnimatedMarker;
