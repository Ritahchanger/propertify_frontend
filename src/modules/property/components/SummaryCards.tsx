import { CardContent, Card } from "@/lib/components/ui/card"
import { Building2, Home, Users, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"
const SummaryCards = ({ summaryStats }: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-600 text-sm font-medium">Total Properties</p>
                            <p className="text-2xl font-bold text-blue-900">{summaryStats.totalProperties}</p>
                        </div>
                        <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-600 text-sm font-medium">Total Units</p>
                            <p className="text-2xl font-bold text-green-900">{summaryStats.totalUnits}</p>
                        </div>
                        <Home className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-600 text-sm font-medium">Occupancy</p>
                            <p className="text-2xl font-bold text-purple-900">{summaryStats.occupancyRate}%</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-600 text-sm font-medium">Monthly Revenue</p>
                            <p className="text-2xl font-bold text-emerald-900">KSh {(summaryStats.totalRevenue / 1000000).toFixed(1)}M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-emerald-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-600 text-sm font-medium">Maintenance</p>
                            <p className="text-2xl font-bold text-orange-900">{summaryStats.totalMaintenanceRequests}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-indigo-600 text-sm font-medium">Occupied Units</p>
                            <p className="text-2xl font-bold text-indigo-900">{summaryStats.totalOccupied}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-indigo-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SummaryCards