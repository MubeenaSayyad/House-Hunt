import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function AddProperty() {

   const navigate = useNavigate();

   const [image, setImage] = useState(null);

   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: '',
      additionalInfo: ''
   });

   const handleImageChange = (e) => {
      setImage(e.target.files);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   useEffect(() => {
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         propertyImages: image,
      }));
   }, [image]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!propertyDetails.propertyAddress || !propertyDetails.ownerContact || !propertyDetails.propertyAmt) {
         message.error("Please fill all required fields");
         return;
      }

      const formData = new FormData();
      formData.append('propertyType', propertyDetails.propertyType);
      formData.append('propertyAdType', propertyDetails.propertyAdType);
      formData.append('propertyAddress', propertyDetails.propertyAddress);
      formData.append('ownerContact', propertyDetails.ownerContact);
      formData.append('propertyAmt', propertyDetails.propertyAmt);
      formData.append('additionalInfo', propertyDetails.additionalInfo);

      if (image) {
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }
      }

      try {
         const res = await axios.post(
            'http://localhost:8001/api/owner/postproperty',
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'multipart/form-data',
               }
            }
         );

         if (res.data.success) {
            message.success("Property Added Successfully 🎉");

            // ✅ redirect to owner home
            navigate("/ownerhome");

         } else {
            message.error(res.data.message);
         }

      } catch (error) {
         console.error('Error adding property:', error);
         message.error("Something went wrong");
      }
   };

   return (
      <Container style={{ border: '1px solid lightblue', borderRadius: '5px', padding: '30px', marginTop: "40px" }}>
         <h3 className="mb-4 text-center">Add New Property</h3>

         <Form onSubmit={handleSubmit}>

            <Row className="mb-3">

               <Form.Group as={Col} md="4">
                  <Form.Label>Property type</Form.Label>
                  <Form.Select name='propertyType' value={propertyDetails.propertyType} onChange={handleChange}>
                     <option value="residential">Residential</option>
                     <option value="commercial">Commercial</option>
                     <option value="land/plot">Land/Plot</option>
                  </Form.Select>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Label>Property Ad type</Form.Label>
                  <Form.Select name='propertyAdType' value={propertyDetails.propertyAdType} onChange={handleChange}>
                     <option value="rent">Rent</option>
                     <option value="sale">Sale</option>
                  </Form.Select>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Label>Property Full Address</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Address"
                     required
                     name='propertyAddress'
                     value={propertyDetails.propertyAddress}
                     onChange={handleChange}
                  />
               </Form.Group>

            </Row>

            <Row className="mb-3">

               <Form.Group as={Col} md="6">
                  <Form.Label>Property Images</Form.Label>
                  <Form.Control
                     type="file"
                     accept="image/*"
                     multiple
                     onChange={handleImageChange}
                  />
               </Form.Group>

               <Form.Group as={Col} md="3">
                  <Form.Label>Owner Contact No.</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Contact number"
                     required
                     name='ownerContact'
                     value={propertyDetails.ownerContact}
                     onChange={handleChange}
                  />
               </Form.Group>

               <Form.Group as={Col} md="3">
                  <Form.Label>Property Amount</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Amount"
                     required
                     name='propertyAmt'
                     value={propertyDetails.propertyAmt}
                     onChange={handleChange}
                  />
               </Form.Group>

            </Row>

            <FloatingLabel
               label="Additional details for the Property"
               className="mt-3"
            >
               <Form.Control
                  name='additionalInfo'
                  value={propertyDetails.additionalInfo}
                  onChange={handleChange}
                  as="textarea"
                  style={{ height: '100px' }}
               />
            </FloatingLabel>

            <div className="text-center mt-4">
               <Button variant='primary' type="submit">
                  Submit Property
               </Button>
            </div>

         </Form>
      </Container>
   );
}

export default AddProperty;