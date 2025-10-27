import { CreditCard, AlertCircle } from "lucide-react";

// Define interfaces for the data structures
interface PaymentData {
  amount: number;
  dueDate: string;
  invoiceId: string;
}

interface TenantData {
  unit: {
    name: string;
  };
  upcomingPayment: PaymentData;
}

// Define the component props
interface MakePaymentProps {
  paymentAmount: number;
  setPaymentAmount: (amount: number) => void;
  tenantData: TenantData;
  handlePayment: () => void;
}

const MakePayment: React.FC<MakePaymentProps> = ({
  paymentAmount,
  setPaymentAmount,
  tenantData,
  handlePayment,
}) => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Make Payment</h3>
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Current Balance:</span>
          <span className="text-2xl font-bold text-gray-900">
            KSh {paymentAmount}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Due Date: {tenantData.upcomingPayment.dueDate}</span>
          <span>Invoice: {tenantData.upcomingPayment.invoiceId}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount (KSh)
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="mpesa">M-Pesa</option>
            <option value="card">Credit/Debit Card</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Pay KSh {paymentAmount} Now
        </button>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              Payments are processed securely. Please ensure you have sufficient
              funds in your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
