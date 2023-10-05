
import { AppDispatch, RootState, usersActions } from "@/store";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const options : MUIDataTableOptions = {
  filterType: 'checkbox',
};

export default function Users() {

  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)

  useEffect(() => {  
    //fetch users if not already in state
    if (!users.length) dispatch(usersActions.getUsers())
  }, [])


console.log(users)

    return <MUIDataTable
        title={"Users"}
        data={users}
        columns={["id", "name", "role", "updatedAt", "createdAt"]}
        options={options}
    />
}
