import { memo, type FC } from 'react'

interface PizzaProps {
  name: string
  description: string
  image: string
}

const Pizza: FC<PizzaProps> = memo(({ name, description, image }) => {
  console.info('🚀 -> Pizza -> name:', name)
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image} alt={name} />
    </div>
  )
})

export default Pizza
