import { FC, memo } from 'react';
import { Card } from '@/app/components';
import { CardProps } from '../Card/Card';

type CardsGridProps = {
  title: string;
  cards: CardProps[];
};

const CardsGrid: FC<CardsGridProps> = ({ title, cards }) => {
  return (
    <div>
      <h4 className="text-xl w-full border-b-4 border-black mb-5">{title}</h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default memo(CardsGrid);
