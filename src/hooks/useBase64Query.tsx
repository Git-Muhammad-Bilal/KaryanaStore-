import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QuerydataTypes, product, PurchaseTypes } from './quyeryDataTypes'

export const useBase64Query = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryData, setQueryData] = useState<QuerydataTypes>({} as QuerydataTypes)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        extract();
    }, [location.pathname, location.search]);



    const extract = () => {
      
        let encoded =  searchParams.get('product')
        let decoded = atob(encoded || '');
        encoded && setQueryData(JSON.parse(decoded));
    }

    const setQuery = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);

    }

    const genPath = (path: string) => `${path}?${searchParams?.toString()}`

    const navigateTo = (path: string, minuOne: number | null) => {
        minuOne ? navigate(minuOne) :
            navigate(genPath(path), {replace:true});
    }
    return { searchParams, queryData, setQuery, navigateTo, genPath }

}