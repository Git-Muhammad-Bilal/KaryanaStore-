import { generatePath, useLocation } from 'react-router-dom';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useDeleteProductMutation } from '../../reduxStore/karyanaStore/productsSlice';
import { extedndedProductTypes, inputProducttypes } from './storeTypes';
import { useLazyGetSalNotficaionsQuery } from '../../reduxStore/karyanaStore/saleNotificationSlice';
import "../../karyanaStoreStyless/productList.css"
import { useEffect, useState } from 'react';
import axiosApi from '../../axios/axiosApi';




const MapProductList = ({ product, index, socketio, setIsNewNotfn, setProducts }:
    {
        product: extedndedProductTypes,
        index: number,
        socketio: any,
        setIsNewNotfn: React.Dispatch<React.SetStateAction<number>>,
        setProducts: React.Dispatch<React.SetStateAction<extedndedProductTypes[]>>
    }) => {

    const [isConnected, setIsConnected] = useState(socketio.connected)
    const [newNf, setNf] = useState<any[]>([])
    const { productName, quantity, cost, price, _id, userId, notfiedPurchases: { productId, purchaseCount } } = product;
    const { setQuery, navigateTo } = useBase64Query();

    const deleteProduct = async (id: string) => {
        let { data } = await axiosApi.delete(`/deleteProduct/${id}`)
        setProducts(data)
    }
    let curNotiftn = newNf[index]?.notfiedPurchases?.purchaseCount.toString()
    let prodid = newNf[index]?.notfiedPurchases?.productId?.toString()

    useEffect(() => {
        socketio.connect()

        return () => {
            socketio.disconnect()
        }
    }, [])

    useEffect(() => {

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function getNf(arg: any) {
            setNf(arg)
            setIsNewNotfn(Number(Date.now()))
        }


        socketio.on('receive', onConnect);
        socketio.on('receive', onDisconnect);
        socketio.on('receive', getNf)

        return () => {
            socketio.off('receive', onConnect);
            socketio.off('receive', onDisconnect);
            socketio.off('receive', getNf)
        }
    }, [newNf])




    async function editProduct() {
        let prodBtoaData = btoa(JSON.stringify(product))
        setQuery('product', prodBtoaData);
        navigateTo(`/store/products/CreateProduct`, null);


    }

    async function navigateToSales() {
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
                purchaseCount || Number(curNotiftn) ? <div className={"orders-notification"}>
                    {!curNotiftn && <p>{purchaseCount}</p>}
                    {curNotiftn && _id.toString() == prodid && <p>{curNotiftn}</p>}
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
                        onClick={() => { navigateToSales() }}>Sales</button>
                </div>

                <div>
                    <button onClick={() => { editProduct() }}>edit</button>
                </div>

                <div>
                    <button onClick={() => { deleteProduct(_id.toString()) }}>delete</button>
                </div>
            </div>

        </div>
    );



}


export default MapProductList;