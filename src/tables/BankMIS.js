import React from "react";
import MaterialTable from 'material-table'
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import * as xlsx from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const BankMIS = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const columns = [
        { title: "SrNo", field: "SrNo" },
        { title: "Month", field: "Month" },
        { title: "LoanAcNo", field: "LoanAcNo" },
        { title: "CustomerIDAPAC", field: "CustomerIDAPAC" },
        { title: "LOSnoAPACReff", field: 'LOSnoAPACReff' },
        { title: "CustomerName", field: 'CustomerName' },
        { title: "DisbDate", field: 'DisbDate' },
        { title: "DisbLoanAmount", field: 'DisbLoanAmount' },
        { title: "InsuranceAmt", field: 'InsuranceAmt' },
        { title: "VLIAddPayouton", field: 'VLIAddPayouton' },
        { title: "PayoutRate", field: 'PayoutRate' },
        { title: "AddiSubvPayout", field: 'AddiSubvPayout' },
        { title: "AddiSubvAmt", field: 'AddiSubvAmt' },
        { title: "City", field: 'City' },
        { title: "CircleCluster", field: 'CircleCluster' },
        { title: "State", field: 'State' },
        { title: "PaidRate", field: 'PaidRate' },
        { title: "Team", field: 'Team' },
        { title: "TME", field: 'TME' },
        { title: "Remark", field: 'Remark' },
        { title: "GSTstatus", field: 'GSTstatus' },
        { title: "BilledOn", field: 'BilledOn' },
        { title: "BankNBFCName", field: 'BankNBFCName' },
        { title: "Product", field: 'Product' },
        { title: "SubProduct", field: 'SubProduct' },
        { title: "Amt", field: 'Amt' },
        { title: "GST", field: 'GST' },
        { title: "Total", field: 'Total' },
        { title: "BillNo", field: 'BillNo' },
        { title: "BillDate", field: 'BillDate' },
        { title: "ReceivedDate", field: 'ReceivedDate' },
        { title: "Proper", field: 'Proper' },
        { title: "ReceivedAmt", field: 'ReceivedAmt' },
        { title: "diff", field: 'diff' },
        { title: "FinalRate", field: 'FinalRate' },
        { title: "PaidRate", field: 'PaidRate' },
      ]
      
      const endpoint = "http://127.0.0.1:9001/bankmisdata";
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
        // headerStyle: {
        //   whiteSpace: 'nowrap',
        // }
      }}
      actions={[
        {
          icon: () => <button style={{ border: "none", background: "transparent" }}>
          <FileDownloadIcon />
        </button>,
          tooltip: "Export to Excel",
          onClick: () => downloadExcel(),
          isFreeAction: true,
        }
      ]}
    />) : (
      <Loading />
    )}
    </>
  );
};

export default BankMIS;
