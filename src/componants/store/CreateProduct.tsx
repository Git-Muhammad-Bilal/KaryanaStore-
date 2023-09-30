import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import { useCreateOrUpdateProductMutation } from '../../reduxStore/karyanaStore/productsSlice';
import { productsTypes } from './storeTypes';
import '../../karyanaStoreStyless/createProduct.css'



  


const CreateProduct = () => {
    // debugger
    let x ={
        productName:'',
        quantity:undefined,
        cost:undefined, 
        price:undefined
    }
    const [productInfo, setProductInfo] = useState<productsTypes >(x);
    console.log(productInfo, 'outside');
    
    let [requiredField, setRequiredFoields] = useState<productsTypes[]>([]); 
    let [bol, setBol] = useState<boolean>(false);
    let { showBoundary } = useErrorBoundary()
    const { queryData, navigateTo } = useBase64Query()

    const [createOrUpdateProduct] = useCreateOrUpdateProductMutation()
    // isError && showBoundary(error)

    useEffect(() => {
        if (bol) {
            navigateTo(`/store/products/ProductList`, null)
        }
    }, [bol])



    const setProductDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
           console.log(value,name, 'value, name');
           
        if (name === 'productName') {
            String(value)
        }
        for (const key in productInfo) {
            if (key === name) {

                setProductInfo((previousState) => {
                    return { ...previousState, [key]: value }
                })
            }
        }

    }

    useEffect(() => {
        if (queryData) {
            for (const key in productInfo) {
                setProductInfo((previousState) => {
                    return { ...previousState, [key]: queryData[key as keyof productsTypes] }
                })

            }

        }


    }, [queryData?.productName])

    async function createAndNavigateToProdList() {

        setRequiredFoields([])
        let isAnyInpEmpty = false;
        
        for (const key in productInfo) {
            
            if (!productInfo[key as keyof productsTypes]) {
                isAnyInpEmpty = true
                setRequiredFoields((prevState) => {
                          
                    return {...prevState, key}
                    
                })
            }
        }
        if (isAnyInpEmpty) {
            return
        }
        if (queryData?._id) {
            console.log(queryData?._id, 'wkingkjdf');
            let data = await createOrUpdateProduct({ ...productInfo, _id: queryData?._id })
            console.log(data, 'fdata');
            setBol(true)
        } else {
            console.log(productInfo,'info');
            await createOrUpdateProduct(productInfo)
            setBol(true)
        }
    }



    function renderRequiredFieldsError() {
        let feids = requiredField?.map((f, index) => {
            return <span key={index}>{`${f}  is required `}</span>
        })
        return feids
    }





    return (
        <div className='create-prod-container' >
            <div className='cre-prd-form-cont' >
                <div>
                    <h2> Prdocut Name </h2>
                </div>
                <input
                    type="text"
                    placeholder="Product Name"
                    name='productName'
                    value={productInfo?.productName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProductDetails(e) }}
                />

                <div>
                    <h2> Quantity(Kg/litr)</h2>
                </div>
                <input
                    type="text"
                    placeholder="Quantity"
                    value={productInfo.quantity}
                    name='quantity'
                    onChange={e => { Number(e.target.value) && setProductDetails(e) }}

                />
                <div>
                    <h2> Cost(R.s) </h2>
                </div>
                <input
                    type="text"
                    placeholder="Cost"
                    value={productInfo.cost}
                    name='cost'
                    onChange={e => { setProductDetails(e) }}

                />
                <div>

                    <h2> Price(R.s) </h2>
                </div>
                <input
                    type="text"
                    placeholder="Price" 
                    value={productInfo.price}
                    name='price'
                    onChange={e => { setProductDetails(e) }}

                />
            </div>

            <div style={{ color: 'red' }} className='required-field-error'>
                {requiredField && renderRequiredFieldsError()}
            </div>
            <div className='crea-prod-btns'>

                <NavLink to={`/store/products/ProductList`}>
                    Canceal
                </NavLink>
                <button onClick={createAndNavigateToProdList}>
                    
                    Save Product
                </button>


                {

                    // error?.includes('Already Exisits') ? <h1>Product Already Exsits</h1> : showBoundary(error?.message)
                }


            </div>

        </div>
    )

}

export default CreateProduct;
