import React from 'react'
import Paper from '@mui/material/Paper';
import { Player } from '@lottiefiles/react-lottie-player';
import uploadgif from '../../Assets/uploadFile.json';

const addCSV = (e) => {
    e.preventDefault()
    const input = document.getElementById('fileinput');
    console.log(input.files[0]);
    var formData = new FormData()
    formData.append('file', input.files[0])
    fetch('http://localhost:9001/uploadVendorCSV', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
        .then(data => {
            alert("CSV uploaded successfully");
        })
        .catch((e) => console.log(e))
}
export default function VendorUpload() {
    return (
        <>
            <Paper elevation={3} className="text-center" >
                <h3 className='text-center pt-4 mb-5'>Upload Vendor MIS (.csv file)</h3>
                <div style={{ minHeight: "300px", textAlign: "center", border: "2px dashed lightgray", width: "80%", margin: "auto", borderRadius: "10px" }}>
                    <form id="upload_form" enctype="multipart/form-data" name="file">
                        <div className='text-center'>
                            {/* <input type="file" id="fileinput" /> */}
                            <label htmlFor="fileinput">
                                <input name="" type="file" id="fileinput" hidden />
                                <Player autoplay loop src={uploadgif} style={{ height: '150px', width: '150px' }}></Player>
                                <h3 style={{color: '#8092ED'}}>Select (.csv) File to Upload</h3>
                            </label>
                        </div>
                        <button type="submit" className='upload-btn' onClick={addCSV}>Upload</button>
                    </form>
                </div>
            </Paper>
        </>
    )
}
