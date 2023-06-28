import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  EquipmentForm,
  Container,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
  { label: 'Новое оборудование', href: '/equipment/create' },
]

export const metadata = {
  title: 'Добавить новое оборудование',
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
