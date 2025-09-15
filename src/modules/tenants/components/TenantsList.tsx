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
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/lib/components/ui/dropdown-menu';
import { Button } from '@/lib/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card"
import { getStatusBadge } from '../utils/utils';
import { Badge } from '@/lib/components/ui/badge';
const TenantsList = ({ filteredTenants, handleAction, tenants }: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Tenants ({filteredTenants.length})</CardTitle>
                <CardDescription>Manage your property tenants</CardDescription>
            </CardHeader>
            <CardContent>
                {filteredTenants.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {tenants.length === 0 ? 'No tenants found' : 'No tenants match your search criteria'}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTenants.map((tenant: any) => (
                            <div key={tenant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h4 className="font-semibold text-gray-900">
                                                {tenant.firstName} {tenant.lastName}
                                            </h4>
                                            {getStatusBadge(tenant.status)}
                                            <Badge variant="outline" className="text-xs">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {tenant.unitNumber}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Mail className="h-3 w-3 mr-1" />
                                                {tenant.email}
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="h-3 w-3 mr-1" />
                                                {tenant.phone}
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="h-3 w-3 mr-1" />
                                                KES {tenant.rentAmount.toLocaleString()}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                Lease ends: {new Date(tenant.leaseEndDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Tenant
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {tenant.status === 'active' ? (
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
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TenantsList