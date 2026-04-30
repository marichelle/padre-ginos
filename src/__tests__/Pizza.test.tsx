import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import Pizza from '../components/Pizza'

describe('Pizza', () => {
  afterEach(cleanup)

  test('alt tag renders on Pizza image', () => {
    const name = 'My Favorite Pizza'
    const src = 'https://picsum.photos/200'
    const screen = render(
      <Pizza name={name} image={src} description="favorite pizza" />,
    )

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img.src).toBe(src)
    expect(img.alt).toBe(name)
  })

  test('default image displayed if none provided', () => {
    const name = 'My Least Favorite Pizza'
    const screen = render(<Pizza name={name} description="expensive pizza" />)

    // screen.debug()

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img.src).not.toBe('')
  })
})
