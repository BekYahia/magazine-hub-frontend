import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AppDispatch, RootState, subscriptionsActions } from "@/store";

interface MagazineProps {
	id: number;
	title: string;
	price: number;
}

export default function CancelSubscribeModel({ magazine }: { magazine: MagazineProps }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [open, setOpen] = useState(false);

    // const magazineState = useSelector((state: RootState) => state.magazines) 
	const subscriptionsState = useSelector((state: RootState) => state.subscriptions)
    const user = useSelector((state: RootState) => state.auth.user) as { id: number }
     
    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //     setOpen(false);
    // };

    const handleDelete = () => {
        dispatch(
          subscriptionsActions.cancelSubscription({MagazineId: magazine.id, UserId: user.id })
        ).then(() => {
			//update the subscription list
			dispatch(subscriptionsActions.getSubscriptions())
		})

        // setIsModalOpen(false)
    };


	const handleModalClose = () => setIsModalOpen(false);

	return (
	<>
		<Button variant="contained" color="secondary" onClick={() => setIsModalOpen(true)}>
		Cancel Subscription
		</Button>

		<Dialog open={isModalOpen} onClose={handleModalClose}>
		<DialogTitle>Subscribe to a Magazine</DialogTitle>
		<DialogContent>
			<DialogContentText>
			Are you sure you want to cancel Subscription from # { magazine.title }?
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleModalClose} disabled={subscriptionsState.loading}>
			Cancel
			</Button>
			<Button onClick={handleDelete} color="secondary" disabled={subscriptionsState.loading}>
			{subscriptionsState.loading ? <CircularProgress size={50} /> : "Cancel Subscription"}
			</Button>
		</DialogActions>

		{/* { subscriptionsState.error && <Alert severity="error">{subscriptionsState.error.message}</Alert> } */}
		
		</Dialog>


		{/* /TODO: notify the user with the response */}
		{/* <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
		<Alert severity="success">response/reject</Alert>
		</Snackbar> */}
	</>
	);
}