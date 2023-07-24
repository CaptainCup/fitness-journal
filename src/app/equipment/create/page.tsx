import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  EquipmentForm,
  Container,
} from '@/app/components'
import { baseURL } from '@/app/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
  { label: 'Новое оборудование', href: '/equipment/create' },
]

export const metadata = {
  title: 'Добавить оборудование',
  description: 'Добавление оборудования на сайт.',
  keywords: 'фитнес тренировка упражнения оборудование',
  openGraph: {
    url: `${baseURL}/equipment/create`,
    title: 'Добавить оборудование',
    description: 'Добавление оборудования на сайт.',
    images: [
      {
        width: 600,
        height: 600,
        alt: 'Оборудование',
        url: `/images/logo-in-black.png`,
      },
    ],
  },
}

const EquipmentCreate: NextPage = () => {
  return (
    <main>
      <PageTitle title="Новое оборудование" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <EquipmentForm />
      </Container>
    </main>
  )
}

export default EquipmentCreate
