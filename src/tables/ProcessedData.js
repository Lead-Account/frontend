import React from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";


export default function ProcessedData() {
  const url = "https://backend-seven-sigma.vercel.app/processdatatable";
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((resp) => {
        setRows(resp);
        setLoader(true);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Month</TableCell>
            <TableCell >LoanNo</TableCell>
            <TableCell >Custname</TableCell>
            <TableCell >DisbDate</TableCell>
            <TableCell >LoanApplied</TableCell>
            <TableCell >LoanAmt</TableCell>
            <TableCell >Remark1</TableCell>
            <TableCell >DisbCity</TableCell>
            <TableCell >ActualDibursalMonth</TableCell>
            <TableCell >MatchQfile</TableCell>
            <TableCell >Confirmwith</TableCell>
            <TableCell >Remark2</TableCell>
            <TableCell >BankNBFCName</TableCell>
            <TableCell >Product</TableCell>
            <TableCell >Rate</TableCell>
            <TableCell >Subvention</TableCell>
            <TableCell >Addition</TableCell>
            <TableCell >Payout</TableCell>
            <TableCell >GST</TableCell>
            <TableCell >Cr</TableCell>
            <TableCell >PaymentMade</TableCell>
            <TableCell >Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{item.Month}</TableCell>
                <TableCell>{item.LoanNo}</TableCell>
                <TableCell>{item.Custname}</TableCell>
                <TableCell>{item.DisbDate}</TableCell>
                <TableCell>{item.LoanApplied}</TableCell>
                <TableCell>{item.LoanAmt}</TableCell>
                <TableCell>{item.Remark1}</TableCell>
                <TableCell>{item.DisbCity}</TableCell>
                <TableCell>{item.ActualDibursalMonth}</TableCell>
                <TableCell>{item.MatchQfile}</TableCell>
                <TableCell>{item.Confirmwith}</TableCell>
                <TableCell>{item.Remark2}</TableCell>
                <TableCell>{item.BankNBFCName}</TableCell>
                <TableCell>{item.Product}</TableCell>
                <TableCell>{item.Rate}</TableCell>
                <TableCell>{item.Subvention}</TableCell>
                <TableCell>{item.Addition}</TableCell>
                <TableCell>{item.Payout}</TableCell>
                <TableCell>{item.GST}</TableCell>
                <TableCell>{item.Cr}</TableCell>
                <TableCell>{item.PaymentMade}</TableCell>
                <TableCell>{item.Balance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Bank MIS
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>AddiSubvAmt</TableCell>
                            <TableCell>AddiSubvPayout</TableCell>
                            <TableCell>Amt</TableCell>
                            <TableCell>BankNBFCName</TableCell>
                            <TableCell>BillDate</TableCell>
                            <TableCell>BillNo</TableCell>
                            <TableCell>BilledOn</TableCell>
                            <TableCell>CircleCluster</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>CustomerIDAPAC</TableCell>
                            <TableCell>CustomerName</TableCell>
                            <TableCell>DisbDate</TableCell>
                            <TableCell>DisbLoanAmount</TableCell>
                            <TableCell>FinalRate</TableCell>
                            <TableCell>GST</TableCell>
                            <TableCell>GSTstatus</TableCell>
                            <TableCell>InsuranceAmt</TableCell>
                            <TableCell>LOSnoAPACReff</TableCell>
                            <TableCell>LoanAcNo</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>PaidRate</TableCell>
                            <TableCell>PayoutRate</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Proper</TableCell>
                            <TableCell>ReceivedAmt</TableCell>
                            <TableCell>ReceivedDate</TableCell>
                            <TableCell>Remark</TableCell>
                            <TableCell>SrNo</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>SubProduct</TableCell>
                            <TableCell>TME</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>VLIAddPayouton</TableCell>
                            <TableCell>diff</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.bankmis.map((historyRow) => (
                            <TableRow key={historyRow.Id}>
                              <TableCell>
                                {historyRow.AddiSubvAmt}
                              </TableCell>
                              <TableCell>
                                {historyRow.AddiSubvPayout}
                              </TableCell>
                              <TableCell>
                                {historyRow.Amt}
                              </TableCell>
                              <TableCell>
                                {historyRow.BankNBFCName}
                              </TableCell>
                              <TableCell>
                                {historyRow.BillDate}
                              </TableCell>
                              <TableCell>
                                {historyRow.BillNo}
                              </TableCell>
                              <TableCell>
                                {historyRow.BilledOn}
                              </TableCell>
                              <TableCell>
                                {historyRow.CircleCluster}
                              </TableCell>
                              <TableCell>
                                {historyRow.City}
                              </TableCell>
                              <TableCell>
                                {historyRow.CustomerIDAPAC}
                              </TableCell>
                              <TableCell>
                                {historyRow.CustomerName}
                              </TableCell>
                              <TableCell>
                                {historyRow.DisbDate}
                              </TableCell>
                              <TableCell>
                                {historyRow.DisbLoanAmount}
                              </TableCell>
                              <TableCell>
                                {historyRow.FinalRate}
                              </TableCell>
                              <TableCell>
                                {historyRow.GST}
                              </TableCell>
                              <TableCell>
                                {historyRow.GSTstatus}
                              </TableCell>
                              <TableCell>
                                {historyRow.InsuranceAmt}
                              </TableCell>
                              <TableCell>
                                {historyRow.LOSnoAPACReff}
                              </TableCell>
                              <TableCell>
                                {historyRow.LoanAcNo}
                              </TableCell>
                              <TableCell>
                                {historyRow.Month}
                              </TableCell>
                              <TableCell>
                                {historyRow.PaidRate}
                              </TableCell>
                              <TableCell>
                                {historyRow.PayoutRate}
                              </TableCell>
                              <TableCell>
                                {historyRow.Product}
                              </TableCell>
                              <TableCell>
                                {historyRow.Proper}
                              </TableCell>
                              <TableCell>
                                {historyRow.ReceivedAmt}
                              </TableCell>
                              <TableCell>
                                {historyRow.ReceivedDate}
                              </TableCell>
                              <TableCell>
                                {historyRow.Remark}
                              </TableCell>
                              <TableCell>
                                {historyRow.SrNo}
                              </TableCell>
                              <TableCell>
                                {historyRow.State}
                              </TableCell>
                              <TableCell>
                                {historyRow.SubProduct}
                              </TableCell>
                              <TableCell>
                                {historyRow.TME}
                              </TableCell>
                              <TableCell>
                                {historyRow.Team}
                              </TableCell>
                              <TableCell>
                                {historyRow.Total}
                              </TableCell>
                              <TableCell>
                                {historyRow.VLIAddPayouton}
                              </TableCell>
                              <TableCell>
                                {historyRow.diff}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}