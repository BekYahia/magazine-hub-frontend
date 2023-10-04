import { RootState, authActions } from "@/store";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

    const dispatch = useDispatch();
    const is_auth = useSelector((state: RootState ) => state.auth.isAuthy);

    return <>
        <h1>Home : { is_auth ? 'logged in' : 'not logged in' } </h1>

        <Button variant="contained" onClick={() => dispatch(authActions.login())}>login</Button>
        <Button variant="contained" onClick={() => dispatch(authActions.logout())}>logout</Button>
    </>;
}