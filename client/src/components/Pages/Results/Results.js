import * as React from 'react';
import './Results.scss';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'black',
  color: 'white',
}));

const MainContainer = styled('div')({
  margin: '1rem',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledTableContainer = styled(TableContainer)({
  maxWidth: '100%',
  height: '50%',
});

const mapStateToProps = (state) => {
  return {
    searchAreaProperties:
      state.searchAreaReducer.geojson.features[0].properties,
    subAreas: state.searchAreaReducer.filteredGrid.features,
  };
};

function Results(props) {
  return props.subAreas.length === 0 ||
    props.subAreas === undefined ||
    props.subAreas[0].rescue_team === undefined ? (
    <h2>Oops, nothing here, first select a missing aircraft</h2>
  ) : (
    <MainContainer>
      <StyledTableContainer component={Paper}>
        <StyledTable
          stickyHeader
          aria-label='simple table'
          size='small'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align='left'>
                Search Pattern
              </StyledTableCell>
              <StyledTableCell align='left'>
                Rescue Team
              </StyledTableCell>
              <StyledTableCell align='left'>
                Path Length
              </StyledTableCell>
              <StyledTableCell align='left'>
                Search Time&nbsp;(hours)
              </StyledTableCell>
              <StyledTableCell align='left'>
                Field of View&nbsp;(km)
              </StyledTableCell>
              <StyledTableCell align='left'>
                Speed &nbsp;(km/hr)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.subAreas.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {index}
                </TableCell>
                <TableCell align='left'>{row.pattern_type}</TableCell>
                <TableCell align='left'>{row.rescue_team}</TableCell>
                <TableCell align='left'>
                  {row.properties.distance.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.time.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.fieldofview.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.speed.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </MainContainer>
  );
}

export default connect(mapStateToProps, null)(Results);
