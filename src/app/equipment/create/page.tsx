import { NextPage } from 'next';
import {
  PageTitle,
  Breadcrumbs,
  ExersiseStepsEditor,
  ImageUpload,
  TextInput,
  TextArea,
  Button,
  Title,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
  { label: 'Новое оборудование', href: '/equipment/create' },
];

export const metadata = {
  title: 'Добавить новое оборудование',
};

const EquipmentCreate: NextPage = () => {
  return (
    <main>
      <PageTitle title="Новое оборудование" withBack />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <Title>Описание оборудования</Title>

        <div className="mb-5 sm:mb-10">
          <ImageUpload id="equipment-image" />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput placeholder="Название оборудования" />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextArea placeholder="Описание оборудования" />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor title="Порядок настройки" />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button>Добавить оборудование</Button>
        </div>
      </section>
    </main>
  );
};

export default EquipmentCreate;
