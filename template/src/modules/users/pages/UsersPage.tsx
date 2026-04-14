import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../hooks/useUsers';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { AdvancedFilterSystem } from '@/components/dashboard/AdvancedFilterSystem';
import { RoleGuard } from '@/app/router/RoleGuard';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import type { User } from '../types';
import { useDialogState } from '@/hooks/useDialogState';
import { useAdvancedFilters } from '@/hooks/filter-systerm/useAdvancedFilters';
import { buildActiveFilters } from '@/hooks/filter-systerm/buildActiveFilters';
import { StatusBadge } from '@/components/ui/status-badge';
import { RowActions } from '@/components/ui/row-actions';
import { Badge } from '@/components/ui/badge';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import { DeleteUserDialog } from '../components/DeleteUserDialog';
import { UserFormDialog } from '../components/UserFormDialog';
import { UserDetailsDialog } from '../components/UserDetailsDialog';

export const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  const { 
    dialog,
    openCreate,
    openEdit,
    openView,
    openDelete,
    close
  } = useDialogState<User>();

  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    page,
    setPage,
    apiFilters
  } = useAdvancedFilters()

    // Queries & Mutations
  const { data, isLoading } = useUsers(apiFilters);
  console.log(data)

  const filterConfigs: any = useMemo(() => [
    {
      key: 'role',
      label: t('users.role'),
      placeholder: t('users.selectRole'),
      options: [
        { value: 'system_manager', label: t('users.systemManager') },
        { value: 'quality_manager', label: t('users.qualityManager') },
        { value: 'project_manager', label: t('users.projectManager') },
        { value: 'catering_manager', label: t('users.cateringManager') },
        { value: 'quality_supervisor', label: t('users.qualitySupervisor') },
        { value: 'quality_inspector', label: t('users.qualityInspector') },
      ],
    },
    {
      key: 'is_active',
      label: t('users.status'),
      placeholder: t('users.selectStatus'),
      options: [
        { value: '1', label: t('users.active') },
        { value: '0', label: t('users.inactive') },
      ],
    },

  ], [t]);  

  const activeFilters = useMemo(() => 
    buildActiveFilters(filters, filterConfigs),
    [filters, filterConfigs]
  )

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      header: '#',
      className: 'w-12 text-center text-muted-foreground font-medium',
      cell: (_, index) => index + 1,
      
    },
    {
      header: t('users.name'),
      accessorKey: 'name',
      cell: (user) => <div className="font-medium">{user.name}</div>
    },
    {
      header: t('users.email'),
      accessorKey: 'email',
      cell: (user) => <div className="text-muted-foreground">{user.email}</div>
    },
    {
      header: t('users.role'),
      accessorKey: 'role',
      cell: (user) => (
        <Badge variant="outline" className="capitalize">
          {user.role.replace(/_/g, ' ')}
        </Badge>
      )
    },
    {
      header: t('users.status'),
      accessorKey: 'is_active',
      cell: (user) => {
        return (
          <StatusBadge
            status={user.is_active}
            allowedRoles={['system_manager']}
          />
        )
      }
    },
    {
      header: t('users.actions'),
      className: 'text-left rtl:text-right',
      cell: (user) => (
        <RowActions
          row={user}
          actions={[
            {
              icon: Eye,
              variant: "view",
              onClick: (row) => openView(row)
            },
            {
              icon: Edit,
              variant: "edit",
              onClick: (row) => openEdit(row),
              allowedRoles: ['system_manager'],
            },
            {
              icon: Trash2,
              variant: "destructive",
              onClick: (row) => openDelete(row),
              allowedRoles: ['system_manager'],
            }
          ]}
        />
      )
    }
  ], [t])


    // Handlers
  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header Area */}
      <PageHeader
        title={t('users.title')}
        description={t('users.subtitle')}
      />

      <AdvancedFilterSystem
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={setFilter}
        onFilterRemove={removeFilter}
        onClearAllFilters={clearFilters}
        action={
          <RoleGuard allowedRoles={['system_manager']}>
            <Button
              className="px-6 hover:bg-primary/80"
              onClick={openCreate}>
                <Plus/>
              {t('users.addUser')}
            </Button>
          </RoleGuard>
        }
      />

      <DataTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        currentPage={page}
        totalPages={1}
        onPageChange={handlePageChange}
        emptyMessage={t('users.empty')}
      />

      <UserDetailsDialog
        open={dialog?.type === 'view'}
        onOpenChange={(open) => !open && close()}
        user={dialog?.type === 'view' ? dialog.item : null}
      />

      <UserFormDialog
        open={dialog?.type === 'create' || dialog?.type === 'edit'}
        onOpenChange={(open) => !open && close()}
        userToEdit={dialog?.type === 'edit' ? dialog.item : null}
      />
        
      <DeleteUserDialog
        open={dialog?.type === 'delete'}
        user={dialog?.type === 'delete' ? dialog.item : null}
        onClose={close}
      />

    </div>
  );
};
