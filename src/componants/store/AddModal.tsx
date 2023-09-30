
import React, { useEffect, useState } from 'react';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useParams } from 'react-router-dom';
import { AddQuanityTypes, BuyerTypes } from './purchasesAddOrCreate/types';
import "../../karyanaStoreStyless/createAccount.css"
import "../../karyanaStoreStyless/AddModal.css"


function AddProductModal({ savePurchases, addQuanity }:
    {
        savePurchases: (sp: BuyerTypes) => void, 
        addQuanity: (object: AddQuanityTypes) => void
    }) {

    const { setQuery, navigateTo, queryData } = useBase64Query();
    const {productDet, purchase} = queryData
    
    let prams = useParams<string>();
    let buyerOrProductId = prams.buyerOrProductId || prams.productId;    
    

    const [buyerName, setBuyerName] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [cost, setCost] = useState<number>();
    const [price, setPrice ] = useState<number>();


    useEffect(() => {
        
        const {productName,quantity,cost,price} = queryData
        
        setProductName(productDet?.productName || productName );
        setCost(productDet?.cost || cost);
        if (productDet || purchase) {
            
            setBuyerName(purchase.buyerName);
            setQuantity(purchase.quantity);
            setPrice(purchase.price);
        }

    }, [productDet?.productName, queryData]);


    function save() {

        purchase && savePurchases({ quantity, price });
        purchase || savePurchases({ buyerName, quantity, price });

    }


    const addQuantiyVal = (value: number) => {
        addQuanity({ value, setPrice, setQuantity });
    };

    function navigateBackToPreviousRoute() {
        let prodBtoaData = btoa(JSON.stringify(productDet? productDet: queryData));
        setQuery('product', prodBtoaData);
        
          
        purchase?.buyerName && buyerOrProductId === purchase.buyer.toString() ?
            navigateTo(`/store/products/ABuyerPurchases/${buyerOrProductId}`, null) :
            navigateTo(`/store/products/Sales/${buyerOrProductId}`, null);

    }

    return (
        <div className='addModal-container'>
            <div className='add-form'>
                <div className="form-title-cont">
                    <div className='form-title'>
                        <p>Buyer Name</p>
                    </div>
                    <div className='form-title'>
                        <p>Product Name</p>
                    </div>
                    <div className='form-title'>
                        <p>Quantity Kg/Liter </p>
                    </div>
                    <div className='form-title'>
                        <p>Cost :Rs</p>
                    </div>
                    <div className='form-title'
                    ><p>Price :Kg/Liter </p>
                    </div>
                </div>
                <div className='form-input'>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder="Buyer Name"
                            value={buyerName}
                            onChange={({ target: { value } }): void => setBuyerName(value)} />

                    </div>
                    <div className='input'>

                        <input
                            type="text"
                            placeholder="ProductName"
                            value={productName} />

                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={({ target: { value } }): void => {
                                Number(value) ?
                                    addQuantiyVal(Number(value)) :
                                    setQuantity(undefined);
                            }} />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder="Cost"
                            value={cost}
                            onChange={({ target: { value } }): void => setCost(Number(value))} />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder="Price"
                            value={price} />
                    </div>
                </div>
            </div>


            <div className='add-form-btns'>

                <div className='back-cont'>
                    <button onClick={(): void => navigateBackToPreviousRoute()} className='back'>Back</button>
                </div>

                <div className='save-btn'>
                    <button onClick={save}>Save Product</button>
                </div>

            </div>




        </div>
    );

}

export default AddProductModal;