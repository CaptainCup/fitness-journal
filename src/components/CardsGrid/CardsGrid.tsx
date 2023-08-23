import { FC } from 'react'
import { Card, Title } from '@/components'
import { CardProps } from '@/components/Card/Card'

export type CardsGridProps = {
  /**
   * Grid title
   */
  title?: string

  /**
   * Cards in grid
   */
  cards: CardProps[]
}

/**
 * Show cards in grid
 */
const CardsGrid: FC<CardsGridProps> = ({ title, cards }) => {
  return (
    <div>
      {title && <Title>{title}</Title>}

      <div className="grid gap-2 lg:gap-5 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {cards.map(card => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}

export default CardsGrid
