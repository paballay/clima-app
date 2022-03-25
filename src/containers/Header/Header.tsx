import React from 'react';
import { Link } from 'react-router-dom';
import { HEADER_ITEMS } from '../../utils/constants';

export const Header = () => {
  return <ul>{ HEADER_ITEMS.map(e => <li key={e.id}><Link to={e.url}>{e.name}</Link></li>)}</ul>;
};
