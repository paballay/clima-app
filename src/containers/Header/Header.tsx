import React from 'react';
import { Link } from 'react-router-dom';
import { HEADER_ITEMS } from 'utils/constants';
import styles from './Header.module.scss';

const { nav } = styles;

export const Header = () => {
  return (
    <nav className={nav}>
      <ul>
        { 
          HEADER_ITEMS.map(e => (
            <li key={e.id}>
              <Link to={e.url}>{e.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};
