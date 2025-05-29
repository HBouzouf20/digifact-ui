import { User } from 'src/app/models/user.model';

export type Permission =
    | 'view:equipments'
    | 'create:equipments'
    | 'update:equipments'
    | 'delete:equipments'
    | 'view:brands'
    | 'create:brands'
    | 'update:brands'
    | 'delete:brands'
    | 'view:categories'
    | 'create:categories'
    | 'update:categories'
    | 'delete:categories'
    | 'view:clients'
    | 'create:clients'
    | 'update:clients'
    | 'delete:clients'
    | 'view:orders'
    | 'create:orders'
    | 'update:orders'
    | 'delete:orders'
    | 'view:issues'
    | 'create:issues'
    | 'update:issues'
    | 'delete:issues'
    | 'view:invoice'
    | 'create:invoice'
    | 'update:invoice'
    | 'delete:invoice'
    | 'details:invoice'
    | 'view:repairs'
    | 'create:repairs'
    | 'update:repairs'
    | 'delete:repairs'
    | 'details:repairs'
    | 'editStatus:repairs'
    | 'view:profile'
    | 'editStatus:orders';
export type Role = '[ROLE_USER]' | '[ROLE_ADMIN]';

const ROLES: any = {
    '[ROLE_ADMIN]': [
        'view:equipments',
        'create:equipments',
        'update:equipments',
        'delete:equipments',
        'view:brands',
        'create:brands',
        'update:brands',
        'delete:brands',
        'view:categories',
        'create:categories',
        'update:categories',
        'delete:categories',
        'view:clients',
        'create:clients',
        'update:clients',
        'delete:clients',
        'view:orders',
        'create:orders',
        'update:orders',
        'delete:orders',
        'view:issues',
        'create:issues',
        'update:issues',
        'delete:issues',
        'view:repairs',
        'create:repairs',
        'update:repairs',
        'delete:repairs',
        'view:invoice',
        'create:invoice',
        'update:invoice',
        'delete:invoice',
        'details:repairs',
        'editStatus:repairs',
        'editStatus:orders',
        'view:profile',
    ],
    '[ROLE_USER]': [
        'view:equipments',
        'create:equipments',
        'view:orders',
        'create:orders',
        'view:brands',
        'create:brands',
        'view:categories',
        'create:categories',
        'view:categories',
        'create:categories',
        'view:invoice',
        'create:invoice',
        'view:invoice',
        'create:invoice',
        'view:issues',
        'create:issues',
        'view:repairs',
        'create:repairs',
        'view:clients',
        'create:clients',
        'create:repairs',
        'details:repairs',
        'editStatus:repairs',
        'editStatus:orders',
    ],
} as const;

export function hasPermission(user: User, permission: Permission) {
    return (
        ROLES[user.profile as Role] as readonly Permission[]
    ).includes(permission);
}
