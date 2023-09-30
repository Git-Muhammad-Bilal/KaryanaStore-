import React from 'react'
import { useBase64Query } from '../../../hooks/useBase64Query';
import { store } from '../../../reduxStore/Buyer/types/storeInfoTypes';
import { useSelector } from 'react-redux';
import { inputProducttypes } from '../../store/storeTypes';
import { cartProdTypes } from '../../../reduxStore/Buyer/AddToCartSlice';
import CreateProduct from '../../store/CreateProduct';

const OrdersCart = ({ storeId }: { storeId?: string }) => {

  let cn = !storeId?.length ? "order-cart-cont " : "order-cart-for-prods"
 let data = useSelector(({cartProduct})=> cartProduct)
 
  const { queryData } = useBase64Query();
  const { storeName, products } = queryData;

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
        <button>Order Now</button>
        </div>
         

        <div className="cart">
          <img src="/cart.png" alt="car" /> 
        </div>
      </div>

      }
        
        <div className='quantity'>
          <p>{data.cartProduct.length}</p>
        </div>
      {/* <div className='hr'>
        <hr />
      </div> */}
    </div>
  )
}


export default OrdersCart;