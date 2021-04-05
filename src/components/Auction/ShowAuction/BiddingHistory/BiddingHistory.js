import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

export default function BiddingHistory(props) {
  const classes = useStyles();
  const { bidData } = props;

  return bidData.length > 0 ? (
    <TableContainer className={classes.root}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Bud kr</TableCell>
            <TableCell>Budgivare</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bidData
            // .slice(0)
            .slice(Math.max(bidData.length - 5, 0))
            .reverse()
            .map((row) => (
              <TableRow hover>
                <TableCell>{row.Summa}</TableCell>
                <TableCell>{row.Budgivare}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Det finns inga bud på det här objektet ännu</Typography>
  );
}
