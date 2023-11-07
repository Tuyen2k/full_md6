import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {findCity, findDistrict, findWard, saveMerchant} from "../service/MerchantService";
import {upImageFirebase} from "../firebase/Upfirebase";

function FormRegister() {
    let navigate = useNavigate();
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [image, setImage] = useState()
    const [merchant, setMerchant] = useState({
        activity: {
            id_activity: 3
        },
        name: '',
        phone: '',
        email: '',
        open_time: '',
        close_time: '',
        image: ''
    });
    const [address, setAddress] = useState({})

    const handleCreateMerchant = (e) => {
        upImageFirebase(image).then(r => {
            let registerMerchant = {...e, addressShop:address, image : r.name}
            console.log(registerMerchant)
            saveMerchant(registerMerchant).then(r => {
                    alert(r);
                    navigate('/register')
                }
            ).catch(e => {
                    navigate('/register')
                }
            )
        })
    }

    const handleInputChangeCity = (e) => {
        const fieldValue = e.target.value;
        findDistrict(fieldValue).then(r => {
            setDistrict(r)
            setAddress(x => {
                return {
                    ...x,
                    city: {
                        id_city: fieldValue
                    }
                };
            });
        }).catch(error => {
            alert("error district display")
        })
    }

    const handleInputChangeDistrict = (e) => {
        const fieldValue = e.target.value;
        findWard(fieldValue).then(r => {
            setWard(r)
            setAddress(x => {
                return {
                    ...x,
                    district: {
                        id_district: fieldValue
                    }
                };
            });
        }).catch(error => {
            alert("error ward display")
        })
    }

    const handleInputChangeWard = (e) => {
        const fieldValue = e.target.value;
        setAddress(x => {
            return {
                ...x,
                ward: {
                    id_ward: fieldValue
                }
            };
        });
    }

    const handleInputChangeImage = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        setImage(file)
    }

    useEffect(() => {
        findCity().then(r => {
            setCity(r)
        }).catch( error => {
            alert("error city display")
            }
        )
    }, []);

    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string()
            // .matches(/^0\d{9}$/, "Phone number must have 10 digits")
            .required(),
        email: yup.string().matches(/^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]{2,}$/,("with @ and no special characters")),
        open_time: yup.string().required(),
        close_time: yup.string().required()
    });

    return (
        <MDBContainer className="my-4">

            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='5'>
                        <MDBCardImage style={{height: '800px'}}
                                      src='https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9'
                                      alt="register form" className='rounded-start w-100'/>
                    </MDBCol>

                    <MDBCol md='7'>
                        <MDBCardBody className='d-flex flex-column'>

                            <h5 className="fw-normal my-4 pb-3"
                                style={{letterSpacing: '1px', fontWeight: 'bolder', textAlign :"center" }}>Register Merchant</h5>

                            <div style={{width: "500px", margin: 'auto'}}>
                                <Formik initialValues={merchant} onSubmit={(e)=>handleCreateMerchant(e)}
                                        validationSchema={schema}>
                                    <Form>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <Field className="form-control" name="name"/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <Field type="text   " className="form-control" name="phone"/>
                                            <ErrorMessage name="phone" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <Field type="email" className="form-control" name="email"/>
                                            <ErrorMessage name="email" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Open Time</label>
                                            <Field type="time" className="form-control" name="open_time"/>
                                            <ErrorMessage name="open_time" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Close Time</label>
                                            <Field type="time" className="form-control" name="close_time"/>
                                            <ErrorMessage name="close_time" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <div className="row">
                                                <select onChange={handleInputChangeCity} className="form-select col-4">
                                                    <option>-----City-----</option>
                                                    {city && city.map(item => (
                                                        <option value={item.id_city}>{item.name}</option>
                                                    ))}
                                                </select>
                                                <select onChange={handleInputChangeDistrict} className="form-select col-4">
                                                    <option>-----District-----</option>
                                                    {district && district.map(item => (
                                                        <option value={item.id_district}>{item.name}</option>
                                                    ))}
                                                </select>
                                                <select onChange={handleInputChangeWard} className="form-select col-4">
                                                    <option>-----Ward-----</option>
                                                    {ward && ward.map(item => (
                                                        <option value={item.id_ward}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address Detail</label>
                                            <input className="form-control" onChange={(e)=>setAddress({...address, address_detail: e.target.value})}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input className="form-control" type="file"
                                                   onChange={(e)=>handleInputChangeImage(e)}/>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <button style={{width : '300px'}} type="button" className="btn btn-outline-success">Register</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}

export default FormRegister;



