import { Badge } from "@/lib/components/ui/badge";
const getStatusBadge = (status: string): JSX.Element => {
    const statusConfig = {
        active: { color: 'bg-green-100 text-green-800', label: 'Active' },
        inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
        suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended' },
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
        approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
        rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
        withdrawn: { color: 'bg-gray-100 text-gray-800', label: 'Withdrawn' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;

    return (
        <Badge className={`${config.color} border-0`}>
            {config.label}
        </Badge>
    );
};

export {  getStatusBadge  }