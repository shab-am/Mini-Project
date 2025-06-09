import React, { useEffect, useState } from 'react';
import './SearchArea.scss';
import { Link, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import SearchMap from '../../layout/SearchMap/SearchMap';
import AreaTypeSelector from '../../layout/AreaTypeSelector/AreaTypeSelector';
import { getSearchArea } from '../../../actions/area.js';
import Loader from '../../layout/Loader/Loader';
import { useSelector } from 'react-redux';
import { getWeather, getElevation, getPlaceInfo } from '../../../services/externalInfo';

const mapStateToProps = (state) => {
  return {
    areaData: state.searchAreaReducer,
    loader: state.general.loader,
  };
};

// main component

const SearchArea = ({ loader, areaData, getSearchArea }) => {
  const predicted = useSelector(state => state.predictionReducer.predictedCoordinates);
  const location = useLocation();
  const fromReport = location.state?.fromReport;

  // New state for external info
  const [externalInfo, setExternalInfo] = useState(null);

  useEffect(() => {
    if (fromReport && predicted) {
      (async () => {
        try {
          const [weather, elevation, place] = await Promise.all([
            getWeather(predicted.latitude, predicted.longitude),
            getElevation(predicted.latitude, predicted.longitude),
            getPlaceInfo(predicted.latitude, predicted.longitude)
          ]);
          setExternalInfo({ weather, elevation, place });
        } catch (err) {
          setExternalInfo({ error: err.message });
        }
      })();
    }
  }, [fromReport, predicted]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className='search-area-main'>
      <div className='top'>
        <AreaTypeSelector />
      </div>
      <div className='middle'>
        <SearchMap center={predicted} marker={predicted} key={areaData?.geojson?.features[0]?.id} />
      </div>

      <div className='side'>
        <TableContainer component={Paper} className='table'>
          <Table aria-label='simple table' size='small'>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  <p style={{ fontSize: '1rem' }}>
                    Current Search Area Information
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fromReport && predicted && (
                <>
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ color: 'red' }}>
                      <b>Predicted Crash Location (from last report)</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Latitude</TableCell>
                    <TableCell sx={{ color: 'purple' }}>{predicted.latitude}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Longitude</TableCell>
                    <TableCell sx={{ color: 'purple' }}>{predicted.longitude}</TableCell>
                  </TableRow>
                </>
              )}
              {fromReport && predicted && externalInfo && (
                <>
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ color: 'blue' }}>
                      <b>Additional Info for Predicted Location</b>
                    </TableCell>
                  </TableRow>
                  {externalInfo.error && (
                    <TableRow>
                      <TableCell colSpan={2} sx={{ color: 'red' }}>
                        {externalInfo.error}
                      </TableCell>
                    </TableRow>
                  )}
                  {externalInfo.weather && (
                    <>
                      <TableRow>
                        <TableCell>Weather</TableCell>
                        <TableCell>
                          {externalInfo.weather.weather?.[0]?.description}, {externalInfo.weather.main?.temp}°C
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Wind</TableCell>
                        <TableCell>
                          {externalInfo.weather.wind?.speed} m/s, {externalInfo.weather.wind?.deg}°
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {externalInfo.elevation !== undefined && (
                    <TableRow>
                      <TableCell>Elevation</TableCell>
                      <TableCell>{externalInfo.elevation} m</TableCell>
                    </TableRow>
                  )}
                  {externalInfo.place && (
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell>
                        {externalInfo.place.display_name}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
              {Object.entries(areaData?.geojson?.features[0]?.properties || {}).map((row, index) => (
                <TableRow key={index} hover className='tablerow'>
                  <TableCell component='th' scope='row'>
                    {row[0]}
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ color: 'purple' }}
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className='button-container'>
          <div className='button'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={getSearchArea}
            >
              Find Area
            </Button>
          </div>

          <Link to='search-pattern' className='button'>
            <Button variant='contained' color='secondary' size='small'>
              Proceed to Pattern
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { getSearchArea })(SearchArea);
