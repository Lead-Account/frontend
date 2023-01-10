import React from "react";
import MaterialTable from 'material-table'
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";


const UsersTable = () => {
    const [products, setProducts] = useState([]);
    
    const columns = [
        { title: "Month", field: "Month" },
        { title: "LoanNo", field: "LoanNo" },
        { title: "Custname", field: "Custname" },
        { title: "DisbDate", field: "DisbDate" },
        { title: "LoanApplied", field: 'LoanApplied' },
        { title: "LoanAmt", field: 'LoanAmt' },
        { title: "Remark1", field: 'Remark1' },
        { title: "DisbCity", field: 'DisbCity' },
        { title: "ActualDibursalMonth", field: 'ActualDibursalMonth' },
        { title: "MatchQfile", field: 'MatchQfile' },
        { title: "Confirmwith", field: 'Confirmwith' },
        { title: "Remark2", field: 'Remark2' },
        { title: "BankNBFCName", field: 'BankNBFCName' },
        { title: "Product", field: 'Product' },
        { title: "Rate", field: 'Rate' },
        { title: "Subvention", field: 'Subvention' },
        { title: "Addition", field: 'Addition' },
        { title: "Payout", field: 'Payout' },
        { title: "GST", field: 'GST' },
        { title: "Cr", field: 'Cr' },
        { title: "PaymentMade", field: 'PaymentMade' },
        { title: "Balance", field: 'Balance' },
      ]
      
      const endpoint = "https://https://backend-cgizic7hi-lead-account.vercel.app/:9001/vendormis";
  const getData = async () => {
    await Axios.get(endpoint).then((response) => {
      const data = response.data;
      setProducts(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <MaterialTable
      title="Vendor MIS"
      columns={columns}
      data={products}
      options={{
        filtering: true,
      }}
    />
  );
};

export default UsersTable;
