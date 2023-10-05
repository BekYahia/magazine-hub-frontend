import { AppDispatch, authActions } from "@/store";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();

    return <>
        <h1>Home, Welcome to Magazines Hub </h1>
        <Button variant="contained" onClick={() => dispatch(authActions.logout())}>logout</Button>
    </>;
}