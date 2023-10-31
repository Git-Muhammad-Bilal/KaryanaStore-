import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import RenderSales from './RenderSales';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import "../../karyanaStoreStyless/buyerInfo.css"
import { useLazyGetPurchasesQuery } from '../../reduxStore/karyanaStore/purchaseSlice';
import io from 'socket.io-client';
import axiosApi, { localStorageTypes } from '../../axios/axiosApi';


const jwt: any = localStorage.getItem('accessToken')
const strg: localStorageTypes = JSON.parse(jwt)
const socketio = io('http://localhost:3003', {
    autoConnect: false,
    auth: { jwt: strg.accessToken },

})
let isNewSale = false
const Sales = ({ setIsNewNotfn }: { setIsNewNotfn: React.Dispatch<React.SetStateAction<number>> }) => {
    const [isConnected, setIsConnected] = useState(socketio.connected)
    const [sales, setSales] = useState<{}[]>([])
    const { queryData, genPath } = useBase64Query();
    const { showBoundary } = useErrorBoundary()
    let { productId } = useParams();

    useEffect(() => {
        let getSales = async () => {
            try {
                let { data } = await axiosApi.get(`/getPurchases/${productId}`);
                setSales(data)

            } catch (error) {

                showBoundary(error)
            }
        }

        isNewSale || getSales()
        return () => {
            if (isNewSale) {
                getSales()
            }
        }
    }, [])


    useEffect(() => {
        socketio.connect()

        return () => {
            socketio.disconnect()
        }
    })

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }
        function fetchSales(arg: []) {
            setSales([...sales, ...arg])
            setIsNewNotfn(Number(Date.now()))
            isNewSale = true
        }


        socketio.on('receiveNewSales', onConnect);
        socketio.on('receiveNewSales', onDisconnect);
        socketio.on('receiveNewSales', fetchSales)

        return () => {
            socketio.off('receiveNewSales', onConnect);
            socketio.off('receiveNewSales', onDisconnect);
            socketio.off('receiveNewSales', fetchSales);
        }
    }, [sales])

    return (
        <div className='purchaes-container'>
            <div className='purchases-header'>

                <div className="ti">

                    <div className='header-titles'>
                        <p>Buyer Name  </p>
                        <p></p>
                    </div>
                    <div className='header-titles'>
                        <p>Prodct Name  </p>
                        <p>{queryData?.productName}</p>
                    </div>
                    <div className='header-titles'>
                        <p>Quantity </p>
                        <p>{queryData?.quantity} Kg/litr</p>
                    </div>
                    <div className='header-titles'>
                        <p>Cost </p>
                        <p> Rs. {queryData?.cost}</p>
                    </div>
                    <div className='header-titles'>
                        <p>Price</p>
                        <p>Rs. {queryData?.price}</p>
                    </div>
                </div>
                <div className='add-btn-cont'>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <div className='purchaes-list'>
                <RenderSales purchases={sales} setSales={setSales} />
            </div>
        </div>
    )
}


export default Sales;
