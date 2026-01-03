"use client";
import BillingForm from "../components/BillingForm";
import OrderSummary from "../components/OrderSummary";
import Reveal from "../../../utils/Reveal";

export default function CheckoutSection() {
  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-18">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="py-6">
            <Reveal direction="up" duration={700}>
              <div className="text-3xl font-extrabold tracking-tight text-[#2a1a13]">Billing Details</div>
            </Reveal>
            <Reveal direction="left" duration={700} className="mt-6">
              <div className="rounded-2xr bg-white border border-[#E8D9C6] px-6 py-10 rounded-2xl">
                <BillingForm />
              </div>
            </Reveal>
          </div>
          <div className="py-22">
            <Reveal direction="right" duration={700}>
              <div className="rounded-2xl bg.white border border-[#E8D9C6] px-6 py-10 bg-white">
                <OrderSummary />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
