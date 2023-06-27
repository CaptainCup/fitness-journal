import { NextPage } from 'next';
import {
  PageTitle,
  Breadcrumbs,
  ExersiseStepsEditor,
  ImageUpload,
  TextInput,
  Textarea,
  Button,
  Title,
  Container,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клиенты', href: '/clients' },
  { label: 'Новый клиент', href: '/clients/create' },
];

export const metadata = {
  title: 'Добавить нового клиента',
};

const EquipmentCreate: NextPage = () => {
  return (
    <main>
      <PageTitle title="Новый клиент" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 items-center">
          <div className="mb-5 sm:mb-10">
            <ImageUpload square />
          </div>

          <div>
            <div className="mb-5 sm:mb-10">
              <TextInput placeholder="Имя" />
            </div>

            <div className="mb-5 sm:mb-10">
              <TextInput placeholder="Фамилия" />
            </div>

            <div className="mb-5 sm:mb-10">
              <TextInput placeholder="Отчество" />
            </div>

            <div className="mb-5 sm:mb-10">
              <TextInput placeholder="Телефон" />
            </div>
          </div>
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button>Добавить клиента</Button>
        </div>
      </Container>
    </main>
  );
};

export default EquipmentCreate;
