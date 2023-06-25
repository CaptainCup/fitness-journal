'use client';

import { Fragment, memo, FC, useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Card, TextInput } from '@/app/components';
import muscules from '@/app/mock/muscules';
import exercises from '@/app/mock/exercises';
import equipment from '@/app/mock/equipment';
import { CardProps } from '../Card/Card';
import classNames from 'classnames';

import styles from './ModalGrid.module.css';

const data = {
  muscules,
  exercises,
  equipment,
};

type ModalGridProps = {
  open: boolean;
  title: string;
  type: 'muscules' | 'exercises' | 'equipment';
  withSearch?: boolean;
  onCancel: () => void;
  onConfirm: (value: CardProps[]) => void;
};

const ModalGrid: FC<ModalGridProps> = ({
  open,
  title,
  type = 'muscules',
  withSearch,
  onCancel,
  onConfirm,
}) => {
  const [checked, setChecked] = useState<CardProps[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

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
          <div className=" flex min-h-full items-center justify-center p-5 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl transform overflow-hidden bg-white p-5 align-middle shadow-xl transition-all">
                <button
                  className={classNames(
                    styles.close,
                    'absolute top-2 right-2 w-8 h-8  bg-lime-400'
                  )}
                  onClick={onCancel}
                />

                <Dialog.Title as="h4" className="text-lg text-center mb-5 px-5">
                  {title}
                </Dialog.Title>

                {withSearch && (
                  <div className="mb-5 md: md-10">
                    <TextInput
                      delay={1500}
                      placeholder="Поиск"
                      onChange={handleSearch}
                      clear
                    />
                  </div>
                )}

                <div
                  className={classNames(
                    styles.grid,
                    'grid gap-2 md:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-5'
                  )}
                >
                  {data[type]
                    .filter(({ title }) =>
                      title.toLocaleLowerCase().includes(search)
                    )
                    .map((card) => (
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
