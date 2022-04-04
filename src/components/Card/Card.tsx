import React, { ReactNode } from 'react';
import style from './Card.module.scss';

const { card, cardTitle } = style;

type Props = {
  children: ReactNode;
  title: string;
};

export const Card = ({ children, title }: Props) => {
  return (
    <div className={card}>
      <div className={cardTitle}>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};
