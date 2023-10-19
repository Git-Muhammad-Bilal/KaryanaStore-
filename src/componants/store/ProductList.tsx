
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import "../../karyanaStoreStyless/productList.css"
import { useLazyGetProductsQuery } from '../../reduxStore/karyanaStore/productsSlice';
import { useLazyGetSalNotficaionsQuery } from '../../reduxStore/karyanaStore/saleNotificationSlice';
import MapProductList from './MapProductList';


import io from 'socket.io-client';
const jwt = localStorage.getItem('accessToken')

const socketio = io('http://localhost:3003', {
   auth:{jwt}
   
})

const ProductLIst = ({setIsNewNotfn}: { setIsNewNotfn:React.Dispatch<React.SetStateAction<number>> }) => {
    const [notifns, setNotifns] = useState<any>()

    const { showBoundary } = useErrorBoundary()

    let [getProducts, data] = useLazyGetProductsQuery()
    data.isError && showBoundary(data.error)

    let [getNotifications, result] = useLazyGetSalNotficaionsQuery();
           
    useEffect(() => {
        let getND = async () => {
            let data = await getNotifications('');
            
            getProducts('');
            setNotifns(data.data)
        }

        getND()


    }, [])

    // let [getNotifications, result] = useLazyGetSalNotficaionsQuery();

    // let notificationsData = result.data || [];
    // let curNotiftn = notificationsData[index]?.notfiedPurchases?.purchaseCount.toString()
    // let prodid = notificationsData[index]?.notfiedPurchases?.productId?.toString()

    // socketio.on('order', async (arg: []) => {
    //    let data = await getNotifications('')
    //    console.log(arg,'data.dataaaa');
       
    //    setNotifns(arg) 
    //    setIsNewNotfn(Number(Date.now()))
    // })


    function allNotifications(index:number) {
        if (notifns?.length  ) {
            
           let notification = notifns[index]?.notfiedPurchases.purchaseCount
           
           return  notification == '0'?'':notification
           
        }else{
            return '';
        }

    }

    let prods = data.data?.map((p, index) => {
        return <MapProductList product={p}
            index={index}
            socketio={socketio}
            notifications={allNotifications(index).toString()}
            setIsNewNotfn = {setIsNewNotfn}
        />

    })



    return (
        <div className='product-list-container'>
            {data.isLoading && <h2>Loading....</h2>}
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