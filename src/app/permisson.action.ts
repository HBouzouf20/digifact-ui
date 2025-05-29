
export interface PermissionActions {
    canAddItem : () => boolean;
    canViewItem : () => boolean;
    canDeleteItem : () => boolean;
    canUpdateItem : () => boolean;
    canEditStatusItem? : () => boolean;
}