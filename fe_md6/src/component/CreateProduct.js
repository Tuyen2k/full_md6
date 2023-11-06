import {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {saveProduct} from "../service/PruductService";
import {getAllCategories} from "../service/CategoryService";

export default function CreateProduct() {
    const [file, setFile] = useState(undefined)
    const inputFile = useRef()
    const [categoriesDB, setCategoriesDB] = useState([])
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        timeMake: ""
    })

    useEffect(()=>{
        getAllCategories().then(res =>{
            setCategoriesDB(prev => [...prev, res.data])
        })
    },[])

    const handledCreate = (e) => {
        console.log(e)
    }
    const handledClickInput = () => {
        inputFile.current.click();
    }
    const handledCategories=(id_cate)=>{
        if(categories.length !== 0){
            let flag = true;
            for(let i = 0; i < categories.length ; i++){
                if(categories[i].id === id_cate){
                    categories.splice(i, 1)
                    flag = false
                }
            }
            if(flag){
                categories.push({id: id_cate})
            }
        }
        else{
            categories.push({id: id_cate})
        }
        setCategories([...categories])
    }
    const handledInputFile = (file) => {
        setFile({...file});
    }


    return (
        <>
            <div>
                <h1>Create Product</h1>
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
                        <label htmlFor="name" className="form-label">Categories</label>
                        {categoriesDB.map((category, index = 0) =>{
                            return(
                                <>
                                    <div className="form-check">
                                        <input className="form-check-input"  name='cate' type="checkbox" onChange={(e)=>handledCategories(e.target.value)} value={category.id} id={"categories"+index}/>
                                        <label className="form-check-label" htmlFor={"categories"+index}>{category.name}</label>
                                    </div>
                                </>
                            )
                        })}
                        <div className="mb-3" style={{display:"flex"}} onClick={handledClickInput}>
                            <span className="input-group-text">Image Product</span>
                            <input ref={inputFile} className="form-control" type="file" id="formFile"
                                   style={{display: 'none'}} onChange={(e) => handledInputFile(e.target.files[0])}/>
                            {file === undefined ? (
                                <div style={{backgroundColor: "white", width: "325.6px"}} className="form-control">
                                    <div className='image-input'
                                         style={{backgroundImage: `url("https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg")`}}>
                                    </div>
                                </div>
                            ) : (
                                <div >
                                    <img className="image-input"  src={URL.createObjectURL(file)}
                                         alt='image'/>
                                </div>)}
                        </div>
                        <button type={"submit"}>Save</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}