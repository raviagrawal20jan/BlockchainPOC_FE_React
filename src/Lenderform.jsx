
import React, { useState } from 'react';
import { Row, Col,Button,Form,Image, Nav, Alert, Modal, Container,Table   } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function Lenderform(props) {


const [showSpinner, setSpinner] = useState(true);
const [showAlert, setAlert] = useState(true);
    // Declare a new state variable, which we'll call "count"


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNbr, setPhoneNbr] = useState('');
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleStyle, setVehicleStyle] = useState('');

     const [modalShow, setModalShow] = React.useState(false);




     const [showPhoto, setPhoto] = useState(true);

                    const submit = (e) => {
                     e.preventDefault();
                     setSpinner(false);
                     const details =
                                               {

                                                   "partyName": "O=LexisNexis,L=Boston,C=US",

                                                   "name":firstName+' '+lastName,

                                                   "address":address,

                                                   "phoneNbr":phoneNbr,

                                                   "income":"123",

                                                   "vehicleMake":vehicleMake,

                                                   "vehicleModel":vehicleModel,

                                                   "vehicleStyle":vehicleStyle

                                               }


                    fetch('http://localhost:50005/StartKyc',  {
                                                               method: 'POST',
                                                               headers: {
                                                                 'Content-Type': 'application/json'
                                                               },
                                                               body: JSON.stringify(details)})
                               .then(res => res.text)
                               .then((data) => {
                               setSpinner(true);
                               setAlert(false);
                                 //props.onSubmitLenderForm(false,false,false);
                               })
                                .catch( err => {
                                   err.text().then( errorMessage => {
                                     props.onSubmitLenderForm(true, false);
                                   })
                                 })

                    }

    return (



    <div>
 <CheckKYC show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
        <div className="title-bar">
  <div className="link">

   <Nav className="me-auto">

       <Nav.Link href="#" onClick={event => setModalShow(true)}>Check for Existing KYC</Nav.Link>



   </Nav>

                                       </div>
                    <h2 className="page-title">KYC Form</h2>
                        <Alert  hidden={showAlert} variant="success" onClose={() => props.onSubmitLenderForm(false)} dismissible>
                                <Alert.Heading>Your KYC has been submitted.</Alert.Heading>

                              </Alert>
                    <div className="overlay"  hidden={showSpinner}></div>
                    <div className="loader-box">
        <Spinner animation="border" role="status" hidden={showSpinner} >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>


                </div>

        <div className="Form-Content">
            <div className="Form-Controls">
                <div className="firstDiv">
                    <Row>
                        <Col md={{ span: 5}}>
                        <Form>
                            <Row>
                                <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail" id="fname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="input" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail" id="lname" name="lname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="input" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                                </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail" id="Address" name="Address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="input" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail" id="phone" name="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="input" placeholder="Phone" onChange={(e) => setPhoneNbr(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail" id="VechicleMake" name="VechicleMake">
                                <Form.Label>Vechicle Make</Form.Label>
                                <Form.Control type="input" placeholder="Vechicle Make" onChange={(e) => setVehicleMake(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail" id="VechicleModel" name="VechicleModel">
                                <Form.Label>Vechicle Model</Form.Label>
                                <Form.Control type="input" placeholder="Vechicle Model" onChange={(e) => setVehicleModel(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" className="btn-primary mt-1" onClick={submit} type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Col>
                        <Col md={{ span: 6, offset: 1 }}>

                          <Form>
                                                     <Row>
                                                         <Col>
                                                         <Form.Group className="mb-3" controlId="formBasicEmail" id="fname">
                                                             <Form.Label>Date of Birth</Form.Label>
                                                             <Form.Control type="date"  placeholder="First Name" />
                                                         </Form.Group>
                                                         </Col>

                                                     </Row>
                                                     <Form.Group className="mb-3" controlId="formBasicEmail" id="Address" name="Address">
                                                         <Form.Label>SSN</Form.Label>
                                                         <Form.Control type="input" placeholder="SSN" />
                                                     </Form.Group>
                                                     <Form.Group className="mb-3" controlId="formBasicEmail" id="phone" name="phone">
                                                         <Form.Label>Upload Required Documents</Form.Label>
                                                         <Form.Control type="file" placeholder="Nationality" />
                                                     </Form.Group>
                                                     <Form.Group className="mb-3" controlId="formBasicEmail" id="VechicleMake" name="VechicleMake">
                                                         <Form.Label>Upload Your Photo</Form.Label>
                                                         <Form.Control type="file" placeholder="Vechicle Make" onChange={(e) => setPhoto(false)} />
                                                     </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicEmail" id="VechicleStyle" name="VechicleStyle">
                                <Form.Label>Vechicle Style</Form.Label>
                                <Form.Control type="input" placeholder="Vechicle Style" onChange={(e) => setVehicleStyle(e.target.value)}/>
                            </Form.Group>
                                                         <img src="photo.jpg" hidden={showPhoto} className="photo"/>


                                                 </Form>
                        </Col>

                    </Row>
                </div>
            </div>
        </div>
    </div>
            );
}


function CheckKYC(props) {
 const [showMsg, setMsg] = React.useState(true);
 const [requestMsg, setReqMsg] = React.useState(false);



    return (
        <Modal  scrollable={true}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pre Approved KYC Check
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>


        <Table striped bordered hover>

          <tbody>
            <tr>
<td>
<Form>
 <Form.Group className="mb-3" controlId="formBasicEmail" id="Address" name="Address">
                                                         <Form.Label>SSN</Form.Label>
                                                         <Form.Control type="input" placeholder="SSN" />
                                                     </Form.Group>
<Button variant="primary" className="btn-primary mt-1" onClick={(e) => setMsg(false)} >
                 Validate
             </Button>
                                                     </Form>
</td>
            </tr>
            <tr hidden={showMsg}>
            <td>
            <div >
            <ReuqestModal show={requestMsg} onHide={() => setReqMsg(false)}></ReuqestModal>
            <span className="congrates">Congratulations !!!</span> <span className="congrates-2">KYC against SSN XXXX456 is available at "PORSCHE".
            Please <a href="#" onClick={(e) => setReqMsg(true)}>click here</a> to contact "PORSCHE" for KYC details.
               <p> <a href="#">Terms & Conditions</a></p>
                </span></div>
            </td>
            </tr>

          </tbody>
        </Table>



                </Container>

            </Modal.Body>

        </Modal>
    );
}

function ReuqestModal(props) {
 const [showMsg, setMsg] = React.useState(true);
    return (
        <Modal  scrollable={true}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>

                <Container>


        <Table striped bordered hover>

          <tbody>

            <tr >
            <td>
            <div >Thank you for your interest. Request has been submitted to "PORSCHE".
            Soon "PORSCHE" will share the KYC details with you.</div>


            </td>
            </tr>

          </tbody>
        </Table>



                </Container>

            </Modal.Body>

        </Modal>
    );
}

export default Lenderform;

