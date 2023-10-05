
import { AppDispatch, RootState, subscriptionsActions } from "@/store";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelSubscribeModal from "@/components/subscriptions/CancelSubscribeModal";

const _options : MUIDataTableOptions = {
  filterType: 'checkbox',
};

export default function Subscriptions() {

  const dispatch = useDispatch<AppDispatch>()
  
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions)

  const columns: any = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "User",
      label: "User",
      options: {
        customBodyRender: (value: any) => value ? value?.name : '-'
      }
    },
    {
      name: "Magazine",
      label: "Magazine",
      options: {
        customBodyRender: (value: any) => {
          return <span>{value?.title}</span>
        }
      },
    },
    {
      name: "is_active",
      label: "Is Active",
      options: {
          customBodyRender: (value: boolean) => value ? 'Yes' : 'No'
      },
    },
    {
      name: "payment_status",
      label: "Payment Status",
    },
    {
      name: "updatedAt",
      label: "Updated At",
    },
    {
      name: "createdAt",
      label: "Created At",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        ..._options,
        customBodyRender: (_value: any, tableMeta: any) => {
          const magazine = tableMeta.rowData[2]; // tableMeta.rowData == the columns [] i defined above
          return <CancelSubscribeModal magazine={magazine} />
        },
      },
    }
  ]

  useEffect(() => {  
    //fetch subscriptions if not already in state
    if (!subscriptions.length) dispatch(subscriptionsActions.getSubscriptions())
  }, [])

    return <MUIDataTable
        title={"Subscriptions"}
        data={subscriptions}
        columns={columns}
        options={_options}
    />
}
