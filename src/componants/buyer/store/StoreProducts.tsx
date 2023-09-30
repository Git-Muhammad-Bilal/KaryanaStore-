import React, { useEffect, useRef, useState } from 'react'
import ProductLIst from '../../store/ProductList';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../../reduxStore/karyanaStore/productsSlice';
import OrdersCart from '../orders/OrdersCart';
import "../../../karyanaStoreStyless/buyerStyles/storeProducts.css"
import "../../../karyanaStoreStyless/buyerStyles/orders.css"
import { useBase64Query } from '../../../hooks/useBase64Query';
import { log } from 'console';
import { useDispatch, useSelector } from 'react-redux';
import { cancealCartItem, extractProductInfo } from '../../../reduxStore/Buyer/AddToCartSlice';
import { inputProducttypes } from '../../store/storeTypes';

interface PopUpInputTypes {
  inputId?: Number | null,
  inputQuantity?: string,
  index?: number
}

const StoreProducts = () => {
  const [input, setInput] = useState<PopUpInputTypes>({
    inputId: null,
    inputQuantity: '',
    index: 0,
  });
  const [priceList, setPriceList] = useState<PopUpInputTypes[]>([input]);
 

  const [popUpInput, setPopUpInput] = useState<string>('');
  const [pickedProuct, setPickedPrdocut] = useState<Number | null>()
  const dispatch = useDispatch();
  let refer = useRef<HTMLInputElement | null>(null)
  let { storeId } = useParams()
  let data = useGetProductsQuery(storeId || undefined)
  const { data: products, isError, isLoading, error } = data

  let cart = useSelector(({ cartProduct }) => cartProduct)



  function closepop(ev: MouseEvent) {
    let classNme = ev.target as HTMLLIElement

    if (classNme.id === popUpInput) {
      setPopUpInput(classNme.id)
    } else {
      setPopUpInput(classNme?.id)
    }
  }

  useEffect(() => {

    document.body.addEventListener('click', closepop)

    return () => {
      document.body.removeEventListener('click', closepop)
    }
  }, [])


  const addToCart = (prod: inputProducttypes) => {
    dispatch(extractProductInfo(prod))
  }
  const cancealCartProd = (prod: inputProducttypes) => {
    dispatch(cancealCartItem(prod))
  }

  const renderCancealBtn = (prod: inputProducttypes) => {
     let productBoughts = [];
    return cart.cartProduct.map((p: inputProducttypes) =>{
      if (p._id == prod._id) {
          console.log(cart.cartProduct,'cart');
          productBoughts.push(p._id)

        return <button
          className='buy-product'
          onClick={() => cancealCartProd(prod)}
        >Canceal
        </button>}
          
      }   

    )
  }


  let prods = products?.map((prod, index) => {
    const { productName, quantity, cost, price, _id, userId }: { productName: String, quantity: Number, cost: Number, price: Number, _id: Number, userId: Number } = prod;
    // let priceOfAddedCartItem = price*Number(inpQuantity)
    let id = _id.toString();
    return (
      <div accessKey={1 + id} key={index} className='productList-table-cont' >
        <div className='header'>
          <div>
            <p>Prodct Name </p>

          </div>
          <div>
            <p>Quantity kg/liter</p>
          </div>
          <div>
            <p>Price Rs</p>
          </div>
          {pickedProuct === _id && input.inputQuantity && <div>
            <p>Purchase Rs</p>
          </div>}
        </div>

        <div className='product-details'>
          <div>
            <p>{productName}</p>
          </div>
          <div key={index}
            className="qunaity-input"
            id={id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setPopUpInput(_id.toString())
            }}
          >

            {
              quantity !== 0 && popUpInput === _id.toString() ?
                <input
                  type="text"
                  placeholder='Quantity'
                  id={_id.toString()}
                  value={input.inputQuantity?.toString()}
                  ref={refer}
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      setPopUpInput('')
                      setPriceList([...priceList, input])
                      

                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput((pre) => {

                    return { ...pre, inputId:_id , inputQuantity: e.target.value, index }
                  })}

                />
                :
                <p id={_id.toString()}>{pickedProuct === _id ? input.inputQuantity || quantity.toString() : quantity.toString()}</p>
            }
          </div>
          <div>
            <p>{price.toString()}</p>
          </div>
          <div>
            {
              priceList.map((p) => {
                // console.log(input, 'input');
                
                if (p.inputId === _id && p.inputId === input.inputId) {
                  return <p>{Number(price) * Number(p.inputQuantity)}</p>
                }
              })
            }
          </div>
        </div>
        <div className='productList-btns'>
          <div>
            <button
              className='buy-product'
              onClick={() => addToCart({ ...prod, quantity: Number(input.inputQuantity) })}
            >{quantity === 0 ? 'sold' : 'buy'}
            </button>
          </div>
          {renderCancealBtn(prod)}
        </div>
      </div>


    );

  });



  return (
    <div className='b-store-Products-cont'>

      <div className='product-list-container'>
        {isLoading && <h2>Loading....</h2>}
        {prods?.length ? prods : <h1>You do not have any Product, add products now!!!!</h1>}
      </div>

      <div className='order-card'>
        <OrdersCart storeId={storeId} />
      </div>
    </div>
  )

}



export default StoreProducts;


