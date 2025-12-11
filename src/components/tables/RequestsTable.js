import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function RequestsTable({
  title,
  page,
  loading,
  errors,
  onStatusChange,
  onPageChange,
  showActions = true,
  userField = "requester"
}) {

  const navigate = useNavigate();

  if (!page) {
    return <div className="px-20">{loading ? "Loading..." : "No data"}</div>;
  }

  const requests = page.content;
  const currentPage = page.number;
  const totalPages = page.totalPages;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600";
      case "REJECTED":
        return "text-red-600";
      case "CANCELLED":
        return "text-black";
      case "ONGOING":
        return "text-yellow-500";
      case "COMPLETED":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className='flex px-20 flex-col w-full'>

      <h1 className="mt-5 text-[2rem] justify-center font-bold leading-tight tracking-tight text-[#0A236D]">
        {title}
      </h1>

      {loading && <p className="mt-5 text-blue-500">Loading requests...</p>}

      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
        </div>
      )}

      <div className="mt-7 px-20 w-full bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-[1rem] text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                User
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Item
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                End Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className='px-6 py-4 text-center'>
                  No requests found
                </td>
              </tr>
            )}

            {requests.map((r) => {
              const user = r[userField];
              return (
                <tr key={r.id} className='bg-neutral-primary border-b border-default'>
                  <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    {r.id}
                  </td>
                  <td className="px-6 py-4 cursor-pointer text-blue-600 hover:underline" onClick={() => navigate(`/accountpage/${user.id}`)}>{user.username}</td>
                  <td className="px-6 py-4">{r.item.name}</td>
                  <td className="px-6 py-4">{formatDate(r.startDate)}</td>
                  <td className="px-6 py-4">{formatDate(r.endDate)}</td>
                  <td className="px-6 py-4 text-center">
                    {showActions && r.status === "PENDING" ? (
                      <div className='flex gap-2 justify-center'>
                        <button
                          className='bg-green-500 text-white px-3 py-1 rounded'
                          onClick={() => onStatusChange(r.id, "APPROVED")}
                        >
                          Accept
                        </button>
                        <button
                          className='bg-red-500 text-white px-3 py-1 rounded'
                          onClick={() => onStatusChange(r.id, "REJECTED")}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className={`font-medium ${getStatusColor(r.status)}`}>
                        {r.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>

            <span>Page {currentPage + 1} / {totalPages}</span>

            <button
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}

      </div>

    </div>
  )
}
