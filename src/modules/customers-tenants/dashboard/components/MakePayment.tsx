import { CreditCard, AlertCircle, X } from "lucide-react";
import { useState } from "react";

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
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Validate M-Pesa number format (Kenyan format)
  const isValidMpesaNumber = (number: string): boolean => {
    const cleanedNumber = number.replace(/\s/g, "");
    const mpesaRegex = /^(254|\+254|0)?[17]\d{8}$/;
    return mpesaRegex.test(cleanedNumber);
  };

  // Check if M-Pesa number is valid for button disabling
  const isMpesaNumberValid =
    mpesaNumber.trim() && isValidMpesaNumber(mpesaNumber);

  const handlePaymentClick = () => {
    if (paymentMethod === "mpesa") {
      setShowMpesaModal(true);
    } else {
      handlePayment();
    }
  };

  const handleMpesaPayment = async () => {
    if (!mpesaNumber.trim()) {
      alert("Please enter your M-Pesa number");
      return;
    }

    if (!isValidMpesaNumber(mpesaNumber)) {
      alert("Please enter a valid M-Pesa number");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would integrate with your actual M-Pesa API
      console.log(
        `Processing M-Pesa payment of KSh ${paymentAmount} to ${mpesaNumber}`
      );

      // Call the original handlePayment function
      handlePayment();

      // Reset and close modal
      setMpesaNumber("");
      setShowMpesaModal(false);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatMpesaNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format based on length
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      9
    )} ${digits.slice(9, 12)}`;
  };

  const handleMpesaNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMpesaNumber(e.target.value);
    setMpesaNumber(formatted);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    // Enforce exact payment amount - user cannot change the amount
    if (newAmount !== tenantData.upcomingPayment.amount) {
      alert(
        `Payment amount must be exactly KSh ${tenantData.upcomingPayment.amount}`
      );
      return;
    }
    setPaymentAmount(newAmount);
  };

  return (
    <>
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Make Payment
        </h3>
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
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
              readOnly
              title="Payment amount cannot be modified"
            />
            <p className="text-xs text-gray-500 mt-1">
              Amount is fixed at KSh {tenantData.upcomingPayment.amount}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <button
            onClick={handlePaymentClick}
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <CreditCard className="h-5 w-5 mr-2" />
            )}
            {isProcessing ? "Processing..." : `Pay KSh ${paymentAmount} Now`}
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                Payments are processed securely. Please ensure you have
                sufficient funds in your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* M-Pesa Modal */}
      {showMpesaModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                M-Pesa Payment
              </h3>
              <button
                onClick={() => setShowMpesaModal(false)}
                className="text-gray-400 hover:text-gray-600"
                disabled={isProcessing}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Payment Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    KSh {paymentAmount}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Pay to: Propertify Rent
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={mpesaNumber}
                  onChange={handleMpesaNumberChange}
                  placeholder="254 712 345 678"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    mpesaNumber && !isMpesaNumberValid
                      ? "border-red-300 bg-red-50"
                      : "border-neutral-300"
                  }`}
                  disabled={isProcessing}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Enter your M-Pesa registered phone number
                  </p>
                  {mpesaNumber && !isMpesaNumberValid && (
                    <p className="text-xs text-red-600 font-medium">
                      Invalid M-Pesa number
                    </p>
                  )}
                  {mpesaNumber && isMpesaNumberValid && (
                    <p className="text-xs text-green-600 font-medium">
                      ✓ Valid number
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Payment Instructions:
                </h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>
                    Ensure you have sufficient funds in your M-Pesa account
                  </li>
                  <li>You will receive a confirmation prompt on your phone</li>
                  <li>Enter your M-Pesa PIN to complete the payment</li>
                  <li>Wait for confirmation message</li>
                </ol>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowMpesaModal(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMpesaPayment}
                  disabled={isProcessing || !isMpesaNumberValid}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : null}
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MakePayment;
