import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLazyGetProductsQuery  } from '../../../reduxStore/karyanaStore/productsSlice';
import { inputProducttypes } from '../../store/storeTypes';
import OrdersCart from '../orders/OrdersCart';
import StoreProductCard from './StoreProductCard';
import "../../../karyanaStoreStyless/buyerStyles/orders.css"
import "../../../karyanaStoreStyless/buyerStyles/storeProducts.css"


const StoreProducts = ({getBName}:{getBName?:string}) => {

  const [quantityField, setQuantityField] = useState<Number | null>(null);
   let [hasOrdered, setHasOrdered] =useState<string[]>([])
   let [has, setHas] =useState(false)
   
  const { storeId } = useParams();

  const [getProducts, data] = useLazyGetProductsQuery()
   
  const { data: products = [], isError, isLoading, error } = data
  
  useEffect(()=>{
       getProducts(storeId)
  },[])


  let ps = products.map((p: inputProducttypes) => <StoreProductCard
  product={p}
  quantityField={quantityField}
  setQuantityField={setQuantityField} 
  hasOrdered ={hasOrdered}
  
  />

  );

  return (
    <div className='b-store-Products-cont'>

      <div className='product-list-container'>
        {isLoading && <h2>Loading....</h2>}
        {ps?.length ? ps : <h1>You do not have any Product, add products now!!!!</h1>}
      </div>

      <div className='order-card'>
        <OrdersCart storeId={storeId} setHasOrdered={setHasOrdered} hasOrdered ={hasOrdered}  getBName={getBName} />
      </div>
    </div>
  )

}



export default StoreProducts;


// export const ProductItemCard = ({ product, quantityField, setQuantityField }: any) => {

//   const [quantity, setQuantity] = useState('');
//   const [orderQuantity, setOrderQuantity] = useState(false);

//   const dispatch = useDispatch();

//   const addToCart = (prod: inputProducttypes) => {
//     dispatch(extractProductInfo(prod))
//   }

//   const removeFromCart = (prod: inputProducttypes) => {
//     dispatch(cancealCartItem(prod))
//   }

//   const handleChange = ({ target: { value } }: any) => {
//     setQuantity(value);
//   }

//   const handleAddToCart = () => {
//     addToCart({ ...product, quantity: Number(quantity) })
//   };


//   return (
//     <div>
//       <Fragment>
//         <div>
//           <span>
//             Remaining Quantity: {
//               (orderQuantity && quantityField === product._id) ? <input onChange={handleChange} onKeyDown={({ key }) => key === 'Enter' && setOrderQuantity(false)} />
//                 :
//                 <span onClick={() => {
//                   setOrderQuantity(true);
//                   setQuantityField(product._id);
//                 }}>{product.quantity}</span>
//             }
//           </span>
//         </div>
//         <div>
//           <span>Price: {product.price}</span>
//         </div>
//         <div>
//           {quantity && (
//             <Fragment>
//               <AddButton handleAddToCart={handleAddToCart} /> : <CancelButton removeFromCart={removeFromCart} />
//             </Fragment>
//           )}
//         </div>
//       </Fragment>
//     </div>
//   )
// }

// export const AddButton = ({ handleAddToCart }: any) => {
//   return (
//     <button onClick={handleAddToCart}>Add</button>
//   )
// }

// export const CancelButton = ({ removeFromCart }: any) => {
//   return (
//     <button onClick={removeFromCart}>Cancel</button>
//   )
// }
