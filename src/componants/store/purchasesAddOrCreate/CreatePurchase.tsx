import { useBase64Query } from '../../../hooks/useBase64Query';
import { useLocation, useParams } from 'react-router-dom';
import AddModal from '../AddModal';
import "../../../karyanaStoreStyless/AddModal.css"
import { useErrorBoundary } from 'react-error-boundary';
import {BuyerTypes, AddQuanityTypes} from './types';
import axiosApi from '../../../axios/axiosApi';
const CreatePurchase = () => {

    const { showBoundary } = useErrorBoundary()
    const { queryData, setQuery, navigateTo } = useBase64Query()
    let { productId } = useParams();
    const { pathname } = useLocation();

    async function savePurchases({ buyerName, quantity, price }:BuyerTypes) {
        try {
           const data = await axiosApi.post('/createPurchase',
                {
                    productName: queryData?.productName,
                    buyerName,
                    quantity,
                    cost: queryData?.cost,
                    price,
                    store: queryData?.store,
                    product: queryData.productId
                }

            )
             console.log(data);

            let ProdInfo = {
                ...queryData,
                quantity: queryData?.quantity  - Number(quantity)
            }

            let prodBtoaData = btoa(JSON.stringify(ProdInfo))
            setQuery('product', prodBtoaData);
            
            
            navigateTo(`/store/products/Sales/${productId}`, null)

        } catch (error) {
            showBoundary(error)
        }
    }

    const addQuanity = ({value, setPrice, setQuantity}:AddQuanityTypes) => {
        const {productDet} = queryData

        if (value >= queryData?.quantity) {
            setPrice(queryData?.price * queryData?.quantity)
            setQuantity(queryData?.quantity)
        } else {
            setPrice(queryData?.price * value)
            setQuantity(value);
        }

    }

    return (
        <>
            {queryData ?
                <AddModal
                    // productDet={queryData}
                    // pathReceived={pathname}
                    addQuanity={({value, setPrice, setQuantity}:AddQuanityTypes) => { addQuanity({value, setPrice, setQuantity}) }}
                    savePurchases={(product:BuyerTypes) => savePurchases(product) } /> : ''}
        </>
    )

}

export default CreatePurchase;