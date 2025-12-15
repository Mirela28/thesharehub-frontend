import { useEffect, useState } from 'react'
import { getReceivedRequests, getSentRequests, changeStatus } from '../services/RentService';
import RequestsTable from '../components/tables/RequestsTable';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

export default function Requests() {

  const [activeView, setActiveView] = useState("RECEIVED");
  const [receivedPage, setReceivedPage] = useState(null);
  const [sentPage, setSentPage] = useState(null);
  const [receivedLoading, setReceivedLoading] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [receivedPagination, setReceivedPagination] = useState(
    { page: 0, size: 5 });
  const [sentPagination, setSentPagination] = useState(
    { page: 0, size: 5 });


  useEffect(() => {
    loadReceived();
  }, [receivedPagination]);

  useEffect(() => {
    loadSent();
  }, [sentPagination]);


  const loadReceived = async () => {
    setReceivedLoading(true);

    const { success, data, errorMessages = [] } = await getReceivedRequests(receivedPagination);

    if (success) {
      setReceivedPage(data)
    } else {
      setErrors(errorMessages || []);
    }

    setReceivedLoading(false);
  }

  const loadSent = async () => {
    setSentLoading(true);

    const { success, data, errorMessages = [] } = await getSentRequests(sentPagination);

    if (success) {
      setSentPage(data)
    } else {
      setErrors(errorMessages || []);
    }

    setSentLoading(false);
  }

  const handleStatusChange = async (id, newStatus) => {
    const { success, errorMessages } = await changeStatus(id, newStatus);

    if (!success) {
      setErrors(errorMessages);
      return;
    }

    alert('Status Changed');

    loadReceived();
  };

  useEffect(() => {
    if (!receivedPage || !receivedPage.content) return;
    if (!sentPage || !sentPage.content) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {

      receivedPage.content.forEach(req => {
        stompClient.subscribe(`/topic/rents/${req.id}`, (message) => {
          const update = JSON.parse(message.body);

          setReceivedPage(prev => ({
            ...prev,
            content: prev.content.map(r =>
              r.id === update.id ? update : r
            )
          }));
        });
      });

      sentPage.content.forEach(req => {
        stompClient.subscribe(`/topic/rents/${req.id}`, (message) => {
          const update = JSON.parse(message.body);

          setSentPage(prev => ({
            ...prev,
            content: prev.content.map(r =>
              r.id === update.id ? update : r
            )
          }));
        });
      });

    });

    return () => stompClient.disconnect();

  }, [receivedPage, sentPage]);

  const receivedPendingCount = receivedPage?.content.filter(r => r.status === "PENDING").length || 0;
  const sentPendingCount = sentPage?.content.filter(r => r.status === "PENDING").length || 0;

  return (
    <div className="mt-5 w-full flex flex-col gap-10 mb-20">

      <div className="flex justify-center border-b border-gray-200">
        <button
          onClick={() => setActiveView("RECEIVED")}
          className={`px-6 py-3 text-sm font-medium transition-colors
      ${activeView === "RECEIVED"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Requested Your Offers
          {receivedPendingCount > 0 && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {receivedPendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView("SENT")}
          className={`px-6 py-3 text-sm font-medium transition-colors
      ${activeView === "SENT"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Requests You Sent
          {sentPendingCount > 0 && (
        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
          {sentPendingCount}
          </span>
      )}
        </button>
      </div>


      {activeView === "RECEIVED" && (
        <RequestsTable
          title="Requested Your Offers"
          page={receivedPage}
          loading={receivedLoading}
          errors={errors}
          onStatusChange={handleStatusChange}
          onPageChange={(page) => setReceivedPagination(prev => ({ ...prev, page }))}
          showActions={true}
          userField="requester"
        />
      )}

      {activeView === "SENT" && (
        <RequestsTable
          title="Requests You Sent"
          page={sentPage}
          loading={sentLoading}
          errors={errors}
          onPageChange={(page) => setSentPagination(prev => ({ ...prev, page }))}
          showActions={false}
          userField="rentier"
        />
      )}

    </div>
  );
}
