'use client';

import { Fragment, memo, FC, useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Card } from '@/app/components';
import muscules from '@/app/mock/muscules';
import exercises from '@/app/mock/exercises';
import equipment from '@/app/mock/equipment';
import { CardProps } from '../Card/Card';

const data = {
  muscules,
  exercises,
  equipment,
};

type ModalGridProps = {
  open: boolean;
  title: string;
  type: 'muscules' | 'exercises' | 'equipment';
  onCancel: () => void;
  onConfirm: (value: CardProps[]) => void;
};

const ModalGrid: FC<ModalGridProps> = ({
  open,
  title,
  type = 'muscules',
  onCancel,
  onConfirm,
}) => {
  const [checked, setChecked] = useState<CardProps[]>([]);

  const handleCardClick = useCallback((card: CardProps) => {
    setChecked((draft) =>
      draft.some((draftCard) => draftCard.title === card.title)
        ? draft.filter((value) => value !== card)
        : [...draft, card]
    );
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(checked);
    onCancel();
  }, [checked, onConfirm, onCancel]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-5 align-middle shadow-xl transition-all">
                <Dialog.Title as="h4" className="text-lg text-center mb-5">
                  {title}
                </Dialog.Title>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-5">
                  {data[type].map((card) => (
                    <Card
                      key={card.title}
                      {...card}
                      checked={checked.some(
                        (checkedCard) => checkedCard.title === card.title
                      )}
                      onClick={() => handleCardClick(card)}
                    />
                  ))}
                </div>

                <div className="w-full flex justify-center">
                  <Button onClick={handleConfirm}>Подтвердить</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(ModalGrid);
