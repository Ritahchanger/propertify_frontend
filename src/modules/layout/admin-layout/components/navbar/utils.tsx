import {
    Users,
    DollarSign,
    Wrench,
    Bell,
    FileText,
} from 'lucide-react';
import type { NotificationItem, UserRole } from './data';
const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
        case 'payment': return DollarSign;
        case 'maintenance': return Wrench;
        case 'application': return Users;
        case 'lease': return FileText;
        default: return Bell;
    }
};

const getNotificationColor = (type: NotificationItem['type'], priority: NotificationItem['priority']) => {
    if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200';
    switch (type) {
        case 'payment': return 'bg-green-100 text-green-600 border-green-200';
        case 'maintenance': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
        case 'application': return 'bg-blue-100 text-blue-600 border-blue-200';
        case 'lease': return 'bg-purple-100 text-purple-600 border-purple-200';
        default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
};

const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
        case 'owner': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
        case 'manager': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
        case 'tenant': return 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg';
        case 'accountant': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getPriorityBadge = (priority: NotificationItem['priority']) => {
    switch (priority) {
        case 'high': return 'bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium';
        case 'medium': return 'bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium';
        case 'low': return 'bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium';
        default: return 'bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium';
    }
};

export { getNotificationIcon, getNotificationColor, getPriorityBadge, getRoleBadgeColor }