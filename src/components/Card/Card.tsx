import React, { ReactNode } from 'react';
import style from './Card.module.scss';

const { card } = style;

type Props = {
  children: ReactNode;
};

export const Card = ({ children }: Props) => {
  return <div className={card}>{children}</div>;
};
