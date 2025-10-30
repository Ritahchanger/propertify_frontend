import { FileText } from "lucide-react";
const DocumentsTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: "Lease Agreement",
            type: "PDF",
            date: "2024-01-15",
          },
          { name: "House Rules", type: "PDF", date: "2024-01-15" },
          {
            name: "Payment Receipt - Jan 2025",
            type: "PDF",
            date: "2025-01-01",
          },
          {
            name: "Payment Receipt - Dec 2024",
            type: "PDF",
            date: "2024-12-01",
          },
          {
            name: "Maintenance Guidelines",
            type: "PDF",
            date: "2024-01-15",
          },
        ].map((doc, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-neutral-300"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {doc.type}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{doc.name}</h4>
            <p className="text-sm text-gray-600">Uploaded: {doc.date}</p>
            <button className="w-full mt-3 bg-white border border-neutral-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors duration-200">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;
