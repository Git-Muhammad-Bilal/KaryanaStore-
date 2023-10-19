import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inputProducttypes, productsTypes } from '../../store/storeTypes'
import { cancealCartItem, extractProductInfo } from '../../../reduxStore/Buyer/AddToCartSlice'
import { useBase64Query } from '../../../hooks/useBase64Query'
import { validateHeaderValue } from 'http'

function StoreProductCard({ product, quantityField, setQuantityField, hasOrdered }:

    {
        product: inputProducttypes,
        quantityField: null | Number,
        setQuantityField: React.Dispatch<React.SetStateAction<null | Number>>
        hasOrdered: string[]


    }) {


    const [value, setValue] = useState<string>('')
    const [orderQuantity, setOrderQuantity] = useState<boolean>(false);
    const [addedProduct, setAddedProduct] = useState<boolean>(false);
    const { productName, quantity, cost, price, _id, userId } = product


    const dispatch = useDispatch();
    const { queryData } = useBase64Query();
    const { storeName, products } = queryData;

    function closeInputPopUp(e: MouseEvent) {
        let inputEle = e.target as HTMLElement

        if (inputEle.id !== product._id.toString()) {
            setOrderQuantity(false)
        }


    }
    useEffect(() => {
        document.body.addEventListener('click', closeInputPopUp)
        return () => document.body.removeEventListener('click', closeInputPopUp)
    })
    useEffect(() => {

        dispatch(cancealCartItem([product._id.toString()]))
        setAddedProduct(false);
        setValue('');

    }, [hasOrdered])

    
    const addToCart = (product: inputProducttypes) => {

        dispatch(extractProductInfo(product))
    }




    return (
        <div className='productList-table-cont' >
            <div className='header'>
                <div><p>Prodct Name </p></div>
                <div><p>Quantity kg/liter</p></div>
                <div><p>Price Rs</p></div>
                <div><p>Purchase Rs</p></div>
            </div>

            <div className='product-details'>
                <div><p>{productName}</p> </div>

                <div className="qunaity-input"
                    id={_id.toString()}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        setOrderQuantity(true)
                        setQuantityField(product?._id)
                    }}>
                    {orderQuantity && quantityField === _id ?
                        <input
                            type="text"
                            placeholder='Quantity'
                            id={_id.toString()}
                            value={Number(value) > Number(product.price)? price.toString():value}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    
                                    setValue(value)
                                    setOrderQuantity(false)
                                }
                            }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                console.log(e.target.value == '', 'target');
                                
                                Number(e.target.value)      
                                && setValue(e.target.value)
                                setAddedProduct(false)
                            }} />

                        : <p id={_id.toString()} >{value || quantity.toString()}</p>
                    }
                </div>
                <div>
                    <p>{price.toString()}</p>
                </div>
                <div>
                    <p>{value ? Number(value) * Number(price) : ''}</p>
                </div>
            </div>
            <div className='productList-btns'>
                {value && <div>
                    {addedProduct ?
                        <button>Added</button> :
                        <button
                            className='buy-product'
                            onClick={() => {
                                setAddedProduct(true)
                                addToCart({ ...product, storeName, quantity: Number(value) })

                            }}
                        >{quantity === 0 ? 'sold' : 'buy'}
                        </button>
                    }

                    <button className='buy-product' onClick={() => {
                        dispatch(cancealCartItem([product._id.toString()]))
                        setValue('')
                        setAddedProduct(false)
                    }
                    } >Cancel </button>
                </div>
                }
            </div>
        </div>


    );

}


export default StoreProductCard
