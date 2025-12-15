import HeaderNav from "@/app/sections/HeaderNav";
import Footer from "@/app/sections/Footer";
import InvoiceSection from "../sections/InvoiceSection";

export default async function InvoicePage({ params }: { params: Promise<{ method: string }> }) {
  const { method } = await params;
  return (
    <>
      <HeaderNav />
      <InvoiceSection method={method} />
      <Footer />
    </>
  );
}

