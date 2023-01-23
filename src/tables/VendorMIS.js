import React from "react";
import MaterialTable from "material-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Modal, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import * as xlsx from "xlsx";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDuplicate } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { GoSettings } from "react-icons/go" 
import { HiPencilSquare } from "react-icons/hi2";
import { TbArrowsRightLeft } from "react-icons/tb";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FiArrowRight } from "react-icons/fi";

const VendorMIS = () => {
  const [loader, setLoader] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // CURD Operations

  const columns = [
    { title: "Business Month", field: "Month" },
    { title: "Loan No", field: "LoanNo" },
    { title: "Customer name", field: "Custname" },
    { title: "Disb Date", field: "DisbDate" },
    { title: "Loan Applied", field: "LoanApplied" },
    { title: "Loan Amt", field: "LoanAmt" },
    { title: "Disb City", field: "DisbCity" },
    { title: "BankNBFCName", field: "BankNBFCName" },
    { title: "Product", field: "Product" },
    { title: "Rate", field: "Rate" },
    { title: "Subvention", field: "Subvention" },
    { title: "Addition", field: "Addition" },
    { title: "Payout Amount", field: "Payout" },
    { title: "Confirmwith", field: "Confirmwith" },
    { title: "UnConfirmwith", field: "" },
    { title: "Memo", field: "" },
    { title: "ActualDibursalMonth", field: "ActualDibursalMonth" },
    { title: "Branch Head", field: "Month" },
    { title: "vendor Name", field: "" },
  ];

  const initialTutorialState = {
    id: null,
    Month: "",
    LoanNo: "",
    Custname: "",
    DisbDate: "",
    LoanApplied: "",
    LoanAmt: "",
    DisbCity: "",
    BankNBFCName: "",
    Product: "",
    Rate: "",
    Subvention: "",
    Addition: "",
    Payout: "",
    Confirmwith: "",
    ActualDibursalMonth: "",
  };

  const { LoanNo } = useParams();
  const { id } = useParams();

  const endpoint = "https://backend-orpin-eight.vercel.app/vendormis";

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);

  const [tutorials, setTutorials] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [processData, setprocessData] = useState([]);

  const getAll = () => {
    return axios.get(endpoint);
  };

  const [process, setProcess] = useState([]);

  useEffect(() => {
    axios.get("https://backend-orpin-eight.vercel.app/vendormis").then((response) => {
      setProcess(response);
      setLoader(true);
    });
  }, []);

  const get = (id) => {
    return axios.get(`https://backend-orpin-eight.vercel.app/getonevendor/${id}`);
  };

  const getTutorial = (id) => {
    get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const update = (LoanNo, data) => {
    return axios.put(`https://backend-orpin-eight.vercel.app/vendormis/${LoanNo}`, data);
  };

  const retrieveTutorials = () => {
    getAll()
      .then((response) => {
        setTutorials(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const updateTutorial = () => {
    update(currentTutorial.LoanNo, currentTutorial)
      .then((response) => {
        alert("Updated Succesfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const remove = (id) => {
    return axios.delete(`https://backend-orpin-eight.vercel.app/vendormis/${id}`);
  };

  const deleteTutorial = () => {
    remove(currentTutorial.id)
      .then((response) => {
        alert("Deleted Succesfully!");
        // console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const duplicateData = (id) => {
    return axios.get(`https://backend-orpin-eight.vercel.app/duplicatedata/${id}`);
  };

  const duplicateDataCall = (id) => {
    duplicateData(id)
      .then((response) => {
        alert("Successfully Added To Duplicate!");
        // console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // End CURD Operations

  // PopUp
  const [open, setOpen] = useState(false);

  const [openShow, setOpenShow] = useState(false);

  const [bankMisPopup, setBankMisPopup] = useState(false);

  const [editModelOpen, setEditModelOpen] = useState(false);

  const [processModelOpen, setProcessModelOpen] = useState(false);

  const [deleteModelOpen, setDeleteModelOpen] = useState(false);

  const [popUp, setPopUp] = useState({});

  const [popUpBank, setPopUpBank] = useState({});

  const handleOpen = (e) => {
    setOpen(true);
    setPopUp(e);
  };

  const handleOpenEditModel = (e) => {
    setEditModelOpen(true);
    setPopUp(e);
  };

  const handleOpenProcessModel = (e) => {
    setProcessModelOpen(true);
    setPopUp(e);
  };

  const handleOpenDeleteModel = (e) => {
    setDeleteModelOpen(true);
    setPopUp(e);
  };

  const handleClose = () => setOpen(false);

  const handleShowClose = () => setOpenShow(false);

  const handleCloseEditModel = () => setEditModelOpen(false);

  const handleCloseProcessModel = () => setProcessModelOpen(false);

  const handleCloseDeleteModel = () => setDeleteModelOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  // End PopUp

  const handleEdit = (rowData) => {
    getTutorial(rowData._id);
    handleOpenEditModel(rowData);
  };

  const downloadExcel = () => {
    const newData = tutorials.map((row) => {
      delete row.tableData;
      return row;
    });

    const worksheet = xlsx.utils.json_to_sheet(tutorials);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, worksheet, "Vendormis");
    let buf = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
    xlsx.writeFile(workBook, "vendormis.xlsx");
  };

  const [abc, setAbc] = useState([]);

  const getprocessdata = (id) => {
    return axios.get(`https://backend-orpin-eight.vercel.app/processdata/${id}`);
  };

  const getprocessdatas = (id) => {
    getprocessdata(id)
      .then((response) => {
        setAbc(response.data.bankmis);
        console.log(abc);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getprocessdatas(id);
  }, [id]);

  const [openProcessedData, setOpenProcessedData] = useState(false);
  const handleOpenProcessedData = (rowData) => {
    setOpenProcessedData(true);
    getprocessdatas(rowData);
  };

  const handleCloseProcess = () => {
    setOpenProcessedData(false);
  };

  const processedData = () => {
    axios.get("https://backend-orpin-eight.vercel.app/processdatas").then((response) => {
      alert("Data Processed!");
    });
  }

  return (
    <>
      {loader ? (
        <div className="vendor-table">
          <MaterialTable
            title="Vendor MIS"
            columns={columns}
            data={tutorials}
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
                icon: () => (
                  <>
                    <button className="horizontal-btn" disabled>
                    <GoSettings /> <span style={{ fontSize: "1rem", marginBottom: "12px" }} > Process All Data</span>
                    </button>
                  </>
                ),
                tooltip: "Process All Matched Data",
                onClick: () => processedData(),
                isFreeAction: true,
              },
              {
                icon: () => (
                  <>
                    <button className="horizontal-btn">
                      <AiOutlineDownload /><span style={{ fontSize: "1rem" }}>Export</span>
                    </button>
                  </>
                ),
                tooltip: "Export to Excel",
                onClick: () => downloadExcel(),
                isFreeAction: true,
              },
              {
                icon: () => (
                  <button className="action-roundbtn" style={{ color: "#057AC6" }}>
                    <AiOutlineEye />
                  </button>
                ),
                tooltip: "View",
                onClick: (event, rowData) => {
                  handleOpen(rowData);
                },
              },
              // {
              //   icon: () => (
              //     <button className="action-roundbtn" style={{ color: "#057AC6" }}>
              //       <FiArrowRight />
              //     </button>
              //   ),
              //   tooltip: "Process Data",
              //   onClick: (event, rowData) => {
              //     handleEdit(handleEdit(rowData));
              //   },
              // },
              {
                icon: () => (
                  <span className="switch-outer">
                    <button className="action-roundbtn switch-btn" style={{ color: "#2AAE92" }}>
                      <TbArrowsRightLeft />
                    </button>
                  </span>
                ),
                tooltip: "Matched Data With Bank MIS",
                onClick: (event, rowData) => {
                  handleOpenProcessedData(rowData._id);
                  console.log(rowData._id);
                  //handleProcessData(rowData._id);
                },
              },
              {
                icon: () => (
                  <button className="action-roundbtn">
                    <HiPencilSquare />
                  </button>
                ),
                tooltip: "edit",
                onClick: (event, rowData) => {
                  handleEdit(handleEdit(rowData));
                },
              },
              {
                icon: () => (
                  <button className="action-roundbtn" style={{ color: "red" }}>
                    <AiOutlineDelete />
                  </button>
                ),
                tooltip: "delete",
                onClick: (event, rowData) => {
                  handleOpenDeleteModel(rowData._id);
                },
              },
              {
                icon: () => (
                  <button className="action-roundbtn" style={{ color: "red" }}>
                    <BiDuplicate />
                  </button>
                ),
                tooltip: "Add to Duplicate",
                onClick: (event, rowData) => {
                  duplicateDataCall(rowData._id);
                },
              },
            ]}
          />
        </div>

      ) : (
        <Loading />
      )}
      {/* View Model */}
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ borderRadius: "5px", overflowY: "scroll" }}
        className="data-modal"
      >
        <Box sx={{ ...style, width: "70%" }} style={{ borderRadius: "5px" }}>
          <div className="popup-head">
            <h3>View Record</h3>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Month}
                  label="Business Month"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.LoanNo}
                  label="Loan No"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Custname}
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.DisbDate}
                  label="Disbursed Date"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.LoanApplied}
                  label="Loan Applied"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.LoanAmt}
                  label="Loan Amount"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.DisbCity}
                  label="Disbursed City"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.BankNBFCName}
                  label="Bank / NBFC Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Product}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Rate}
                  label="Rate"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Subvention}
                  label="Subvention"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Addition}
                  label="Addition"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Payout}
                  label="Payout Amount"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Confirmwith}
                  label="Confirm With"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.ActualDibursalMonth}
                  label="Actual Disbursed Month"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={popUp.Month}
                  label="Branch Head"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid
            container
            justify="flex-end"
            sx={{ justifyContent: "right", marginTop: "5%" }}
          >
            <Button onClick={handleClose} variant="outlined" color="error" className="close-btn">Close
            </Button>
          </Grid>
        </Box>
      </Modal>
      {/* End View Model */}

      {/* Edit Model */}
      <Modal
        open={editModelOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ borderRadius: "5px" }}
        className="data-modal"
      >
        <Box sx={{ ...style, width: "70%" }} style={{ borderRadius: "5px" }}>
          <div className="popup-head">
            <h3>Edit Record</h3>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Month"
                  name="Month"
                  value={currentTutorial.Month}
                  onChange={handleInputChange}
                  label="Business Month"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="LoanNo"
                  name="LoanNo"
                  value={currentTutorial.LoanNo}
                  onChange={handleInputChange}
                  label="Loan No"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Custname"
                  name="Custname"
                  value={currentTutorial.Custname}
                  onChange={handleInputChange}
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="DisbDate"
                  name="DisbDate"
                  value={currentTutorial.DisbDate}
                  onChange={handleInputChange}
                  label="Disbursed Date"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="LoanApplied"
                  name="LoanApplied"
                  value={currentTutorial.LoanApplied}
                  onChange={handleInputChange}
                  label="Loan Applied"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="LoanAmt"
                  name="LoanAmt"
                  value={currentTutorial.LoanAmt}
                  onChange={handleInputChange}
                  label="Loan Amount"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="DisbCity"
                  name="DisbCity"
                  value={currentTutorial.DisbCity}
                  onChange={handleInputChange}
                  label="Disbursed City"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="BankNBFCName"
                  name="BankNBFCName"
                  value={currentTutorial.BankNBFCName}
                  onChange={handleInputChange}
                  label="Bank / NBFC Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Product"
                  name="Product"
                  value={currentTutorial.Product}
                  onChange={handleInputChange}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Rate"
                  name="Rate"
                  value={currentTutorial.Rate}
                  onChange={handleInputChange}
                  label="Rate"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Subvention"
                  name="Subvention"
                  value={currentTutorial.Subvention}
                  onChange={handleInputChange}
                  label="Subvention"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Addition"
                  name="Addition"
                  value={currentTutorial.Addition}
                  onChange={handleInputChange}
                  label="Additions"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Payout"
                  name="Payout"
                  value={currentTutorial.Payout}
                  onChange={handleInputChange}
                  label="Payout"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Confirmwith"
                  name="Confirmwith"
                  value={currentTutorial.Confirmwith}
                  onChange={handleInputChange}
                  label="Confirm With"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="ActualDibursalMonth"
                  name="ActualDibursalMonth"
                  value={currentTutorial.ActualDibursalMonth}
                  onChange={handleInputChange}
                  label="Actual Disbursed Month"
                  variant="outlined"
                  fullWidth
                />
              </Item>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Month"
                  name="Month"
                  value={currentTutorial.Month}
                  onChange={handleInputChange}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Month"
                  name="Month"
                  value={currentTutorial.Month}
                  onChange={handleInputChange}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  id="Month"
                  name="Month"
                  value={currentTutorial.Month}
                  onChange={handleInputChange}
                />
              </Item>
            </Grid>
          </Grid> */}
          <Grid
            container
            justify="flex-end"
            sx={{ justifyContent: "right", marginTop: "5%" }}
          >
            <div>
              <Button
                sx={{ mr: 2 }}
                onClick={updateTutorial}
                variant="outlined"
                color="success"
                className="save-btn"
              >Save
              </Button>
              <Button onClick={handleCloseEditModel} variant="outlined" color="error" className="close-btn">Close
              </Button>
            </div>
          </Grid>
        </Box>
      </Modal>
      {/* End Edit Model */}

      {/* Delete Model */}
      <Modal
        open={deleteModelOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ borderRadius: "5px" }}
      >
        <Box sx={{ ...style, width: "20%" }} style={{ borderRadius: "5px" }}>
          <Grid
            container
            spacing={1}
            sx={{ alignContent: "center", justifyContent: "center" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Sure You Want to Delete ?
            </Typography>
            <div className="d-flex my-2">
              <Button
                sx={{ mr: 2, mt: 2 }}
                onClick={deleteTutorial}
                variant="outlined"
                className="delete-btn"
              >
                Delete
              </Button>
              <Button
                onClick={handleCloseDeleteModel}
                sx={{ mr: 2, mt: 2 }}
                variant="outlined" color="error" className="close-btn"
              >Close
              </Button>
            </div>
          </Grid>
        </Box>
      </Modal>
      {/* End Delete Model */}

      {/* Matched Data Model */}

      <Dialog
        open={openProcessedData}
        onClose={handleCloseProcess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bank MIS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 850 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">AddiSubvPayout</StyledTableCell>
                    <StyledTableCell align="right">Amt</StyledTableCell>
                    <StyledTableCell align="right">BankNBFCName</StyledTableCell>
                    <StyledTableCell align="right">BillDate</StyledTableCell>
                    <StyledTableCell align="right">BilledOn</StyledTableCell>
                    <StyledTableCell align="right">CircleCluster</StyledTableCell>
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">CustomerIDAPAC</StyledTableCell>
                    <StyledTableCell align="right">CustomerName</StyledTableCell>
                    <StyledTableCell align="right">DisbDate</StyledTableCell>
                    <StyledTableCell align="right">DisbLoanAmount</StyledTableCell>
                    <StyledTableCell align="right">FinalRate</StyledTableCell>
                    <StyledTableCell align="right">GST</StyledTableCell>
                    <StyledTableCell align="right">GSTstatus</StyledTableCell>
                    <StyledTableCell align="right">InsuranceAmt</StyledTableCell>
                    <StyledTableCell align="right">LOSnoAPACReff</StyledTableCell>
                    <StyledTableCell align="right">LoanAcNo</StyledTableCell>
                    <StyledTableCell align="right">Month</StyledTableCell>
                    <StyledTableCell align="right">PaidRate</StyledTableCell>
                    <StyledTableCell align="right">PayoutRate</StyledTableCell>
                    <StyledTableCell align="right">Product</StyledTableCell>
                    <StyledTableCell align="right">Proper</StyledTableCell>
                    <StyledTableCell align="right">ReceivedAmt</StyledTableCell>
                    <StyledTableCell align="right">ReceivedDate</StyledTableCell>
                    <StyledTableCell align="right">Remark</StyledTableCell>
                    <StyledTableCell align="right">SrNo</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    <StyledTableCell align="right">SubProduct</StyledTableCell>
                    <StyledTableCell align="right">TME</StyledTableCell>
                    <StyledTableCell align="right">Team</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">VLIAddPayouton</StyledTableCell>
                    <StyledTableCell align="right">diff</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(abc)}
                  {abc.map((c, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="right">
                        {c.AddiSubvPayout}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Amt}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.BankNBFCName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.BillDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.BilledOn}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.CircleCluster}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.City}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.CustomerIDAPAC}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.CustomerName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.DisbDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.DisbLoanAmount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.FinalRate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.GST}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.GSTstatus}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.InsuranceAmt}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.LOSnoAPACReff}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.LoanAcNo}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Month}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.PaidRate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.PayoutRate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Product}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Proper}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.ReceivedAmt}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.ReceivedDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Remark}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.SrNo}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.State}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.SubProduct}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.TME}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Team}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.Total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.VLIAddPayouton}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {c.diff}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProcess}>Close</Button>
        </DialogActions>
      </Dialog>



      {/* End Matched Data Model */}
    </>
  );
};

export default VendorMIS;
