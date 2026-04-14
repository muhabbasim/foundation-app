

import { useAuthStore } from "@/app/store/useAuthStore";
import { getStatusVariant } from "@/lib/status";
import type { UserRole } from "@/modules/users/types";
import { useTranslation } from "node_modules/react-i18next";
import { Badge } from "./badge";

interface StatusBadgeProps {
  status: boolean | number;
  onClick?: () => void;
  isLoading?: boolean;
  allowedRoles?: UserRole[] | undefined;
}

export function StatusBadge({
  status,
  onClick,
  allowedRoles
}: StatusBadgeProps) {
  const { t } = useTranslation();
  const { variant, labelKey, className } = getStatusVariant(status);

  const isAllowed = (allowedRoles: UserRole[] | undefined) => {
    const { user } = useAuthStore();
    return allowedRoles?.includes(user?.role as UserRole);
  }
  
  return (
    <Badge
      variant={variant}
      onClick={isAllowed(allowedRoles) ? onClick : undefined }
      className={`${className}
       ${isAllowed(allowedRoles) && "cursor-pointer"}`
      }
    >
      {t(labelKey)}
    </Badge>
  );
}