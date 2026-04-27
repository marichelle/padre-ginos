import { createContext, Dispatch, SetStateAction } from 'react'
import { ICartItem } from './types'

export const CartContext = createContext<
  [ICartItem[], Dispatch<SetStateAction<ICartItem[]>>]
>([[], () => {}])
