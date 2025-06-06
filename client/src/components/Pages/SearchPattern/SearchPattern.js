import './SearchPattern.scss';
import React from 'react';
import SearchMap from '../../layout/SearchMap/SearchMap';
import { connect } from 'react-redux';
import {
  getSearchArea,
  assignRescueTeam,
  addSearchPattern,
  assignPatternType,
} from '../../../actions/area';
import { setLoader, removeLoader } from '../../../actions/general';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Table,
  Grid,
  Badge,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import drone from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import fighter from '../../../images/fighter.png';
import axios from 'axios';
import Loader from '../../layout/Loader/Loader';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    areaData: state.searchArea,
    loader: state.general.loader,
  };
};

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 530,
  maxWidth: '100%',
});

const StyledFormControl = styled(FormControl)({
  minWidth: 70,
});

const StyledTableCell = styled(TableCell)({
  fontSize: '0.7rem',
});

const StyledHeadCell = styled(TableCell)({
  fontSize: '0.8rem',
  backgroundColor: 'black',
  color: 'white',
});

const SearchPattern = ({ 
  areaData, 
  loader, 
  assignRescueTeam, 
  assignPatternType, 
  setLoader, 
  removeLoader, 
  addSearchPattern 
}) => {
  const handleChange = (event, index) => {
    assignRescueTeam(index, event.target.value);
  };

  const handleChangePatternType = (event, index) => {
    assignPatternType(index, event.target.value);
  };

  const fetchPatterns = async () => {
    try {
      setLoader();
      const { data } = await axios.post('api/searchPattern', areaData);
      addSearchPattern(data);
      removeLoader();
    } catch (err) {
      removeLoader();
      console.error(err.message);
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className='search-pattern-main'>
      <Grid container className='top'>
        <Grid
          container
          item
          xs={6}
          justify='space-around'
          alignItems='center'
          className='icons-container'
        >
          <Grid item xs={2}>
            <Badge
              badgeContent={
                areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'helicopterA'
                ).length
              }
              color='secondary'
            >
              <img src={fighter} width='60' height='60' alt='' />
            </Badge>
          </Grid>

          <Grid item xs={2}>
            <Badge
              badgeContent={
                areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'helicopterB'
                ).length
              }
              color='primary'
            >
              <img src={helicopter} width='60' height='60' alt='' />
            </Badge>
          </Grid>

          <Grid item xs={2}>
            <Badge
              badgeContent={
                areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'drone'
                ).length
              }
              color='error'
            >
              <img src={drone} width='60' height='60' alt='' />
            </Badge>
          </Grid>
        </Grid>
        <Grid item container xs={6} alignItems='center'></Grid>
      </Grid>
      <div className='middle'>
        <SearchMap areaData={areaData} />
      </div>

      <div className='side'>
        <Paper sx={{ width: '100%' }}>
          <StyledTableContainer>
            <Table
              stickyHeader
              size='small'
              aria-label='sticky table'
              className='table'
            >
              <TableHead>
                <TableRow>
                  <StyledHeadCell align='left'>Index</StyledHeadCell>
                  <StyledHeadCell align='left'>Search Team</StyledHeadCell>
                  <StyledHeadCell align='left'>Search Pattern</StyledHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {areaData.filteredGrid.features.map((row, num) => (
                  <TableRow hover key={num}>
                    <StyledTableCell align='left'>{num}</StyledTableCell>
                    <StyledTableCell align='left'>
                      <StyledFormControl>
                        <Select
                          value={row.rescue_team || ''}
                          onChange={(event) => handleChange(event, num)}
                          size="small"
                          inputProps={{
                            'aria-label': 'select team',
                          }}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'helicopterA'}>Helecopter A</MenuItem>
                          <MenuItem value={'helicopterB'}>Helecopter B</MenuItem>
                          <MenuItem value={'drone'}>Drone</MenuItem>
                        </Select>
                      </StyledFormControl>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <StyledFormControl>
                        <Select
                          value={row.pattern_type || ''}
                          onChange={(event) => handleChangePatternType(event, num)}
                          size="small"
                          inputProps={{ 'aria-label': 'Pattern Type' }}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'expanded_square'}>Expanded Square</MenuItem>
                          <MenuItem value={'creepy_line'}>Creepy Line</MenuItem>
                        </Select>
                      </StyledFormControl>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Paper>
        <div className='button-container'>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              fetchPatterns();
            }}
          >
            Fetch Pattern
          </Button>
          <Link to='./results'>
            <Button variant='contained' color='secondary' size='small'>
              Proceed To Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, {
  getSearchArea,
  assignRescueTeam,
  addSearchPattern,
  setLoader,
  removeLoader,
  assignPatternType,
})(SearchPattern);
