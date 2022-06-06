import { FormattedMessage } from 'react-intl';
import React, { Component, Fragment, useState,useEffect } from 'react';
import { Row, Col,Button,Form,Image ,Table,Nav,OverlayTrigger,Tooltip, Modal, Container  } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


function PorscheBlocks(props) {

    // Declare a new state variable, which we'll call "count"
    const [mockResponse, setInput] = useState([]);
const [showSpinner, setSpinner] = useState(true);
const [showRequest, setRequest] = useState(false);
  useEffect(() => {
     let mounted = true;
     getData();
     return () => mounted = false;
   }, [])

  const getData = () => {

  fetch('http://localhost:50005/porscheblocks')
                                            .then(res => res.json())
                                            .then((data) => {
                                             fetch('http://localhost:50005/ferrariblocks')
                                              .then(res => res.json())
                                              .then((Fdata) => {
                                              data.forEach(function(d){
                                              const filterData = Fdata.filter(x=>x.LinearId === d.LinearId)
                                              if(filterData.length){
                                              d.SharedwithFerrari = true;
                                              }

                                             });
                                              setInput(data);
                                            })
                                              })
                                             .catch( err => {
                                               console.log(err);
                                              })

  }




const ShareWithFerrari = (linearId, e) => {
e.preventDefault();
 setSpinner(false);
const confirmed = window.confirm("Are you sure want to share this with Ferrari?");
if(confirmed){
                        const details = {

                                                    "linearId": linearId,
                                                    "partyName": "O=Ferrari Lender,L=Miami,C=US"
                                                  }


                       fetch('http://localhost:50005/ShareWithFerrari',  {
                                                                  method: 'POST',
                                                                  headers: {
                                                                    'Content-Type': 'application/json'
                                                                  },
                                                                  body: JSON.stringify(details)})
                                  .then(res => res.text)
                                  .then((data) => {
                                   setSpinner(true);
getData();
setRequest(true);
                                  })
                                   .catch( err => {
                                      err.text().then( errorMessage => {
                                        props.onSubmitLenderForm(false);
                                      })
                                    })
                                    }
                       }

    return (
    <div>
    <PendingRquest show={showRequest} onHide={() => setRequest(false)} data={mockResponse} sharewithferrari={ShareWithFerrari}></PendingRquest>
    <div className="title-bar">
        <h2 className="page-title">Dashboard</h2>

        <div className="link">

  <Nav className="me-auto">

                                           <Nav.Link href="#" onClick={event => setRequest(true)}>Pending Request</Nav.Link>



                                       </Nav>
                                       <Nav className="me-auto">

                                           <Nav.Link href="#" onClick={event => props.onSubmitLenderForm(true)}>New KYC</Nav.Link>



                                       </Nav>

                                       </div>
</div>
         <div className="overlay"  hidden={showSpinner}></div>
                            <div className="loader-box">
                <Spinner animation="border" role="status" hidden={showSpinner} >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>


        <div className="Form-Content">
           <h3 >KYC Profiles</h3>

            <div className="Form-Controls" >


<Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Address</th>

      <th>Vechicle Model</th>
      <th className="action-width">Action</th>
    </tr>
  </thead>


  <tbody>
  {mockResponse.map((data,i) => (
    <tr key={data.LinearId}>
      <td >{data.Name}</td>
      <td>{data.Address}</td>

      <td>{data.VehicleMake}</td>
      <td className="action-width">
      {data.Qualified == 'false' ? (

<OverlayTrigger
      placement="right"
         delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="sdasd">
          Pending Approval
        </Tooltip>
      }
    >
    <span className="action-icon-disable action-btn" tooltip="PendingForApproval">


                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>

                  </span>
                  </OverlayTrigger>

    ):

   (<OverlayTrigger
          placement="right"
             delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="sdasd">
              Approved
            </Tooltip>
          }
        >
        <span className="action-icon-disable action-btn" tooltip="PendingForApproval">


                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                   </svg>

                      </span>
                      </OverlayTrigger>)

    }


      </td>

    </tr>
))
}
  </tbody>


</Table>

            </div>
            </div>
            </div>);
}


function PendingRquest(props) {
 const [showMsg, setMsg] = React.useState(true);
    return (
        <Modal  scrollable={true}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
centered
        >
            <Modal.Header closeButton>
<Modal.Title id="contained-modal-title-vcenter">
                    KYC Requests
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>


        <Table striped bordered hover>


           <thead>
             <tr>
               <th>Name</th>
               <th>Address</th>

               <th>Vechicle Model</th>
                 <th>SSN</th>
                <th>Institution</th>
               <th >Action</th>
             </tr>
           </thead>


           <tbody>
<tr>
               <td >Kent Donald</td>
               <td>X-Cross Street</td>

               <td>SXF</td>
                <td>XXX-XX-3456</td>
                <td>Texla</td>
               <td >
               Approved
               </td>
               </tr>
               <tr>
                              <td >John Kept</td>
                              <td>X-Cross Street</td>

                              <td>SXF</td>
                               <td>XXX-XX-3456</td>
                               <td>Texla</td>
                              <td >
                              </td>
                              </tr>
           {

           props.data.map((data,i) => (
           i === (props.data.length-1) &&
             <tr key={data.LinearId}>
               <td >{data.Name}</td>
               <td>{data.Address}</td>

               <td>{data.VehicleMake}</td>
                <td>XXX-XX-1234</td>
                <td>Ferrari</td>
               <td >
               {
         !data.SharedwithFerrari ?(
         <OverlayTrigger
               placement="right"
                  delay={{ show: 250, hide: 400 }}
               overlay={
                 <Tooltip id="sdasd">
                   Share with Ferrari
                 </Tooltip>
               }
             >
                              <a  className="action-icon" onClick={(e)=> props.sharewithferrari(data.LinearId,e)}>

                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">

                                               <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>

                                           </svg>

                                           </a>
                                           </OverlayTrigger>

                             ):  <span className="action-icon-disable action-btn">
         <OverlayTrigger
                                      placement="right"
                                         delay={{ show: 250, hide: 400 }}
                                      overlay={
                                        <Tooltip id="sdasd">
                                          Shared with Ferrari
                                        </Tooltip>
                                      }
                                    >
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share Approved" viewBox="0 0 16 16">

                                                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>

                                              </svg>
         </OverlayTrigger>
                                              </span>  }


               </td>

             </tr>
         ))
         }
           </tbody>



        </Table>



                </Container>

            </Modal.Body>

        </Modal>
    );
}
export default PorscheBlocks;

