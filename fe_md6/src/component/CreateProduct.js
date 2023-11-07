import {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {saveProduct} from "../service/PruductService";
import {getAllCategories} from "../service/CategoryService";
import {upImageFirebase} from "../firebase/Upfirebase";

export default function CreateProduct() {
    const [file, setFile] = useState(undefined)
    const [load, setLoad] = useState(true)
    const inputFile = useRef()
    const [categoriesDB, setCategoriesDB] = useState([])
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        timeMake: ""
    })

    useEffect(() => {
        getAllCategories().then(res => {
            setCategoriesDB([...res])
        })
    }, [])

    const handledCreate = (e) => {
        setLoad(false)
        upImageFirebase(file).then(res =>{
            let a = {id_merchant : 1}
            let product ={...e, image : res.name, categories : categories, merchant:a, priceSale : e.price*0.95}
            saveProduct(product).then(response =>{
                setLoad(true)
                setFile(undefined)
                alert(response)
            })
        }).catch(Error =>{
            setLoad(true)
            alert("Error loading!!!")
            console.log(Error)})
    }
    const handledClickInput = () => {
        inputFile.current.click();
    }
    const handledCategories = (id_category) => {
        if (categories.length !== 0) {
            let flag = true;
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id_category === id_category) {
                    categories.splice(i, 1)
                    flag = false
                }
            }
            if (flag) {
                categories.push({id_category: id_category})
            }
        } else {
            categories.push({id_category: id_category})
        }
        setCategories([...categories])
    }

    const handledInputFile = (file) => {
        setFile(file);
    }


    return (
        <>
            {load ? (
            <div className="form-input">
                <h1 className="title">Create Product</h1>
                <Formik onSubmit={(e) => handledCreate(e)}
                        initialValues={product}>
                    <Form>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="name">Name</span>
                            <Field type="text" className="form-control" name="name" placeholder="Enter name product"
                                   aria-describedby="name"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="price">Price</span>
                            <Field type="text" className="form-control" name="price" placeholder="Enter price product"
                                   aria-describedby="price"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="timeMake">Time Make</span>
                            <Field type="text" className="form-control" name="timeMake"
                                   placeholder="Enter time make product"
                                   aria-describedby="timeMake"/>
                        </div>
                        <div style={{display: "flex"}} className="div-checkbox input-group mb-3 row ">
                            <span className="input-group-text col-2" style={{height: "37.6px"}}>Categories</span>
                            <div className="form-checkbox col-10">
                                {categoriesDB.map((category, index = 0) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input className="form-check-input" type="checkbox"
                                                   onChange={(e) => handledCategories(e.target.value)}
                                                   value={category.id_category} id={"categories" + index}/>
                                            <label className="form-check-label"
                                                   htmlFor={"categories" + index}>{category.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="mb-3" style={{display: "flex"}} onClick={handledClickInput}>
                            <span className="input-group-text" style={{height: "37.6px"}}>Image Product</span>
                            <input ref={inputFile} className="form-control" type="file" id="formFile"
                                   style={{display: 'none'}} onChange={(e) => handledInputFile(e.target.files[0])}/>
                            {file === undefined ? (
                                <div style={{backgroundColor: "white", width: "325.6px", marginLeft: "20px"}}
                                     className="form-control">
                                    <div className='image-input'
                                         style={{backgroundImage: `url("https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png")`}}>
                                    </div>
                                </div>
                            ) : (
                                <div style={{backgroundColor: "white", width: "325.6px", marginLeft: "20px"}}
                                     className="form-control">
                                    <div>
                                        <img className="image-input" src={URL.createObjectURL(file)}
                                             alt='image'/>
                                    </div>
                                </div>)}
                        </div>
                        <hr/>
                        <div className="div-button">
                            <button className="btn btn-outline-primary" type={"submit"}>Save</button>
                            <button className="btn btn-outline-primary" type={"button"}>Back Home</button>
                        </div>
                    </Form>
                </Formik>
            </div> )
                :(
                    <div></div>
                )}
        </>
    )
}