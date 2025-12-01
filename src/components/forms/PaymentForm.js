import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios';

export default function PaymentForm({ amount, onSuccess }) {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements)
            return;

        setLoading(true);
        setMessage(null);

        try {
            const response = await axios.post('http://localhost:8080/payments/createpayment',
                { amount: amount * 100 },
                { withCredentials: true }
            );

            const clientSecret = response.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if(result.error){
                setMessage(result.error.message);
            } else if (result.paymentIntent?.status === "succeeded") {
                setMessage("Payment Successful");
                onSuccess();
            }
        } catch (error) {
            if (error.response?.data) {
                setMessage(error.response.data.message || "An error occurred.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <CardElement className="p-2 border border-gray-300 rounded" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className={`mt-2 w-48 h-10 text-white font-medium rounded-lg text-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Processing...' : `Pay ${amount} €`}
            </button>
            {message && <p className="text-red-500 text-sm mt-1">{message}</p>}
        </form>
    );
}
