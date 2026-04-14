import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { LoginPage } from '../../modules/auth/LoginPage';
import { RegisterPage } from '../../modules/auth/RegisterPage';
import { LandingPage } from '../pages/LandingPage';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UsersPage } from '@/modules/users/pages/UsersPage';

/**
 * Placeholder components for the various dashboards 
 * (These will be eventually moved to their respective modules)
 */
const DummyDashboard = ({ title }: { title: string }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-500 mt-2">Welcome to your secure workspace.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  
  // Authentication Flow (Guest only - redirects if already logged in)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ]
      },
    ]
  },
  
  // Authenticated Application Shell
  {
    element: <DashboardLayout />,
    children: [
      // 1. Admin Route Group
      {
        path: '/admin',
        element: <ProtectedRoute allowedRoles={['system_manager']} />,
        children: [
          { path: 'dashboard', element: <DummyDashboard title="Admin Dashboard" /> },
          { path: 'users', element: <UsersPage /> },
          // Future routes: /admin/users, /admin/settings, etc.
        ]
      },

      // 2. Manager Route Group
      {
        path: '/manager',
        element: <ProtectedRoute allowedRoles={['project_manager']} />,
        children: [
          { path: 'dashboard', element: <DummyDashboard title="Manager Dashboard" /> },
        ]
      },

      // 3. Supervisor Route Group
      {
        path: '/supervisor',
        element: <ProtectedRoute allowedRoles={['quality_manager']} />,
        children: [
          { path: 'dashboard', element: <DummyDashboard title="Supervisor Dashboard" /> },
        ]
      },

      // 4. User Route Group
      {
        path: '/user',
        element: <ProtectedRoute allowedRoles={['quality_supervisor']} />,
        children: [
          { path: 'dashboard', element: <DummyDashboard title="User Dashboard" /> },
        ]
      }
    ],
  },
  
  // Catch all 404
  {
    path: '*',
    element: (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      </div>
    )
  }
]);
