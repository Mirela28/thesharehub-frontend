import { useEffect, useState } from 'react'
import { getReceivedRequests, getSentRequests, changeStatus } from '../services/RentService';
import RequestsTable from '../components/tables/RequestsTable';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

export default function Requests() {

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



  return (
    <div className="mt-5 w-full flex flex-col  gap-10">

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

      <RequestsTable
        title="Requests You Sent"
        page={sentPage}
        loading={sentLoading}
        errors={errors}
        onPageChange={(page) => setSentPagination(prev => ({ ...prev, page }))}
        showActions={false}
        userField="rentier"
      />

    </div>
  );
}
