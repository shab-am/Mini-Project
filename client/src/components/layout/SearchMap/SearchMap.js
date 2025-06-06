import './SearchMap.scss';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl, LayerGroup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import AnimatedMarker from './AnimatedMarker';

// Images
import airplane_pin from '../../../images/airplane_pin.png';
import default_pin from '../../../images/default_pin.png';
import hospital_pin from '../../../images/hospital_pin.png';
import station_pin from '../../../images/station_pin.png';
import centerpointicon from '../../../images/rec.png';
import red_marker_icon from '../../../images/red_marker.png';

const SearchMap = () => {
  const aircraft = useSelector(state => state.aircraftReducer);
  const areaData = useSelector(state => state.searchAreaReducer);
  const help_points_geojson = useSelector(state => state.helpPointsReducer);
  const roads_geojson = useSelector(state => state.roadsReducer);
  const predicted = useSelector(state => state.predictionReducer.predictedCoordinates);

  const getImageFromPoint = (type) => {
    if (type === 'hospital') return hospital_pin;
    if (type === 'station') return station_pin;
    return default_pin;
  };

  const apitoken = 'pk.eyJ1IjoibmlraGlsbmFnYXIxMjMiLCJhIjoiY2tvM3l1MGRhMWU5czJ4b2JteWd6NHdoayJ9.ME2Il0_kSq5tr19J6m2UHQ';
  const tileurl_option1 = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
  const tileurl_option2 = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;

  // Use predicted coordinates if available, else fallback
  const center = (predicted && typeof predicted.latitude === 'number' && typeof predicted.longitude === 'number')
    ? [predicted.latitude, predicted.longitude]
    : (aircraft && typeof aircraft.latitude === 'number' && typeof aircraft.longitude === 'number')
      ? [aircraft.latitude, aircraft.longitude]
      : [26.9124, 75.7873];

  const filteredGrid = areaData?.filteredGrid?.features ? areaData.filteredGrid : { features: [] };

  return (
    <MapContainer
      className='mysearchmap'
      style={{ height: '100%', width: '100%' }}
      center={center}
      zoom={12}
    >
      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='Streets View'>
          <TileLayer url={tileurl_option1} />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Satellite View'>
          <TileLayer url={tileurl_option2} />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name='Grid' checked>
          <LayerGroup>
            {filteredGrid?.features?.map((item, index) => (
              <GeoJSON
                data={item}
                style={{ weight: 0.6, fillOpacity: 0.1 }}
                key={index}
              />
            ))}
          </LayerGroup>
          <AnimatedMarker filteredGrid={filteredGrid} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name='Search Area Layer' checked>
          <LayerGroup>
            {areaData?.geojson?.features && (
              <GeoJSON
                data={areaData.geojson}
                style={{
                  fillColor: 'orange',
                  fillOpacity: 0.1,
                  color: 'purple',
                  weight: 1,
                }}
              />
            )}
            {areaData?.geojson?.features?.[0]?.center && (
              <LayerGroup>
                <Marker
                  key={areaData.geojson.features[0].id || 'center'}
                  icon={L.icon({
                    iconUrl: centerpointicon,
                    iconSize: [25, 25],
                  })}
                  position={areaData.geojson.features[0].center}
                >
                  <Popup>
                    Center - {areaData.geojson.features[0].properties?.crashPoint}
                  </Popup>
                </Marker>
                {(aircraft?.latitude && aircraft?.longitude) && (
                  <Polyline
                    pathOptions={{
                      color: 'grey',
                      dashArray: '4, 10',
                      dashOffset: '0',
                    }}
                    positions={[
                      [aircraft.latitude, aircraft.longitude],
                      areaData.geojson.features[0].center,
                    ]}
                  />
                )}
              </LayerGroup>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name='Aircraft LKP' checked>
          <LayerGroup>
            {(aircraft && typeof aircraft.latitude === 'number' && typeof aircraft.longitude === 'number') && (
              <Marker
                icon={L.icon({
                  iconUrl: airplane_pin,
                  iconSize: [35, 35],
                })}
                position={[aircraft.latitude, aircraft.longitude]}
              >
                <Popup>
                  <h3>Last known Information of Aircraft</h3>
                  Title: <b>{aircraft.title}</b>
                  <br />
                  Location: <b>{aircraft.latitude}, {aircraft.longitude}</b>
                  <br />
                  Category: {aircraft.category}
                  <br />
                  Direction: {aircraft.direction}
                  <br />
                  Velocity: {aircraft.velocity}
                  <br />
                  Altitude: {aircraft.altitude}
                  <br />
                  Weather: {aircraft.weather}
                  <br />
                  Description: {aircraft.description}
                </Popup>
              </Marker>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name='Additional Spots Layer'>
          <LayerGroup>
            {help_points_geojson?.features?.map((item, idx) => (
              <Marker
                key={item.id || idx}
                icon={L.icon({
                  iconUrl: getImageFromPoint(item.properties?.amenity),
                  iconSize: [30, 30],
                })}
                position={[
                  item.geometry?.coordinates?.[1] || 0,
                  item.geometry?.coordinates?.[0] || 0,
                ]}
              >
                <Popup>
                  {Object.entries(item.properties || {}).map(([key, value]) => (
                    <span key={`${key}-${item.id}`}>
                      {key}: {value}
                      <br />
                    </span>
                  ))}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name='Roads or Rivers'>
          <LayerGroup>
            {roads_geojson?.features?.length > 0 && (
              <GeoJSON
                key={roads_geojson.features.length}
                data={roads_geojson}
              />
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        {predicted && (
          <LayerGroup>
            <Marker
              icon={L.icon({
                iconUrl: red_marker_icon,
                iconSize: [35, 35],
              })}
              position={[predicted.latitude, predicted.longitude]}
            >
              <Popup>
                <b>Predicted Crash Location</b><br />
                Latitude: {predicted.latitude}<br />
                Longitude: {predicted.longitude}
              </Popup>
            </Marker>
          </LayerGroup>
        )}
      </LayersControl>
    </MapContainer>
  );
};

export default SearchMap;
