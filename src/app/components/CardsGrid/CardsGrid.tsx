import { FC, memo } from 'react';
import { Card, Title } from '@/app/components';
import { CardProps } from '../Card/Card';

type CardsGridProps = {
  title?: string;
  cards: CardProps[];
  cardAction?: 'link' | 'check' | 'none';
};

const CardsGrid: FC<CardsGridProps> = ({ title, cards }) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <div className="grid gap-2 lg:gap-5 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default memo(CardsGrid);
