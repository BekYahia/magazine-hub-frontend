
import { AppDispatch, RootState, magazinesActions } from "@/store";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscribeModel from "@/components/subscriptions/SubscribeModal";

const _options : MUIDataTableOptions = {
  filterType: 'checkbox',
};

export default function Magazines() {

  const dispatch = useDispatch<AppDispatch>()
  
  const magazines = useSelector((state: RootState) => state.magazines.magazines)
  const user = useSelector((state: RootState) => state.auth.user)

  const columns: any = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "is_active",
      label: "Is Active",
      options: {
          customBodyRender: (value: boolean) => value ? 'Yes' : 'No'
      },
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "publication_date",
      label: "Publication Date",
      options: {
        customBodyRender: (value: string) => value ? value : '-'
      }
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
          const id = tableMeta.rowData[0];
          const price = tableMeta.rowData[4];
          return (
            <>
              <SubscribeModel id={id} price={price} user={user} />
            </>
          );
        },
      },
    }
  ]

  useEffect(() => {  
    //fetch magazines if not already in state
    if (!magazines.length) dispatch(magazinesActions.getMagazines())
  }, [])

    return <MUIDataTable
        title={"Magazines"}
        data={magazines}
        columns={columns}
        options={_options}
    />
}
