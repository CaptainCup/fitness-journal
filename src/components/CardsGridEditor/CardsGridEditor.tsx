'use client'

import { FC, useState, useCallback, useEffect } from 'react'
import { Button, Card, Title, Image } from '@/components'
import { ModalList } from '@/modals'

export type CardsGridEditorProps = {
  /**
   * Grid title
   */
  title: string

  /**
   * Backend endpoint data
   */
  endpoint: string

  /**
   * Value as active cards
   */
  value?: any[]

  /**
   * OnChange handler
   */
  onChange?: (value: string[]) => void
}

/**
 * Change cards in grid
 */
const CardsGridEditor: FC<CardsGridEditorProps> = ({
  title,
  endpoint,
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
      onChange(updatedCards)
    },
    [cards, onChange],
  )

  const handleDeleteExercise = useCallback(
    (index: number) => {
      const updatedCards = [...cards.slice(0, index), ...cards.slice(index + 1)]

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
              image={card.image}
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

      <ModalList
        title={title}
        endpoint={endpoint}
        open={modalOpen}
        params={{ exclude: cards.map(({ _id }: { _id: string }) => _id) }}
        onClose={handleModalToggle}
        onApply={handleModalApply}
      />
    </>
  )
}

export default CardsGridEditor
