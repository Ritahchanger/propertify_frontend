import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card"
import { Progress } from "@/lib/components/ui/progress"
const FinancialRations = ({ financialData }: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Expense Ratio</CardTitle>
                    <CardDescription>Expenses as % of income</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-center">
                        {Math.round((financialData.totalExpenses / financialData.totalIncome) * 100)}%
                    </div>
                    <Progress
                        value={(financialData.totalExpenses / financialData.totalIncome) * 100}
                        className="mt-4"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">
                        Target: &lt;40%
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profit Margin</CardTitle>
                    <CardDescription>Net profit as % of income</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-center text-green-600">
                        {Math.round((financialData.netIncome / financialData.totalIncome) * 100)}%
                    </div>
                    <Progress
                        value={(financialData.netIncome / financialData.totalIncome) * 100}
                        className="mt-4"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">
                        Industry avg: 60%
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Collection Efficiency</CardTitle>
                    <CardDescription>Payment collection rate</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-center text-blue-600">
                        {financialData.collectionRate}%
                    </div>
                    <Progress
                        value={financialData.collectionRate}
                        className="mt-4"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">
                        Target: &gt;95%
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default FinancialRations