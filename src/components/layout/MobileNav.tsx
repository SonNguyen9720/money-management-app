import { NavLink } from 'react-router';
import { navigationItems } from './navigationConfig';
import '../../styles/mobile-nav.css';

export default function MobileNav() {
  const mobileItems = navigationItems.filter(item => item.mobileLabel);

  return (
    <nav className="mobile-nav">
      {mobileItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => 
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="material-symbols-outlined">
            {item.mobileIcon || item.icon}
          </span>
          <span>{item.mobileLabel}</span>
        </NavLink>
      ))}
    </nav>
  );
}
