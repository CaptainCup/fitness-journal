import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  Container,
  EquipmentListView,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
]

export const metadata = {
  title: 'Оборудование',
}

const EquipmentPage: NextPage = async () => {
  return (
    <main>
      <PageTitle title="Оборудование" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <EquipmentListView />
        </div>
      </Container>
    </main>
  )
}

export default EquipmentPage
