import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import equipment from '@/app/mock/equipment'
import { PageTitle, Breadcrumbs, CardsGrid, Container } from '@/app/components'
import { EquipmentService } from '@/app/services'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
]

export const metadata = {
  title: 'Оборудование',
}

export type EquipmentPageProps = { serverData: any }

const EquipmentPage: NextPage<EquipmentPageProps> = ({ serverData }) => {
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
            cards={equipment.map(equipmentItem => ({
              ...equipmentItem,
              link: `equipment/${equipmentItem.title}`,
            }))}
          />
        </div>
      </Container>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const equipmentApi = new EquipmentService(ctx)

  const serverData = await equipmentApi
    .getList()
    .then(res => res)
    .catch(() => [])

  return { props: { serverData } }
}

export default EquipmentPage
