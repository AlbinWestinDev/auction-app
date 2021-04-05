import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  getById,
  insertBid,
  getBidByAuctionId,
} from "../../../DataAPIManagerTool/NackowskisService";

import useStyles from "./styles";

export default function ShowAuction(props) {
  const [auctionData, setAuctionData] = useState();
  const [bidData, setBidData] = useState([]);

  const classes = useStyles();
  const fetchAuctionData = async () => {
    const fetchedAuction = await getById(5565);
    setAuctionData(fetchedAuction);
  };

  const fetchBidData = async (id) => {
    const fetchedBid = await getBidByAuctionId(id);
    setBidData(fetchedBid);
  };

  useEffect(() => {
    const bud = {
      BudID: 3232,
      Summa: 600,
      AuktionID: 5565,
      Budgivare: "Pelle",
    };
    // insertBid(bud);
    fetchAuctionData();
  }, []);

  useEffect(() => {
    if (auctionData != null) {
      fetchBidData(auctionData.AuktionID);
      console.log("fetchBid ID", auctionData.AuktionID);
    }
  }, [auctionData]);

  useEffect(() => {
    console.log("bidData", bidData);
  }, [bidData]);

  useEffect(() => {
    console.log("auctiondata", auctionData);
  }, [auctionData]);
  return !auctionData ? (
    <p>Datan laddas</p>
  ) : (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={12}>
          <Grid item lg={8}>
            <Grid container>
              <Grid item lg={8}>
                <Typography align="left" variant="h5">
                  {auctionData.Titel}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle2">
                  Skapad {auctionData.StartDatum}
                </Typography>
                <Typography variant="subtitle2">
                  Skapad av {auctionData.SkapadAv}
                </Typography>
                <Typography variant="subtitle2">
                  AuktionsId: {auctionData.AuktionID}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <Typography variant="h6">Objektbeskrivning</Typography>
              <Typography align="left" variant="body2">
                {auctionData.Beskrivning}
              </Typography>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <Paper className={classes.paper} elevation={5}>
              <Grid item container lg={12}>
                <Grid container item>
                  <Grid item lg={12}>
                    <Typography variant="h5">Auktionen avslutas</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">2021-04-05</Typography>
                  </Grid>
                </Grid>

                <Grid container item>
                  <Grid item lg={12}>
                    <Typography variant="h5">Ledande bud</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="h6">
                      {!auctionData ? (
                        <p>Data laddas</p>
                      ) : (
                        bidData[bidData.length - 1].Summa
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <form className={classes.bidForm}>
                    <Grid item lg={12}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Ange bud"
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <Button variant="contained">LÄGG BUD</Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
