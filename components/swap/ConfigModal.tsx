import React from 'react';

interface ConfigModalProps {
  onClose: () => void;
  slippageAmount: number;
  setSlippageAmount: (value: number) => void;
  deadlineMinutes: number;
  setDeadlineMinutes: (value: number) => void;
}

const ConfigModal: React.FC<ConfigModalProps> = (props) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={props.onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Transaction Settings</h4>

        {/* Slippage Tolerance */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Slippage Tolerance</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="number"
              className="flex-1 px-4 py-2 text-sm border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="1.0"
              value={props.slippageAmount}
              onChange={(e) => props.setSlippageAmount(parseFloat(e.target.value) || 0)}
            />
            <span className="bg-gray-200 text-gray-700 px-4 text-sm">%</span>
          </div>
        </div>

        {/* Transaction Deadline */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Transaction Deadline</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="number"
              className="flex-1 px-4 py-2 text-sm border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="10"
              value={props.deadlineMinutes}
              onChange={(e) => props.setDeadlineMinutes(parseInt(e.target.value) || 0)}
            />
            <span className="bg-gray-200 text-gray-700 px-4 text-sm">minutes</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          &#10005;
        </button>

        <button
          onClick={props.onClose}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfigModal;
