'use client'

import { FC, memo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Button, Card, Title, ModalMuscules } from '@/app/components'
import { Muscule, MusculeObject } from '@/app/types/Exercise'

export type CardsGridEditorMusculesProps = {
  title: string
  value?: Muscule[]
  onChange?: (value: string[]) => void
}

const CardsGridEditorMuscules: FC<CardsGridEditorMusculesProps> = ({
  title,
  value,
  onChange = () => null,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [cards, setCards] = useState<any>([])

  const handleModalToggle = useCallback(() => setModalOpen(draft => !draft), [])

  const handleModalApply = useCallback(
    (newCards: any) => {
      const updatedCards = [...cards, ...newCards]

      setCards(updatedCards)
      onChange(updatedCards.map(({ value }) => value))
    },
    [cards, onChange],
  )

  const handleDeleteExercise = useCallback(
    (index: number) => {
      const updatedCards = [...cards.slice(0, index), ...cards.slice(index + 1)]

      setCards(updatedCards)
      onChange(updatedCards.map(({ value }) => value))
    },
    [cards, onChange],
  )

  useEffect(() => {
    if (value) {
      setCards(
        value?.map(muscule => ({
          title: MusculeObject[muscule].name,
          img: MusculeObject[muscule].image,
          value: muscule,
        })),
      )
    }
  }, [value])

  return (
    <>
      <div>
        <Title
          extra={
            <Button className="py-1 px-2 min-w-max" onClick={handleModalToggle}>
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
          {cards?.map((card: any, index: number) => (
            <Card
              key={card?.name}
              title={card.name}
              img={card.image}
              menu={[
                {
                  label: 'Убрать',
                  danger: true,
                  onClick: () => handleDeleteExercise(index),
                },
              ]}
              {...card}
            />
          ))}
        </div>
      </div>

      <ModalMuscules
        title="Выберите группу мышц"
        open={modalOpen}
        exclude={cards.map(({ value }: { value: string }) => value)}
        onClose={handleModalToggle}
        onApply={handleModalApply}
      />
    </>
  )
}

export default memo(CardsGridEditorMuscules)
