import { NextPage } from 'next'
import { PageTitle, Container, MainPageCard } from '@/app/components'
import { getCurrentUser } from '@/app/services-server'

export const metadata = {
  title: 'Добро пожаловать в X-Fit!',
}

const Trainings: NextPage = async () => {
  const currentUser = await getCurrentUser()

  const { _id } = currentUser || {}

  const cards = [
    {
      title: 'Оборудование',
      description:
        'Посмотрите какое оборудование есть в клубе и как его можно настроить.',
      image: '/images/main/main-equipment.jpg',
      href: '/equipment',
    },
    {
      title: 'Упражнения',
      description:
        'Ознакомьтесь с упражнениями и выберите те, которые подходят вам лучше всего.',
      image: '/images/main/main-exercises.jpg',
      href: '/exercises',
    },
    {
      title: 'Клуб X-Fit',
      description: 'Следите за успехами других участников клуба.',
      image: '/images/main/main-club.jpg',
      href: '/users',
    },
    {
      title: 'Тренировки',
      description:
        'Записывайте в дневник тренировок свои занятия и следите за их результатами.',
      image: '/images/main/main-trainings.jpg',
      ...(_id
        ? { href: `/trainings/${_id}` }
        : { attentionText: 'Требуется регистрация' }),
    },
  ]

  return (
    <main>
      <PageTitle title="Добро пожаловать в X-Fit!" />
      <Container>
        {cards.map(card => (
          <div key={card.title} className="mb-5 sm:mb-10">
            <MainPageCard {...card} />
          </div>
        ))}
      </Container>
    </main>
  )
}

export default Trainings
