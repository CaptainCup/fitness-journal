'use client'

import { FC, memo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Button, ModalGrid, Card, Title } from '@/app/components'

const captions = {
  muscules: {
    change: 'Изменить группы мышц',
    add: 'Добавить группу мышц',
    title: 'Выберите группу мышц',
  },
  exercises: {
    change: 'Изменить упражнения',
    add: 'Добавить упражнения',
    title: 'Выберите упражнения',
  },
  equipment: {
    change: 'Изменить оборудование',
    add: 'Добавить оборудование',
    title: 'Выберите оборудование',
  },
}

type CardsGridEditorProps = {
  title: string
  type: 'muscules' | 'exercises' | 'equipment'
  value?: any[]
  onChange?: (value: string[]) => void
}

const CardsGridEditor: FC<CardsGridEditorProps> = ({
  title,
  type = 'muscules',
  value,
  onChange = () => null,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [cards, setCards] = useState<any>([])

  const handleModalToggle = useCallback(() => setModalOpen(draft => !draft), [])

  const handleCardClick = useCallback(
    (card: any) => {
      const updatedCards = cards.some(
        (draftCard: any) => draftCard._id === card._id,
      )
        ? cards.filter((value: any) => value._id !== card._id)
        : [...cards, card]

      setCards(updatedCards)
      onChange(updatedCards)
    },
    [cards, onChange],
  )

  useEffect(() => {
    if (value) {
      setCards(value)
    }
  }, [value])

  return (
    <>
      <div>
        <Title
          extra={
            <Button className="py-1 px-2" onClick={handleModalToggle}>
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="Добавить"
              />
            </Button>
          }
        >
          {title}
        </Title>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {cards?.map((card: any) => (
            <Card
              key={card?.name}
              title={card.name}
              img={card.image}
              menu={[{ label: 'Убрать', onClick: () => handleCardClick(card) }]}
              {...card}
            />
          ))}
        </div>
      </div>

      <ModalGrid
        title={captions[type].title}
        endpoint={type}
        open={modalOpen}
        checked={cards}
        onCancel={handleModalToggle}
        handleCardClick={handleCardClick}
      />
    </>
  )
}

export default memo(CardsGridEditor)
