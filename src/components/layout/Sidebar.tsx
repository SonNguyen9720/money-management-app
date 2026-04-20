import { NavLink } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { navigationItems } from './navigationConfig';
import '../../styles/sidebar.css';

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Premium Tier
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name || 'User'}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
        )}
        <button 
          className="sidebar-nav-item" 
          onClick={logout}
          style={{ 
            width: '100%', 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer', 
            marginTop: 'var(--spacing-sm)',
            padding: 'var(--spacing-md)',
            textAlign: 'left'
          }}
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
