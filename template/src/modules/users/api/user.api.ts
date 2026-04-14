import { api } from "@/lib/api";
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserResponse,
} from "../types";
import { usersData } from "../data/usersData";
import type { UserFilters } from "../hooks/useUsers";

/**
 * Fetch users list
 */

export const getUsers = (_filters: UserFilters) => {
  return usersData;
}
// export const getUsers = (filters: UserFilters) => {
//   api.get<UsersResponse>("/users", {params: filters});
// }
/**
 * Fetch single user
 */
export const getUser = (id: string | number) =>
  api.get<UserResponse>(`/users/${id}/show`);

/**
 * Create user
 */
export const createUser = (payload: CreateUserPayload) =>
  api.post<UserResponse>("/users/create", payload);

/**
 * Update user
 */
export const updateUser = (
  id: string | number,
  payload: UpdateUserPayload
) =>
  api.post<UserResponse>(`/users/${id}/update`, payload);

/**
 * Toggle user active status
 */
export const toggleUserStatus = (id: string | number) =>
  api.patch<UserResponse>(`/users/${id}/toggle-active`);

/**
 * Delete user
 */
export const deleteUser = (id: string | number) =>
  api.delete(`/users/${id}/delete`);