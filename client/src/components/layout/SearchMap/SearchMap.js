import './SearchMap.scss';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import airplane_pin from '../../../images/airplane_pin.png';
import default_pin from '../../../images/default_pin.png';
import { GeoJSON, LayersControl, LayerGroup, Polyline } from 'react-leaflet';

import hospital_pin from '../../../images/hospital_pin.png';
import station_pin from '../../../images/station_pin.png';
import centerpointicon from '../../../images/rec.png';

import L from 'leaflet';
import { useSelector } from 'react-redux';
import AnimatedMarker from './AnimatedMarker';

const SearchMap = () => {
  const aircraft = useSelector(state => state.aircraftReducer);
  const areaData = useSelector(state => state.searchAreaReducer);
  const help_points_geojson = useSelector(state => state.helpPointsReducer);
  const roads_geojson = useSelector(state => state.roadsReducer);

  const getImageFromPoint = (type) => {
    if (type === 'hospital') {
      return hospital_pin;
    } else if (type === 'station') {
      return station_pin;
    } else {
      return default_pin;
    }
  };

  const apitoken =
    'pk.eyJ1IjoibmlraGlsbmFnYXIxMjMiLCJhIjoiY2tvM3l1MGRhMWU5czJ4b2JteWd6NHdoayJ9.ME2Il0_kSq5tr19J6m2UHQ';

  const tileurl_option1 = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
  const tileurl_option2 = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;

  const center = Object.entries(aircraft).length === 0
    ? [26.9124, 75.7873]
    : [aircraft.latitude, aircraft.longitude];

  return (
    <MapContainer
      className='mysearchmap'
      style={{ height: '100%', width: '100%' }}
      center={center}
      zoom={12}
    >
      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name=' Streets View'>
          <TileLayer url={tileurl_option1} />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name=' Satellite View'>
          <TileLayer url={tileurl_option2} />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name='Grid' checked>
          <LayerGroup>
            {areaData.filteredGrid.features.map((item, index) => (
              <GeoJSON
                data={item}
                style={{ weight: 0.6, fillOpacity: 0.1 }}
                key={index}
              />
            ))}
          </LayerGroup>
          <AnimatedMarker filteredGrid={areaData.filteredGrid} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name='Search Area Layer' checked>
          <LayerGroup>
            <GeoJSON
              data={areaData.geojson}
              style={{
                fillColor: 'orange',
                fillOpacity: 0.1,
                color: 'purple',
                weight: 1,
              }}
            />
            {areaData.geojson.features[0]?.center && (
              <LayerGroup>
                <Marker
                  key={areaData.geojson.features[0].id}
                  icon={L.icon({
                    iconUrl: centerpointicon,
                    iconSize: 25,
                  })}
                  position={areaData.geojson.features[0].center}
                >
                  <Popup>
                    Center - {areaData.geojson.features[0].properties.crashPoint}
                  </Popup>
                </Marker>

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
              </LayerGroup>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name='Aircraft LKP' checked>
          <LayerGroup>
            {Object.entries(aircraft).length !== 0 && (
              <Marker
                icon={L.icon({
                  iconUrl: airplane_pin,
                  iconSize: 35,
                })}
                position={[aircraft.latitude, aircraft.longitude]}
              >
                <Popup>
                  <h3>Last known Information of Aircraft</h3>
                  Title: <b>{aircraft.title}</b>
                  <br />
                  Location:
                  <b>
                    {aircraft.latitude},{aircraft.longitude}
                  </b>
                  <br />
                  Category : {aircraft.category}
                  <br />
                  Direction :{aircraft.direction}
                  <br />
                  Velocity :{aircraft.velocity}
                  <br />
                  Altitude :{aircraft.altitude}
                  <br />
                  Direction :{aircraft.direction}
                  <br />
                  Weather :{aircraft.weather}
                  <br />
                  Description :{aircraft.description}
                </Popup>
              </Marker>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name='Additional Spots Layer'>
          <LayerGroup>
            {help_points_geojson.features.length > 0 && (
              <>
                {help_points_geojson.features.map((item) => (
                  <Marker
                    key={item.id}
                    icon={L.icon({
                      iconUrl: getImageFromPoint(item.properties.amenity),
                      iconSize: 30,
                    })}
                    position={[
                      item.geometry.coordinates[1],
                      item.geometry.coordinates[0],
                    ]}
                  >
                    <Popup>
                      {Object.entries(item.properties).map(([key, value]) => (
                        <span key={`${key}-${item.id}`}>
                          {key}: {value}
                          <br />
                        </span>
                      ))}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name='Roads or Rivers'>
          <LayerGroup>
            <GeoJSON
              key={roads_geojson.features.length}
              data={roads_geojson}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default SearchMap;
