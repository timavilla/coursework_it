
import WatchListEdit from './WatchListEdit'
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


const WatchList = ({entries, remove}) => {
    
    return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Эпизоды</TableCell>
            <TableCell align="right">Оценка</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell component="th" scope="entry">
                {entry.title_en}
              </TableCell>
              <TableCell align="right">{entry.WatchListInDB.status}</TableCell>
              <TableCell align="right">{entry.WatchListInDB.current_episodes}</TableCell>
              <TableCell align="right">{entry.WatchListInDB.rating}</TableCell>
              <TableCell align="right">
                  
                    <WatchListEdit entry={entry} remove={remove}/>
                      
                   
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
    )
}

export default WatchList

