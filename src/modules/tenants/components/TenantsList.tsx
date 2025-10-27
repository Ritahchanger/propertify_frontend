import {
    Eye,
    Edit,
    Ban,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    Calendar,
    DollarSign,
    MoreHorizontal,
    Building,
    User,
    FileText,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/lib/components/ui/dropdown-menu';
import { Button } from '@/lib/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card"
import { Badge } from '@/lib/components/ui/badge';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';

// Status badge utility function
const getStatusBadge = (status: string) => {
    const statusConfig = {
        active: { variant: "default" as const, label: "Active" },
        inactive: { variant: "secondary" as const, label: "Inactive" },
        suspended: { variant: "destructive" as const, label: "Suspended" },
        pending: { variant: "outline" as const, label: "Pending" },
        approved: { variant: "default" as const, label: "Approved" },
        rejected: { variant: "destructive" as const, label: "Rejected" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "outline" as const, label: status };

    return (
        <Badge variant={config.variant} className="text-xs">
            {config.label}
        </Badge>
    );
};

interface TenantsListProps {
    filteredTenants: any[];
    handleAction: (action: string, tenant: any) => void;
}

const TenantsList = ({ filteredTenants, handleAction }: TenantsListProps) => {
    const { tenants, loading, error } = useSelector((state: RootState) => state.tenants);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Tenants ({filteredTenants.length})</CardTitle>
                <CardDescription>Manage your property tenants and their lease information</CardDescription>
            </CardHeader>
            <CardContent>
                {filteredTenants.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {tenants.length === 0 ? 'No tenants found' : 'No tenants match your search criteria'}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTenants.map((tenant) => (
                            <div key={tenant.tenantId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        {/* Header with tenant info */}
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <h4 className="font-semibold text-gray-900">
                                                    {tenant.personalInfo.fullName}
                                                </h4>
                                            </div>
                                            {getStatusBadge(tenant.personalInfo.userStatus)}
                                            {getStatusBadge(tenant.applicationDetails.applicationStatus)}
                                        </div>

                                        {/* Personal Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center">
                                                <Mail className="h-3 w-3 mr-2" />
                                                <span className="truncate">{tenant.personalInfo.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="h-3 w-3 mr-2" />
                                                {tenant.personalInfo.phone}
                                            </div>
                                            <div className="flex items-center">
                                                <FileText className="h-3 w-3 mr-2" />
                                                ID: {tenant.personalInfo.idNumber}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-2" />
                                                Applied: {new Date(tenant.applicationDetails.appliedAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {/* Unit and Estate Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center">
                                                <MapPin className="h-3 w-3 mr-2" />
                                                <div>
                                                    <div className="font-medium">Unit {tenant.unitDetails.unitNumber}</div>
                                                    <div className="text-xs text-gray-500">{tenant.estateDetails.estateName}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="h-3 w-3 mr-2" />
                                                <div>
                                                    <div>KES {parseFloat(tenant.unitDetails.monthlyRent).toLocaleString()}/month</div>
                                                    <div className="text-xs text-gray-500">
                                                        {tenant.unitDetails.bedrooms} bed • {tenant.unitDetails.bathrooms} bath
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Building className="h-3 w-3 mr-2" />
                                                <div>
                                                    <div>{tenant.estateDetails.location}</div>
                                                    <div className="text-xs text-gray-500 capitalize">
                                                        {tenant.unitDetails.unitStatus}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lease Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-2" />
                                                <div>
                                                    <div>Move-in: {new Date(tenant.applicationDetails.preferredMoveInDate).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {tenant.applicationDetails.rentDurationMonths} months lease
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <FileText className="h-3 w-3 mr-2" />
                                                <div>
                                                    <div>KRA PIN: {tenant.applicationDetails.kraPin}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Emergency: {tenant.emergencyContact.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Dropdown */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => handleAction('view', tenant)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleAction('edit', tenant)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Tenant
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            
                                            {/* Status-based actions */}
                                            {tenant.personalInfo.userStatus === 'active' ? (
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleAction('suspend', tenant)}
                                                >
                                                    <Ban className="mr-2 h-4 w-4" />
                                                    Suspend Tenant
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem
                                                    className="text-green-600"
                                                    onClick={() => handleAction('activate', tenant)}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Activate Tenant
                                                </DropdownMenuItem>
                                            )}

                                            {/* Application status actions */}
                                            {tenant.applicationDetails.applicationStatus === 'pending' && (
                                                <>
                                                    <DropdownMenuItem
                                                        className="text-green-600"
                                                        onClick={() => handleAction('approve', tenant)}
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Approve Application
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => handleAction('reject', tenant)}
                                                    >
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Reject Application
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TenantsList;