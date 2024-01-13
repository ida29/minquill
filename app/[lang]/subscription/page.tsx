"use client";

import { useState } from "react";
import getStripe from "@/app/_utils/getStripe";

export default function Page() {
  const [plan, setPlan] = useState<string>("price_1OUPd3I8Qz2P8OvlWRAyNXco");

  const handleCreateCheckoutSession = async (productId: string) => {
    const res = await fetch(`/api/stripe/checkout-session`, {
      method: "POST",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const checkoutSession = await res.json().then((value) => {
      return value.session;
    });

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);
  };

  return (
    <div className="m-auto w-fit flex flex-col justify-center">
      <button onClick={() => handleCreateCheckoutSession(plan)}>
        Got To Checkout
      </button>
    </div>
  );
}
