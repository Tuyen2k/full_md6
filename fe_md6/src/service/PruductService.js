import axios from "axios";

export function saveProduct(product){
    return new Promise(resolve => {
       resolve(
           axios.post("http://localhost:8080/api/products", product).then(res =>{
               return true;
           }).catch(Error =>{
               return false;
           })
       )
    })

}