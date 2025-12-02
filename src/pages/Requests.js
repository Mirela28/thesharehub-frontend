import { useEffect, useState } from 'react'
import { getReceivedRequests, getSentRequests, changeStatus } from '../services/RentService';
import RequestsTable from '../components/tables/RequestsTable';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

export default function Requests() {

  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [receivedLoading, setReceivedLoading] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadReceived();
    loadSent();
  }, []);

  const loadReceived = async () => {
    setReceivedLoading(true);

    const { success, data, errorMessages = [] } = await getReceivedRequests();

    if (success) {
      setReceived(data)
    } else {
      setErrors(errorMessages || []);
    }

    setReceivedLoading(false);
  }

  const loadSent = async () => {
    setSentLoading(true);

    const { success, data, errorMessages = [] } = await getSentRequests();

    if (success) {
      setSent(data)
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
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {

      received.forEach(req => {
        stompClient.subscribe(`/topic/rents/${req.id}`, (message) => {
          const update = JSON.parse(message.body);

          setReceived(prev => 
            prev.map(r => r.id === update.id ? update : r)
          );
        });
      });

      sent.forEach(req => {
        stompClient.subscribe(`/topic/rents/${req.id}`, (message) => {
          const update = JSON.parse(message.body);

          setSent(prev => 
            prev.map(r => r.id === update.id ? update : r)
          );
        });
      });

    });

    return () => {
      stompClient.disconnect();
    };

  }, [received, sent]);

  return (
    <div className="mt-5 w-full flex flex-col  gap-10">

      <RequestsTable
        title="Requested Your Offers"
        requests={received}
        loading={receivedLoading}
        errors={errors}
        onStatusChange={handleStatusChange}
        showActions={true}
        userField="requester"
      />

      <RequestsTable
        title="Requests You Sent"
        requests={sent}
        loading={sentLoading}
        errors={errors}
        showActions={false}
        userField="rentier"
      />

    </div>
  );
}
