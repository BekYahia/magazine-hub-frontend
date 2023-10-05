import { AppDispatch, RootState, authActions } from "@/store";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState ) => state.auth);

    return <>
        <h1>Home : { auth.isAuthy ? 'logged in' : 'not logged in' } </h1>

        <Button variant="contained" onClick={() => dispatch(authActions.logout())}>logout</Button>
        { auth.loading && <p>loading...</p> }

    </>;
}