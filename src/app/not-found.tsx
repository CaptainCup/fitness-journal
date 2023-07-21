import { NextPage } from 'next'
import { PageTitle } from '@/app/components'

export const metadata = {
  title: 'Страница не найдена',
}

const NotFound: NextPage = () => {
  return (
    <main>
      <PageTitle title="Страница не найдена" withBack />
    </main>
  )
}

export default NotFound
