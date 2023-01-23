import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import * as xlsx from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DuplicateData = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const columns = [
    { title: "Month", field: "Month" },
    { title: "LoanNo", field: "LoanNo" },
    { title: "Custname", field: "Custname" },
    { title: "DisbDate", field: "DisbDate" },
    { title: "LoanApplied", field: "LoanApplied" },
    { title: "LoanAmt", field: "LoanAmt" },
    { title: "Remark1", field: "Remark1" },
    { title: "DisbCity", field: "DisbCity" },
    { title: "ActualDibursalMonth", field: "ActualDibursalMonth" },
    { title: "MatchQfile", field: "MatchQfile" },
    { title: "Confirmwith", field: "Confirmwith" },
    { title: "Remark2", field: "Remark2" },
    { title: "BankNBFCName", field: "BankNBFCName" },
    { title: "Product", field: "Product" },
    { title: "Rate", field: "Rate" },
    { title: "Subvention", field: "Subvention" },
    { title: "Addition", field: "Addition" },
    { title: "Payout", field: "Payout" },
    { title: "GST", field: "GST" },
    { title: "Cr", field: "Cr" },
    { title: "PaymentMade", field: "PaymentMade" },
    { title: "Balance", field: "Balance" }
  ];

  const endpoint = "https://backend-orpin-eight.vercel.app/duplicatedatalist";
  const getData = async () => {
    await Axios.get(endpoint).then((response) => {
      const data = response.data;
      setProducts(data);
      setLoader(true);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const downloadExcel = () => {
    const newData = products.map((row) => {
      delete row.tableData;
      return row;
    });
    const worksheet = xlsx.utils.json_to_sheet(products);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, worksheet, "Bankmis");
    let buf = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
    xlsx.writeFile(workBook, "bankmis.xlsx");
  };
  return (
    <>
      {loader ? (
        <MaterialTable
          title="Bank MIS"
          columns={columns}
          data={products}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            pageSize: 8,
            pageSizeOptions: [8, 12, 20, 50],
            maxBodyHeight: 580,
          }}
          actions={[
            {
              icon: () => (
                <button style={{ border: "none", background: "transparent" }}>
                  <FileDownloadIcon />
                </button>
              ),
              tooltip: "Export to Excel",
              onClick: () => downloadExcel(),
              isFreeAction: true,
            },
          ]}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DuplicateData;
