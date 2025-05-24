import React from 'react';
import './SearchArea.scss';
import { Link } from 'react-router-dom';
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

const mapStateToProps = (state) => {
  return {
    areaData: state.searchAreaReducer,
    loader: state.generalReducer.loader,
  };
};

// main component

const SearchArea = ({ loader, areaData, getSearchArea }) => {
  if (loader) {
    return <Loader />;
  }

  return (
    <div className='search-area-main'>
      <div className='top'>
        <AreaTypeSelector />
      </div>
      <div className='middle'>
        <SearchMap key={areaData?.geojson?.features[0]?.id} />
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
