import React, { useEffect, useState } from 'react'
import { useBase64Query } from '../../../hooks/useBase64Query';
import { store } from '../../../reduxStore/Buyer/types/storeInfoTypes';
import { useDispatch, useSelector } from 'react-redux';
import { inputProducttypes } from '../../store/storeTypes';
import { cancealCartItem, cartProdTypes, extractProductInfo } from '../../../reduxStore/Buyer/AddToCartSlice';
import CreateProduct from '../../store/CreateProduct';
import io from 'socket.io-client';
import { localStorageTypes } from '../../../axios/axiosApi';
import { useAppSlector } from '../../../reduxStore/store/StoreTypes';

const token:any  = localStorage.getItem('accessToken') 
 const strg:localStorageTypes = JSON.parse(token)
const socketio = io('http://localhost:3003', {
  auth: { jwt:strg?.accessToken }

})



const OrdersCart = ({ storeId, setHasOrdered, hasOrdered, getBName }:
  {
    storeId?: string,
    setHasOrdered?: React.Dispatch<React.SetStateAction<string[]>> | any,
    hasOrdered?: string[],
    getBName?: string,
  }) => {
console.log(getBName,'bname');

  let cn = !storeId?.length ? "order-cart-cont " : "order-cart-for-prods"
  
  let data = useAppSlector(({ cartProduct}) => cartProduct)
  // console.log(data, 'cart');
  
  
  const { queryData } = useBase64Query();
  const { storeName, products } = queryData;
  
  const orderPurchases = () => {
      
    socketio.emit('order',  [data.cartProduct, getBName],(res:string)=>{
      
      setHasOrdered([res])
      
    }) 

    
  }
  



  return (
    <div className={cn}>
      <div className="from-store">
        <h3>Store: {storeName}</h3>
        <div className="purchase-date">
          <p>29/4/2023</p>
          <p>8:46</p>

        </div>
      </div>
      <div className="n-of-prods">
        <div>
          <p>Products in Store: {products?.length}</p>
        </div>
        <div className='available-cont'>
          <div className="available">
            <p >Availibility</p>
          </div>
          <div className="in-stock">
            <p>In Stock</p>
          </div>
        </div>
      </div>
      <div className="total-purchase-cost">
        <p>Total  Purchases: 2344</p>

      </div>
      {storeId && <div className="Order-Now">
        <div className='order-btn'>
          <button onClick={() => data.cartProduct.length && orderPurchases()}>Order Now</button>
        </div>
         
         
        <div className="cart">
          <img src="/cart.png" alt="car" />
        </div>
      </div>

      }

      <div className='quantity'>
        <p>{ data.cartProduct.length}</p>
      </div>
      {/* <div className='hr'>
        <hr />
      </div> */}
    </div>
  )
}


export default OrdersCart;