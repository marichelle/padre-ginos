export interface ICartItem {
  pizza: IPizza
  price: number
  size: PizzaSize
}

export interface ICartProps {
  cart: ICartItem[]
  checkout: () => Promise<void>
}

export interface IPizza {
  id: string
  name: string
  description: string
  sizes: Record<PizzaSize, number>
  category: string
  image: string
}

export interface IPizzaProps {
  name: string
  description: string
  image?: string
}

export type PizzaSize = 'S' | 'M' | 'L'
