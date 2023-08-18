import { NextPage } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { EquipmentListView } from '@/views'
import { getCurrentUser } from '@/services-server'
import { AdminPermissions } from '@/types'
import { baseURL } from '@/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
]

export const metadata = {
  title: 'Оборудование',
  description:
    'Добро пожаловать в раздел фитнес-оборудования на нашем сайте! У нас вы найдете все необходимое для занятий спортом и фитнесом. Мы предлагаем широкий выбор тренажеров, гантелей, ковриков и других аксессуаров для тренировок. Все наши товары высокого качества и соответствуют международным стандартам. Вы можете выбрать то, что подходит именно вам.',
  keywords: 'фитнес тренировка упражнения оборудование',
  openGraph: {
    url: `${baseURL}/equipment`,
    title: 'Оборудование',
    description:
      'Добро пожаловать в раздел фитнес-оборудования на нашем сайте! У нас вы найдете все необходимое для занятий спортом и фитнесом. Мы предлагаем широкий выбор тренажеров, гантелей, ковриков и других аксессуаров для тренировок. Все наши товары высокого качества и соответствуют международным стандартам. Вы можете выбрать то, что подходит именно вам.',
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
