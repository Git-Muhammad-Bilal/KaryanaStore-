import { useBase64Query } from '../../../hooks/useBase64Query';
import { useParams } from 'react-router-dom';
import AddModal from '../AddModal';
import "../../../karyanaStoreStyless/AddModal.css"
import { useCreatePurchaseMutation } from '../../../reduxStore/karyanaStore/purchaseSlice';
import { BuyerTypes, AddQuanityTypes } from './types';


const EditPurchase = () => {

    const { queryData, setQuery, navigateTo } = useBase64Query()
    console.log(queryData, 'quyerdata');


    let { buyerOrProductId } = useParams();
    const [editPurchase] = useCreatePurchaseMutation()


    async function editPurc({ quantity, price }: BuyerTypes) {
        try {
            const data = await editPurchase(
                {

                    productName: queryData.productDet.productName,
                    buyerName: queryData?.purchase?.buyerName,
                    quantity,
                    cost: queryData?.productDet?.cost,
                    price,
                    store: queryData?.productDet?.store,
                    product: queryData?.productDet?.productId,
                    buyer: queryData?.purchase?.buyer,
                    _id: queryData?.purchase?._id

                }
            )
            let ProdInfo = {
                ...queryData.productDet,
                quantity: queryData.purchase.quantity + queryData.productDet.quantity - Number(quantity)
            }

            let prodBtoaData = btoa(JSON.stringify(ProdInfo))
            setQuery('product', prodBtoaData);
            queryData?.purchase?.buyer === Number(buyerOrProductId) ? navigateTo(`/store/products/ABuyerPurchases/${buyerOrProductId}`, null) :
                navigateTo(`/store/products/Purchases/${buyerOrProductId}`, null)

        } catch (error) {
            console.log(error);

        }
    }

    const addQuanity = ({ value, setPrice, setQuantity }: AddQuanityTypes) => {
        const { productDet, purchase } = queryData;
        console.log('quyer', productDet, purchase);
        if (value < Number(purchase?.quantity) + Number(productDet?.quantity)) {
            setPrice(productDet?.price * value)
            return setQuantity(value)

        }

        if (value >= productDet?.quantity) {
            setQuantity(productDet?.quantity + purchase?.quantity)
            setPrice(productDet?.price * purchase?.quantity + productDet?.quantity)
        }

    }


    return (
        <>
            {
                queryData?.purchase?.productName ?
                    <AddModal
                        // productDet={queryData.productDet}
                        // purchase={queryData.purchase}
                        addQuanity={({ value, setPrice, setQuantity }: AddQuanityTypes) => { addQuanity({ value, setPrice, setQuantity }) }}
                        savePurchases={(product: BuyerTypes) => { editPurc(product) }} />

                    :
                    ''

            }
        </>
    )

}

export default EditPurchase;