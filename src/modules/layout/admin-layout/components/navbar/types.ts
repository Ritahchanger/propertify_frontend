import type { LucideIcon } from "lucide-react"

type UserRole = 'owner' | 'manager' | 'tenant' | 'accountant';

interface NotificationItem {
    id: string;
    type: 'payment' | 'maintenance' | 'application' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
}
interface NavigationItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    roles: UserRole[];
    dropdown?: DropdownItem[];
    badge?: string;
}

interface DropdownItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
}

export type { NavigationItem, NotificationItem, DropdownItem, UserRole }