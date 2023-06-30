import { NextPage } from 'next'
import { PageTitle, Breadcrumbs, CardsGrid, Container } from '@/app/components'
import { EquipmentService } from '@/app/services'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
]

export const metadata = {
  title: 'Оборудование',
}

const EquipmentPage: NextPage = async () => {
  const equipmentApi = new EquipmentService()

  const serverData = await equipmentApi
    .getList()
    .then(res => res)
    .catch(() => [])

  return (
    <main>
      <PageTitle title="Оборудование" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            withSearch
            addLink="/equipment/create"
            addCaption="Добавить оборудование"
            cards={serverData.map(({ _id, name, image }) => ({
              _id,
              title: name,
              img: image,
              link: `equipment/${_id}`,
            }))}
          />
        </div>
      </Container>
    </main>
  )
}

export default EquipmentPage
