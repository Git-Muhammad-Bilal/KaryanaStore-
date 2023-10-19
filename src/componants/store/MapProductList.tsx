import { generatePath } from 'react-router-dom';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useDeleteProductMutation } from '../../reduxStore/karyanaStore/productsSlice';
import { inputProducttypes } from './storeTypes';
import { useLazyGetSalNotficaionsQuery } from '../../reduxStore/karyanaStore/saleNotificationSlice';
import "../../karyanaStoreStyless/productList.css"
import { useEffect } from 'react';





const MapProductList = ({ product, index, socketio, notifications, setIsNewNotfn }:
    {
        product: inputProducttypes,
        index: number,
        socketio: any,
        notifications: string,
        setIsNewNotfn: React.Dispatch<React.SetStateAction<number>>
    }) => {
    
    
    const { productName, quantity, cost, price, _id, userId } = product;
    const { setQuery, navigateTo } = useBase64Query();

    let [deleteProduct] = useDeleteProductMutation()
    let [getNotifications, result] = useLazyGetSalNotficaionsQuery();

    let notificationsData = result.data || [];
    let curNotiftn = notificationsData[index]?.notfiedPurchases?.purchaseCount.toString()
    let prodid = notificationsData[index]?.notfiedPurchases?.productId?.toString()

    socketio.on('order', async (arg: []) => {
        getNotifications('')
        setIsNewNotfn(Number(Date.now()))
    })



    async function editProduct() {
        let prodBtoaData = btoa(JSON.stringify(product))
        setQuery('product', prodBtoaData);
        navigateTo(`/store/products/CreateProduct`, null);


    }

    async function navigateToPurchases() {
        let ProdInfo = {
            productName,
            cost,
            quantity,
            price,
            productId: _id,
            store: userId
        }

        let prodBtoaData = btoa(JSON.stringify(ProdInfo))
        setQuery('product', prodBtoaData);
        let path = generatePath(`/store/products/Sales/:productId`, {
            productId: product._id.toString(),
        });
        navigateTo(path, null);
    }


    return (
        <div key={index} className='productList-table-cont'>
            {
                notifications || curNotiftn && _id.toString() == prodid ?
                    <div className={"orders-notification"}>
                        <p>{curNotiftn || notifications}</p>
                    </div> 
                    : ''
            }
            <div className='header'>
                <div>
                    <p>Prodct Name </p>

                </div>
                <div>
                    <p>Quantity kg/liter</p>
                </div>
                <div>
                    <p>Cost Rs</p>
                </div>
                <div>
                    <p>Price Rs</p>
                </div>
            </div>

            <div className='product-details'>
                <div>
                    <p>{productName}</p>
                </div>
                <div>
                    <p>{quantity.toString()}</p>
                </div>
                <div>
                    <p>{cost.toString()}</p>
                </div>
                <div>
                    <p>{price.toString()}</p>
                </div>
            </div>
            <div className='productList-btns'>
                <div>
                    <button className='buy-product'
                        onClick={() => { navigateToPurchases() }}>Sales</button>
                </div>

                <div>
                    <button onClick={() => { editProduct() }}>edit</button>
                </div>

                <div>
                    <button onClick={() => { deleteProduct(_id) }}>delete</button>
                </div>
            </div>

        </div>
    );



}


export default MapProductList;