import React from 'react';
import { generatePath } from 'react-router-dom';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import "../../karyanaStoreStyless/productList.css"
import { useDeleteProductMutation, useGetProductsQuery } from '../../reduxStore/karyanaStore/productsSlice';
import { inputProducttypes } from './storeTypes';



const ProductLIst = () => {
    let token = localStorage?.getItem('accessToken');
    
    const { setQuery, navigateTo } = useBase64Query();
    const { showBoundary } = useErrorBoundary()
    const { data:products, isError, isLoading, error } = useGetProductsQuery('')

               
    let [deleteProduct] = useDeleteProductMutation()
     isError && showBoundary(error)


    async function editProduct(products:inputProducttypes) {
        let prodBtoaData = btoa(JSON.stringify(products))
        setQuery('product', prodBtoaData);
        navigateTo(`/store/products/CreateProduct`, null);
    }

    async function navigateToPurchases(product:inputProducttypes) {
        let ProdInfo = {
            productName: product.productName,
            cost: product.cost,
            quantity: product.quantity,
            price: product.price,
            productId: product._id,
            store: product.userId
        }

        let prodBtoaData = btoa(JSON.stringify(ProdInfo))
        setQuery('product', prodBtoaData);
        let path = generatePath(`/store/products/Sales/:productId`, {
            productId: product._id.toString(),
        });
        navigateTo(path, null);
    }


    let prods = token && products?.map((prod, index) => {
        const { productName, quantity, cost, price, _id, userId }:{productName:String, quantity:Number, cost:Number, price:Number, _id:Number, userId:Number } = prod;
        return (
            <div key={index} className='productList-table-cont'>
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
                            onClick={() => { navigateToPurchases(prod) }}>buy</button>
                    </div>

                    <div>
                        <button onClick={()=> { editProduct({ productName, quantity, cost, price, _id, userId }) }}>edit</button>
                    </div>

                    <div>
                        <button onClick={() => { deleteProduct(_id) }}>delete</button>
                    </div>
                </div>

            </div>
        );

    });

    return (
        <div className='product-list-container'>
            {isLoading && <h2>Loading....</h2>}
            {prods?.length? prods:  <h1>You do not have any Product, add products now!!!!</h1>}
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