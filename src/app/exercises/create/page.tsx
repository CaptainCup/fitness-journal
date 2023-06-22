import { NextPage } from 'next';
import {
  PageTitle,
  Breadcrumbs,
  ExersiseStepsEditor,
  ImageUpload,
  TextInput,
  TextArea,
  CardsGridEditor,
  Button,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: 'Новое упражнение', href: '/exercises/create' },
];

export const metadata = {
  title: 'Добавить новое упражнение',
};

const ExerciseCreate: NextPage = () => {
  return (
    <main>
      <PageTitle title="Новое упражнение" withBack />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <h4 className="text-xl w-full border-b-4 border-black mb-5">
          Описание упражнения
        </h4>

        <div className="mb-5 sm:mb-10">
          <ImageUpload id="exercise-image" />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput placeholder="Название упражнения" />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextArea placeholder="Описание упражнения" />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor title="Порядок выполнения" />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor type="muscules" title="Задействованные мышцы" />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor type="equipment" title="Используемое оборудование" />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor type="exercises" title="Похожие упражнения" />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button>Добавить упражнение</Button>
        </div>
      </section>
    </main>
  );
};

export default ExerciseCreate;
