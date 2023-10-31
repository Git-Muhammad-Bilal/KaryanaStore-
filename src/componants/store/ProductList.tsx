
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import MapProductList from './MapProductList';
import io from 'socket.io-client';
import axiosApi, { localStorageTypes } from '../../axios/axiosApi';
import { extedndedProductTypes } from './storeTypes';
import "../../karyanaStoreStyless/productList.css"

const jwt:any = localStorage.getItem('accessToken')
const strg:localStorageTypes = JSON.parse(jwt)
const socketio = io('http://localhost:3003', {
   auth:{jwt:strg.accessToken},
   autoConnect:false
   
})

const ProductLIst = ({setIsNewNotfn}: { setIsNewNotfn:React.Dispatch<React.SetStateAction<number>> }) => {

    const [products, setProducts] = useState<extedndedProductTypes[]>([])

    const { showBoundary } = useErrorBoundary()
           
    useEffect(() => {
        let getND = async () => {
            try {
                let {data} = await axiosApi.get('/getProducts');
                setIsNewNotfn(Number(Date.now()))
                setProducts(data)
            }catch (error) {
                showBoundary(error)
            }  
        }
        getND()
        
}, [])



 
let prods = products?.map((p, index) => {
 

       return <MapProductList key={p._id.toString()} product={p}
            index={index}
            socketio={socketio}
            setIsNewNotfn = {setIsNewNotfn}
            setProducts={setProducts}
        />
        
    })



    return (
        <div className='product-list-container'>
            {!products.length && <h2>Loading....</h2>}
            {prods?.length ? prods : <h1>You do not have any Product, add products now!!!!</h1>}
        </div>
    )

}










export default ProductLIst;


// let fetchProds = async () => {
//     try {
//         let { data } = await axiosApi.get(`/getProducts`)
//         if (data) {
//             setProducts(data)
//         } else {
//             showBoundary('could not fetch ProductList')
//         }
//     } catch (error) {
//         showBoundary(error.meesage)
//     }
// }
// return () => {
//     fetchProds()
// }