import React from 'react'

export default function ConfirmModal({
    open,
    message,
    onConfirm,
    onClose
}) {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-md"
            >
                <div className="mt-4 text-center space-y-6">
                    <p className="text-gray-800 text-sm">
                        Are you sure you want to <strong>{message}</strong>?
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                        >Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
