import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from './store'

export const useAppSlector:TypedUseSelectorHook<RootState>= useSelector
export const useAppDispatch = ()=>useDispatch<AppDispatch>()