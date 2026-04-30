import { memo, type FC } from 'react'
import { IPizzaProps } from '../types'

const Pizza: FC<IPizzaProps> = memo(
  ({ name, description, image = 'https://picsum.photos/200' }) => {
    return (
      <div className="pizza">
        <h1>{name}</h1>
        <p>{description}</p>
        <img src={image} alt={name} />
      </div>
    )
  },
)

export default Pizza
