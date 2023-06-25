import { FC, memo } from 'react';
import { SocialLink, Container } from '@/app/components';

//TODO: Норм теги для мета данных

const Footer: FC = () => {
  return (
    <footer className="bg-black py-10">
      <Container>
        <div className="text-white uppercase grid grid-cols-1 sm:grid-cols-2 gap-y-5">
          <div>
            <p>Фитнес клуб X-Fit «Новый»</p>
            <p>Иркутск, ул, Советская, 58, корп. 1</p>
          </div>
          <div className="text-left sm:text-right">
            <p>07:00 - 23:00 будни</p>
            <p>08:00 - 22:00 выходные</p>
          </div>
          <div>
            <p>+7 (3952) 792-500</p>
            <p>
              <a className="text-lime-400" href="mailto:sale@xfit38.ru">
                sale@xfit38.ru
              </a>
            </p>
          </div>
          <div className="flex justify-start sm:justify-end">
            <SocialLink
              social="vk"
              href="https://vk.com/xfit_irk"
              className="mr-5"
            />
            <SocialLink social="telegram" href="https://t.me/Xfit38_bot" />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default memo(Footer);
