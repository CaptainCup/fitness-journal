import React, { FC, memo } from 'react';
import Image from 'next/image';
import styles from './Exercise.module.css';

type ExerciseProps = {
  name: string;
  img?: string;
};

const Exercise: FC<ExerciseProps> = ({ name, img }) => {
  return (
    <div
      className={`${styles.exercise} relative aspect-square border-b-4 border-lime-400`}
    >
      <Image src={img || '/logo-in-black.png'} alt={name} fill />
      <div className="absolute bottom-4 left-4">
        <h3 className={`${styles.title}  text-white`}>{name}</h3>
      </div>
    </div>
  );
};

export default memo(Exercise);
