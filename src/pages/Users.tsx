
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options : MUIDataTableOptions = {
  filterType: 'checkbox',
};

export default function Users() {
    return <MUIDataTable
        title={"Users"}
        data={data}
        columns={columns}
        options={options}
    />
}
