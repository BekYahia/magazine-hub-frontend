import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AppDispatch, RootState, subscriptionsActions } from "@/store";

interface Props {
  id: number;
  price: number;
  user: any,
}

export default function SubscribeModel({ id, price, user}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [open, setOpen] = useState(false);

    // const magazineState = useSelector((state: RootState) => state.magazines)
    const subscriptionsState = useSelector((state: RootState) => state.subscriptions)
     
    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //     setOpen(false);
    // };

    const handleDelete = () => {
        dispatch(subscriptionsActions.subscribe({
          MagazineId: id,
          UserId: user.id,
          start_date: '2023-03-25',
          end_date: '2023-04-25',
        } ))
        .then(() => {
          //update the subscription list
          dispatch(subscriptionsActions.getSubscriptions())
        })

        setIsModalOpen(false)
    };


  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setIsModalOpen(true)}>
        Subscribe
      </Button>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Subscribe to a Magazine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Subscribe to this magazine for <b>${price}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} disabled={subscriptionsState.loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={subscriptionsState.loading}>
            {subscriptionsState.loading ? <CircularProgress size={50} /> : "Subscribe"}
          </Button>
        </DialogActions>
      </Dialog>
        
    
        {/* /TODO: notify the user with the response */}
      {/* <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert severity="success">response/reject</Alert>
      </Snackbar> */}
    </>
  );
}