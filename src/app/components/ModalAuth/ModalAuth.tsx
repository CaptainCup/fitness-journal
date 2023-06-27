'use client';

import React, { FC, memo, useState } from 'react';
import { Button, ImageUpload, Modal, TextInput } from '@/app/components';

type PhoneFormProps = {
  onSuccess: () => void;
};

const PhoneForm: FC<PhoneFormProps> = ({ onSuccess }) => {
  return (
    <div className="flex flex-col">
      <TextInput
        placeholder="Введите номер телефона"
        className="mb-5 sm:mb-10"
      />
      <Button onClick={onSuccess}>Получить код</Button>
    </div>
  );
};

type CodeFormProps = {
  onBack: () => void;
  onSuccess: () => void;
};

const CodeForm: FC<CodeFormProps> = ({ onBack, onSuccess }) => {
  return (
    <div className="flex flex-col">
      <TextInput placeholder="Введите код" className="mb-5 sm:mb-10" />
      <div className="flex">
        <Button className="mr-5 w-full" onClick={onBack}>
          Назад
        </Button>
        <Button className="w-full" onClick={onSuccess}>
          Далее
        </Button>
      </div>
    </div>
  );
};

type ProfileFormProps = {
  onBack: () => void;
  onSuccess: () => void;
};

const ProfileForm: FC<ProfileFormProps> = ({ onBack, onSuccess }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-5 sm:mb-10">
        <ImageUpload square />
      </div>

      <div className="mb-5 sm:mb-10">
        <TextInput placeholder="Имя" />
      </div>

      <div className="mb-5 sm:mb-10">
        <TextInput placeholder="Фамилия" />
      </div>

      <div className="mb-5 sm:mb-10">
        <TextInput placeholder="Отчество" />
      </div>

      <div className="mb-5 sm:mb-10">
        <TextInput placeholder="Телефон" />
      </div>

      <div className="flex">
        <Button className="mr-5 w-full" onClick={onBack}>
          Назад
        </Button>
        <Button className="w-full" onClick={onSuccess}>
          Готово
        </Button>
      </div>
    </div>
  );
};

export type ModalAuthProps = {
  open: boolean;
  onCancel: () => void;
};

const ModalAuth: FC<ModalAuthProps> = ({ open, onCancel }) => {
  const [step, setStep] = useState<'phone' | 'code' | 'profile'>('phone');

  const titles = {
    phone: 'Вход в систему',
    code: 'Введите код',
    profile: 'Введите данные',
  };

  const steps = {
    phone: <PhoneForm onSuccess={() => setStep('code')} />,
    code: (
      <CodeForm
        onBack={() => setStep('phone')}
        onSuccess={() => setStep('profile')}
      />
    ),
    profile: (
      <ProfileForm onBack={() => setStep('code')} onSuccess={onCancel} />
    ),
  };

  return (
    <Modal open={open} onCancel={onCancel} title={titles[step]}>
      {steps[step]}
    </Modal>
  );
};

export default memo(ModalAuth);
