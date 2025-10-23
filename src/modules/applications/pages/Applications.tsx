import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import Layout from "@/modules/layout/admin-layout/Layout";
import {
  clearApplications,
  clearSelectedApplication,
  clearError,
  fetchOwnerApplications,
  fetchApplicationStats,
  updateApplicationStatus,
  fetchApplicationById,
} from "@/modules/property/features/ApplicationsSlice";

// Shadcn UI Components
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/lib/components/ui/dialog";
import { Textarea } from "@/lib/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import { Separator } from "@/lib/components/ui/separator";
import { ScrollArea } from "@/lib/components/ui/scroll-area";

const Applications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, applicationStats, loading, error, pagination } =
    useSelector((state: RootState) => state.applications);

  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedAppId, setSelectedAppId] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchOwnerApplications({ page: 1, limit: 10 }));
    dispatch(fetchApplicationStats());

    // Cleanup on unmount
    return () => {
      dispatch(clearApplications());
      dispatch(clearSelectedApplication());
    };
  }, [dispatch]);

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    dispatch(
      fetchOwnerApplications({
        page: 1,
        limit: 10,
        status: status === "all" ? undefined : status,
      })
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(
      fetchOwnerApplications({
        page,
        limit: 10,
        status: selectedStatus === "all" ? undefined : selectedStatus,
      })
    );
  };

  const handleApprove = (applicationId: string) => {
    if (window.confirm("Are you sure you want to approve this application?")) {
      dispatch(
        updateApplicationStatus({
          applicationId,
          status: "approved",
        })
      );
    }
  };

  const handleReject = (applicationId: string) => {
    setSelectedAppId(applicationId);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (rejectionReason.trim()) {
      dispatch(
        updateApplicationStatus({
          applicationId: selectedAppId,
          status: "rejected",
          rejectionReason,
        })
      );
      setShowRejectModal(false);
      setRejectionReason("");
    } else {
      alert("Please provide a rejection reason");
    }
  };

  const handleViewDetails = async (applicationId: string) => {
    try {
      const result = await dispatch(
        fetchApplicationById(applicationId)
      ).unwrap();
      setSelectedApplication(result.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Failed to fetch application details:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusVariants: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
      withdrawn: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };

    return (
      <Badge
        variant="secondary"
        className={statusVariants[status] || "bg-gray-100"}
      >
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (loading && applications.length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tenant Applications
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review tenant applications for your properties
          </p>
        </div>

        {/* Stats Cards */}
        {applicationStats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              {
                label: "Total Applications",
                value: applicationStats.total,
                color: "blue",
              },
              {
                label: "Pending Review",
                value: applicationStats.pending,
                color: "yellow",
              },
              {
                label: "Approved",
                value: applicationStats.approved,
                color: "green",
              },
              {
                label: "Rejected",
                value: applicationStats.rejected,
                color: "red",
              },
              {
                label: "Withdrawn",
                value: applicationStats.withdrawn,
                color: "gray",
              },
            ].map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`rounded-full bg-${stat.color}-100 p-3`}>
                      <span
                        className={`text-${stat.color}-600 font-bold text-lg`}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-700 hover:text-red-900 text-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <label className="font-medium text-gray-700">
                Filter by Status:
              </label>
              <Select value={selectedStatus} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Applications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto text-sm text-gray-500">
                Showing {applications.length} of {pagination.totalCount}{" "}
                applications
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.applicationId} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.applicant.firstName}{" "}
                        {application.applicant.lastName}
                      </h3>
                      {getStatusBadge(application.applicationStatus)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">
                          Property:
                        </span>
                        <div className="text-gray-900">
                          {application.unit.estate.name}
                        </div>
                        <div className="text-gray-600">
                          Unit {application.unit.unitNumber}
                        </div>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Rent Details:
                        </span>
                        <div className="text-gray-900">
                          KSh{" "}
                          {parseFloat(
                            application.unit.monthlyRent
                          ).toLocaleString()}
                          /month
                        </div>
                        <div className="text-gray-600">
                          {application.rentDurationMonths} months
                        </div>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Move-in Date:
                        </span>
                        <div className="text-gray-900">
                          {formatDate(application.preferredMoveInDate)}
                        </div>
                        <div className="text-gray-600">
                          Applied on {formatDate(application.appliedAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleViewDetails(application.applicationId)
                      }
                    >
                      View Details
                    </Button>

                    {application.applicationStatus === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleApprove(application.applicationId)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            handleReject(application.applicationId)
                          }
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {applications.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500 text-lg font-medium">
                No applications found
              </div>
              <div className="text-gray-400 mt-2">
                {selectedStatus !== "all"
                  ? `No ${selectedStatus} applications at the moment`
                  : "No applications have been submitted yet"}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages} •{" "}
                  {pagination.totalCount} total applications
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-[900px] w-full  max-h-[90vh]">
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    Application Details
                    {getStatusBadge(selectedApplication.applicationStatus)}
                  </DialogTitle>
                  <DialogDescription>
                    Complete information for{" "}
                    {selectedApplication.applicant.firstName}{" "}
                    {selectedApplication.applicant.lastName}'s application
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[calc(90vh-200px)]">
                  <Tabs defaultValue="applicant" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="applicant">Applicant</TabsTrigger>
                      <TabsTrigger value="property">Property</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    <TabsContent value="applicant" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Full Name
                              </label>
                              <p className="text-sm">
                                {selectedApplication.applicant.firstName}{" "}
                                {selectedApplication.applicant.lastName}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Email
                              </label>
                              <p className="text-sm">
                                {selectedApplication.applicant.email}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Phone
                              </label>
                              <p className="text-sm">
                                {selectedApplication.applicant.phone}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                KRA PIN
                              </label>
                              <p className="text-sm">
                                {selectedApplication.kraPin}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Emergency Contact
                            </label>
                            <p className="text-sm">
                              {selectedApplication.emergencyContactName} -{" "}
                              {selectedApplication.emergencyContactPhone}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="property" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Property Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Estate
                              </label>
                              <p className="text-sm">
                                {selectedApplication.unit.estate.name}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Location
                              </label>
                              <p className="text-sm">
                                {selectedApplication.unit.estate.location}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Unit Number
                              </label>
                              <p className="text-sm">
                                {selectedApplication.unit.unitNumber}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Monthly Rent
                              </label>
                              <p className="text-sm">
                                KSh{" "}
                                {parseFloat(
                                  selectedApplication.unit.monthlyRent
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Bedrooms
                              </label>
                              <p className="text-sm">
                                {selectedApplication.unit.bedrooms}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Bathrooms
                              </label>
                              <p className="text-sm">
                                {selectedApplication.unit.bathrooms}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Lease Terms</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Preferred Move-in Date
                              </label>
                              <p className="text-sm">
                                {formatDate(
                                  selectedApplication.preferredMoveInDate
                                )}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Lease Duration
                              </label>
                              <p className="text-sm">
                                {selectedApplication.rentDurationMonths} months
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Supporting Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Employment Letter</p>
                                <p className="text-sm text-gray-500">
                                  Proof of income document
                                </p>
                              </div>
                              <Button asChild variant="outline">
                                <a
                                  href={selectedApplication.employmentLetterUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </Button>
                            </div>

                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">ID Copy</p>
                                <p className="text-sm text-gray-500">
                                  Government issued identification
                                </p>
                              </div>
                              <Button asChild variant="outline">
                                <a
                                  href={selectedApplication.idCopyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="timeline" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Application Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                Application Submitted
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDateTime(selectedApplication.appliedAt)}
                              </span>
                            </div>
                            {selectedApplication.reviewedAt && (
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                  Application Reviewed
                                </span>
                                <span className="text-sm text-gray-500">
                                  {formatDateTime(
                                    selectedApplication.reviewedAt
                                  )}
                                </span>
                              </div>
                            )}
                            {selectedApplication.rejectionReason && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm font-medium text-red-800">
                                  Rejection Reason
                                </p>
                                <p className="text-sm text-red-600 mt-1">
                                  {selectedApplication.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>

                <DialogFooter className="flex gap-2">
                  {selectedApplication.applicationStatus === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          handleApprove(selectedApplication.applicationId);
                          setShowDetailModal(false);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve Application
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleReject(selectedApplication.applicationId);
                        }}
                        variant="destructive"
                      >
                        Reject Application
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailModal(false)}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Rejection Modal */}
        <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this application. This
                will be shared with the applicant.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter detailed rejection reason..."
              className="h-32 resize-none"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmReject} variant="destructive">
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Applications;
