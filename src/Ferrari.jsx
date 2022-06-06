
import React, { Component, Fragment,useState } from 'react';

import './App.css';
import Lenderform from './Lenderform';
import FerrariLenderBlocks from './FerrariLenderBlocks';
import Validatorform from './Validatorform';
import {Container, Row, Col} from 'react-bootstrap';
import PorscheBlocks from './PorscheBlocks';
import Header from './Component/Header';
import Footer from './Component/Footer';


function Ferrari() {
const [showFForm, setFForm] = useState(false);
  const handleSubmit = ( showFForm) => {

        setFForm(showFForm);
    }
 if(!showFForm){

  return (


    <div className="App">
      <Container fluid className="App-header">
         <Header    type="3"/>
      </Container>
      <Container className="vh-100">

        <Row>
          <Col>

    <FerrariLenderBlocks onSubmitLenderForm={handleSubmit}/>
          </Col>
        </Row>

        </Container>
         <Container fluid className="no-gutter">
                 <Footer type="3"/>
              </Container>

            </div>
            )
            }else{
             return (
                            <div className="App">
                                  <Container fluid className="App-header">
                                     <Header type="3"/>
                                  </Container>
                                  <Container>
                            <Row>
                              <Col>
                               <Lenderform type="3" onSubmitLenderForm={handleSubmit}/>
                              </Col>
                            </Row>
                            </Container>
                                     <Container fluid className="no-gutter">
                                             <Footer type="2" />
                                          </Container>

                                        </div>
                            )
            }




}

export default Ferrari;

