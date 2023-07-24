import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExercisesListView,
  Container,
} from '@/app/components'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'
import { baseURL } from '@/app/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
]

export const metadata = {
  title: 'Упражнения',
  description:
    'Добро пожаловать на раздел фитнес-упражнений на нашем сайте! Здесь вы найдете все, что нужно для поддержания здоровья и красоты своего тела. Мы предлагаем разнообразные упражнения для всех групп мышц, включая кардио-тренировки, силовые тренировки и растяжку. Наша команда профессиональных тренеров поможет вам подобрать индивидуальную программу тренировок и даст советы по питанию. Присоединяйтесь к нам и начните свой путь к здоровому и подтянутому телу уже сегодня!',
  keywords: 'фитнес тренировка упражнения',
  openGraph: {
    url: `${baseURL}/exercises`,
    title: 'Упражнения',
    description:
      'Добро пожаловать на раздел фитнес-упражнений на нашем сайте! Здесь вы найдете все, что нужно для поддержания здоровья и красоты своего тела. Мы предлагаем разнообразные упражнения для всех групп мышц, включая кардио-тренировки, силовые тренировки и растяжку. Наша команда профессиональных тренеров поможет вам подобрать индивидуальную программу тренировок и даст советы по питанию. Присоединяйтесь к нам и начните свой путь к здоровому и подтянутому телу уже сегодня!',
    images: [
      {
        width: 600,
        height: 600,
        alt: 'Упражнения',
        url: `/images/logo-in-black.png`,
      },
    ],
  },
}

const Exercises: NextPage = async () => {
  const currentUser = await getCurrentUser()

  const isTrainer = currentUser?.admin?.includes(AdminPermissions.trainer)

  return (
    <main>
      <PageTitle title="Упражнения" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExercisesListView isTrainer={isTrainer} />
        </div>
      </Container>
    </main>
  )
}

export default Exercises
