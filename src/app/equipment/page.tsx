import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  Container,
  EquipmentListView,
} from '@/app/components'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
]

export const metadata = {
  title: 'Оборудование',
}

const EquipmentPage: NextPage = async () => {
  const currentUser = await getCurrentUser()

  const isTrainer = currentUser?.admin?.includes(AdminPermissions.trainer)

  return (
    <main>
      <PageTitle title="Оборудование" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <EquipmentListView isTrainer={isTrainer} />
        </div>
      </Container>
    </main>
  )
}

export default EquipmentPage
