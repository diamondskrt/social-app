import { NavLink } from 'react-router-dom';

import { Icon } from '@/components/shared/icon';
import { cn } from '@/lib/utils';

import { links } from './constants';

export function Footer() {
  return (
    <footer className="md:hidden sticky bottom-0 bg-primary-foreground shadow-inner z-50 rounded-t-[20px] px-5 py-4">
      <ul className="flex justify-between">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.route}
              className={({ isActive }) =>
                cn(
                  isActive && 'bg-primary text-white',
                  'flex items-center gap-3 rounded-[12px] hover:bg-secondary p-3'
                )
              }
            >
              <Icon name={link.icon} width={20} height={20} />
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}
