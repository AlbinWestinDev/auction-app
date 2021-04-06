import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  getById,
  insertBid,
  getBidByAuctionId,
  deleteById,
} from '../../../DataAPIManagerTool/NackowskisService';
import BidModel from '../../_model/BidModel';
import BiddingHistory from './BiddingHistory/BiddingHistory';

import useStyles from './styles';
import Header from '../../Header';
import { useStateValue } from '../../StateProvider';

export default function ShowAuction(props) {
  const [auctionData, setAuctionData] = useState();
  const [bidData, setBidData] = useState([{}]);
  const [highestBid, setHighestBid] = useState();
  const { id } = props.match.params;
  const [{ loggedinuser }, dispatch] = useStateValue();
  const classes = useStyles();
  const [bidAmount, setBidAmount] = useState();
  const [bidIsMade, setBidIsMade] = useState(false);
  const [isTextFieldError, setIsTextFieldError] = useState(false);
  const [textFieldErrorMsg, setTextFieldErrorMsg] = useState('');
  const [deleteAuctionMsg, setDeleteAuctionMsg] = useState('');

  const fetchAuctionData = async (id) => {
    const fetchedAuction = await getById(id);
    setAuctionData(fetchedAuction);
  };

  const fetchBidData = async (id) => {
    const fetchedBid = await getBidByAuctionId(id);
    setBidData(fetchedBid);
  };

  const handleInsertBid = async (obj) => {
    insertBid(obj);
  };

  useEffect(() => {
    if (bidData.length > 0) {
      setHighestBid(bidData[bidData.length - 1]?.Summa);
    } else {
      setHighestBid(0);
    }
  }, [bidData]);

  const handleBid = async () => {
    console.log('bidamount', bidAmount);
    console.log('highestBid', highestBid);
    if (loggedinuser.email != auctionData.SkapadAv) {
      if (loggedinuser.email != bidData[bidData.length - 1]?.Budgivare) {
        if (bidAmount > highestBid) {
          if (bidAmount >= auctionData.Utropspris) {
            const randomBidId = Math.floor(Math.random() * 10000);
            const bidObj = new BidModel(
              randomBidId,
              bidAmount,
              auctionData.AuktionID,
              loggedinuser.email
            );
            setBidData(bidData.concat(bidObj));
            setBidIsMade(true);
            setHighestBid(bidAmount);
            handleInsertBid(bidObj);
            document.getElementById('filled-basic').value = '';
          } else {
            setIsTextFieldError(true);
            setTextFieldErrorMsg('Budet måste vara högre än utropspriset');
          }
        } else {
          setIsTextFieldError(true);
          setTextFieldErrorMsg('Budet måste vara högre än det ledande budet');
        }
      } else {
        setIsTextFieldError(true);
        setTextFieldErrorMsg('Du leder redan budgivningen');
      }
    } else {
      setIsTextFieldError(true);
      setTextFieldErrorMsg('Du får inte buda på din eget objekt');
    }
  };

  const handleDeleteAuction = () => {
    deleteById(auctionData.AuktionID);
    setDeleteAuctionMsg('Auktionen är borttagen. Lämna den här sidan.');
  };

  useEffect(() => {
    if (props.location.auctionObj != null) {
      setAuctionData(props.location.auctionObj);
    } else {
      fetchAuctionData(id);
    }
  }, []);

  useEffect(() => {
    if (auctionData != null) {
      fetchBidData(auctionData.AuktionID);
    }
  }, [auctionData]);

  return !auctionData ? (
    <p>Datan laddas</p>
  ) : (
    <div className={classes.root}>
      <Header />
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item lg={7}>
            <Paper className={classes.paper} elevation={8}>
              <Grid container>
                <Grid item lg={12}>
                  <Typography align="left" variant="h5">
                    {auctionData.Titel}
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <br />
                  <Typography variant="h6">Objektbeskrivning</Typography>
                  <Typography align="left" variant="body2">
                    {auctionData.Beskrivning}
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item lg={12}>
                    <br />
                    <Typography variant="subtitle2">Skapad</Typography>
                    <Typography>{auctionData.StartDatum}</Typography>
                    <Typography variant="subtitle2">Skapad av</Typography>
                    <Typography>{auctionData.SkapadAv}</Typography>
                    <Typography variant="subtitle2">AuktionsId</Typography>
                    <Typography>{auctionData.AuktionID}</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    {loggedinuser?.email === auctionData.SkapadAv &&
                    bidData.length < 1 ? (
                      <Button variant="contained" onClick={handleDeleteAuction}>
                        Ta bort auktion
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item lg={12}>
                    <Typography color="error" variant="h5">
                      {deleteAuctionMsg}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={5}>
            <Paper className={classes.paper} elevation={8}>
              <Grid container>
                <Grid item xs={4} md={4} lg={3}>
                  <Typography color="primary">Ledande bud</Typography>
                  {bidData.length > 0 ? (
                    <Typography color="primary">{highestBid} kr</Typography>
                  ) : (
                    <Typography variant="subtitle2">Inga bud ännu</Typography>
                  )}
                </Grid>
                <Grid item xs={4} md={4} lg={3}>
                  <Typography color="primary">Utropspris</Typography>
                  <Typography color="primary">
                    {auctionData.Utropspris} kr
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4} lg={6}>
                  <Typography color="primary">Slutdatum</Typography>
                  <Typography color="primary">
                    {auctionData.SlutDatum}
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <br />
                  <Typography variant="h6" color="primary">
                    Lägg ett bud
                  </Typography>
                  <>
                    {!loggedinuser ? (
                      <Typography>Logga in för att lägga ett bud</Typography>
                    ) : (
                      <form className={classes.bidForm}>
                        <Grid container>
                          <Grid item lg={6}>
                            <TextField
                              error={isTextFieldError}
                              id="filled-basic"
                              variant="filled"
                              label="kr"
                              type="number"
                              helperText="Kom ihåg att alla bud är bindande"
                              onChange={(e) => {
                                setIsTextFieldError(false);
                                setBidAmount(e.target.value);
                              }}
                            />

                            {isTextFieldError ? (
                              <Typography color="error">
                                {textFieldErrorMsg}
                              </Typography>
                            ) : (
                              <> </>
                            )}
                          </Grid>
                          <Grid item lg={2}>
                            <>
                              {bidIsMade ? (
                                <Typography color="success">
                                  Du leder budgivningen!
                                </Typography>
                              ) : (
                                <></>
                              )}
                            </>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Button variant="contained" onClick={handleBid}>
                            LÄGG BUD
                          </Button>
                        </Grid>
                      </form>
                    )}
                  </>
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid container>
                <Grid item lg={12}>
                  <Typography variant="h5">Budhistorik</Typography>
                  <Typography variant="subtitle2">
                    Visar endast de 5 senaste buden
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <BiddingHistory bidData={bidData} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
