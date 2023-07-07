import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  Container,
  UsersListView,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клуб X-Fit', href: '/users' },
]

export const metadata = {
  title: 'Клуб X-Fit',
}

const UsersPage: NextPage = async () => {
  return (
    <main>
      <PageTitle title="Клуб X-Fit" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <UsersListView />
        </div>
      </Container>
    </main>
  )
}

export default UsersPage
