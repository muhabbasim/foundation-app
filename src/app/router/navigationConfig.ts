import type { ElementType } from 'react';
import type { UserRole } from '../store/useAuthStore';
import {
  LayoutDashboard, Users,
  CheckSquare, ClipboardList
} from 'lucide-react';

export type NavItem = {
  label: string;
  path: string;
  icon: ElementType;
};

// Map each Role to their specific allowed Navigation paths
export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  system_manager: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
  ],
  quality_manager: [
    { label: 'Dashboard', path: '/manager/dashboard', icon: LayoutDashboard },
    { label: 'Team', path: '/team', icon: Users },
  ],
  quality_supervisor: [
    { label: 'Dashboard', path: '/supervisor/dashboard', icon: LayoutDashboard },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  ],
  quality_inspector: [
    { label: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'My Tasks', path: '/tasks', icon: ClipboardList },
  ],
  project_manager: []
};
