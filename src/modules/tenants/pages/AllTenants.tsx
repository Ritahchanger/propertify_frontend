import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { Badge } from '@/lib/components/ui/badge';
import { Input } from '@/lib/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Alert, AlertDescription } from '@/lib/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/lib/components/ui/dialog';
import { Label } from '@/lib/components/ui/label';
import { Textarea } from '@/lib/components/ui/textarea';
import {
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Phone,
    Mail,
    MapPin,
    Calendar,
    FileText,
    RefreshCw,
} from 'lucide-react';

// API service functions

import { getTenants, getTenantApplications, updateApplicationStatus, updateTenantStatus } from '../data/data';

import Layout from '@/modules/layout/admin-layout/Layout';

import { getStatusBadge } from '../utils/utils';

import TenantsList from '../components/TenantsList';

import Header from '../components/Header';
// TypeScript interfaces
interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    idNumber: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
}

interface Estate {
    id: string;
    name: string;
}

interface Unit {
    id: string;
    unitNumber: string;
    estateId: string;
}

interface Tenant extends User {
    unitId: string;
    unitNumber: string;
    rentAmount: number;
    moveInDate: string;
    leaseEndDate: string;
    emergencyContact: string;
    emergencyPhone: string;
}

interface TenantApplication {
    id: string;
    unitId: string;
    unitNumber: string;
    applicantId: string;
    applicantName: string;
    email: string;
    phone: string;
    preferredMoveInDate: string;
    rentDurationMonths: number;
    applicationStatus: 'pending' | 'approved' | 'rejected' | 'withdrawn';
    appliedAt: string;
    employmentLetterUrl?: string;
    idCopyUrl?: string;
    kraPin: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    rejectionReason?: string;
}

type ActionType = 'approve' | 'reject' | 'suspend' | 'activate' | null;

const AllTenants: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [estateFilter, setEstateFilter] = useState<string>('all');
    const [selectedTab, setSelectedTab] = useState<string>('tenants');
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [selectedApplication, setSelectedApplication] = useState<TenantApplication | null>(null);
    const [actionType, setActionType] = useState<ActionType>(null);
    const [actionReason, setActionReason] = useState<string>('');
    const [showActionDialog, setShowActionDialog] = useState<boolean>(false);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [applications, setApplications] = useState<TenantApplication[]>([]);
    const [estates, setEstates] = useState<Estate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [tenantsData, applicationsData, estatesData] = await Promise.all([
                    getTenants(),
                    getTenantApplications(),
                    Promise.resolve([])
                ]);

                setTenants(tenantsData);
                setApplications(applicationsData);
                setEstates(estatesData);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAction = (type: ActionType, tenant?: Tenant, application?: TenantApplication): void => {
        setActionType(type);
        setSelectedTenant(tenant || null);
        setSelectedApplication(application || null);
        setShowActionDialog(true);
        setActionReason('');
    };

    const confirmAction = async (): Promise<void> => {
        try {
            if (actionType === 'approve' || actionType === 'reject') {
                // Handle application approval/rejection
                if (selectedApplication) {
                    await updateApplicationStatus(
                        selectedApplication.id,
                        actionType === 'approve' ? 'approved' : 'rejected',
                        actionReason
                    );

                    // Update local state
                    setApplications(applications.map(app =>
                        app.id === selectedApplication.id
                            ? {
                                ...app,
                                applicationStatus: actionType === 'approve' ? 'approved' : 'rejected',
                                rejectionReason: actionType === 'reject' ? actionReason : undefined
                            }
                            : app
                    ));
                }
            } else if (actionType === 'suspend' || actionType === 'activate') {
                // Handle tenant status change
                if (selectedTenant) {
                    const newStatus = actionType === 'suspend' ? 'suspended' : 'active';
                    await updateTenantStatus(selectedTenant.id, newStatus);

                    // Update local state
                    setTenants(tenants.map(tenant =>
                        tenant.id === selectedTenant.id
                            ? { ...tenant, status: newStatus }
                            : tenant
                    ));
                }
            }

            setShowActionDialog(false);
            setActionType(null);
            setSelectedTenant(null);
            setSelectedApplication(null);
            setActionReason('');
        } catch (err) {
            setError('Failed to perform action. Please try again.');
            console.error('Error performing action:', err);
        }
    };

    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = `${tenant.firstName} ${tenant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const pendingApplications = applications.filter(app => app.applicationStatus === 'pending');

    const getActionTitle = (): string => {
        switch (actionType) {
            case 'approve': return 'Approve Application';
            case 'reject': return 'Reject Application';
            case 'suspend': return 'Suspend Tenant';
            case 'activate': return 'Activate Tenant';
            default: return 'Confirm Action';
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-gray-600">Loading tenant data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <Alert variant="destructive" className="max-w-md">
                    <AlertDescription>{error}</AlertDescription>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <Header tenants={tenants} pendingApplications={pendingApplications} setSearchTerm={setSearchTerm} setStatusFilter={setStatusFilter} setEstateFilter={setEstateFilter} />

                {/* Main Content */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="tenants">Current Tenants</TabsTrigger>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tenants" className="space-y-6">
                        {/* Search and Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search tenants..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tenants List */}

                        <TenantsList filteredTenants={filteredTenants} handleAction={handleAction} tenants={tenants} />

                    </TabsContent>

                    <TabsContent value="applications" className="space-y-6">
                        {/* Search and Filter for Applications */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search applications..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Select value={estateFilter} onValueChange={setEstateFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by Estate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Estates</SelectItem>
                                            {estates.map((estate) => (
                                                <SelectItem key={estate.id} value={estate.id}>
                                                    {estate.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Applications ({pendingApplications.length})</CardTitle>
                                <CardDescription>Review and manage tenant applications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {pendingApplications.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No pending applications at the moment
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pendingApplications.map((application) => (
                                            <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h4 className="font-semibold text-gray-900">{application.applicantName}</h4>
                                                            {getStatusBadge(application.applicationStatus)}
                                                            <Badge variant="outline" className="text-xs">
                                                                <MapPin className="h-3 w-3 mr-1" />
                                                                {application.unitNumber}
                                                            </Badge>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                                            <div className="flex items-center">
                                                                <Mail className="h-3 w-3 mr-1" />
                                                                {application.email}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Phone className="h-3 w-3 mr-1" />
                                                                {application.phone}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Calendar className="h-3 w-3 mr-1" />
                                                                Move-in: {new Date(application.preferredMoveInDate).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {application.rentDurationMonths} months
                                                            </div>
                                                        </div>

                                                        <div className="text-xs text-gray-500">
                                                            Applied: {new Date(application.appliedAt).toLocaleDateString()} •
                                                            KRA PIN: {application.kraPin} •
                                                            Emergency: {application.emergencyContactName} ({application.emergencyContactPhone})
                                                        </div>

                                                        <div className="flex items-center space-x-2 mt-2">
                                                            {application.employmentLetterUrl && (
                                                                <Button variant="outline" size="sm">
                                                                    <FileText className="h-3 w-3 mr-1" />
                                                                    Employment Letter
                                                                </Button>
                                                            )}
                                                            {application.idCopyUrl && (
                                                                <Button variant="outline" size="sm">
                                                                    <FileText className="h-3 w-3 mr-1" />
                                                                    ID Copy
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-green-600 border-green-600 hover:bg-green-50"
                                                            onClick={() => handleAction('approve', undefined, application)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                                            onClick={() => handleAction('reject', undefined, application)}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Action Confirmation Dialog */}
                <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{getActionTitle()}</DialogTitle>
                            <DialogDescription>
                                {actionType === 'approve' && 'This will approve the application and notify the applicant.'}
                                {actionType === 'reject' && 'This will reject the application. Please provide a reason.'}
                                {actionType === 'suspend' && 'This will suspend the tenant account. Please provide a reason.'}
                                {actionType === 'activate' && 'This will activate the tenant account.'}
                            </DialogDescription>
                        </DialogHeader>

                        {(actionType === 'reject' || actionType === 'suspend') && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="reason">
                                        {actionType === 'reject' ? 'Rejection Reason' : 'Suspension Reason'}
                                    </Label>
                                    <Textarea
                                        id="reason"
                                        value={actionReason}
                                        onChange={(e) => setActionReason(e.target.value)}
                                        placeholder={`Enter ${actionType === 'reject' ? 'rejection' : 'suspension'} reason...`}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmAction}
                                className={
                                    actionType === 'approve' || actionType === 'activate'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                }
                                disabled={(actionType === 'reject' || actionType === 'suspend') && !actionReason.trim()}
                            >
                                {actionType === 'approve' && 'Approve Application'}
                                {actionType === 'reject' && 'Reject Application'}
                                {actionType === 'suspend' && 'Suspend Tenant'}
                                {actionType === 'activate' && 'Activate Tenant'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
};

export default AllTenants;