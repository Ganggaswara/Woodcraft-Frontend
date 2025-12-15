import CartSection from "./sections/CartSection";
import HeaderNav from "../sections/HeaderNav";
import Footer from "../sections/Footer";
import ProductSuggestions from "../products/[slug]/components/ProductSuggestions";
import { fetchProducts } from "../../lib/api/products";

export default async function Cart() {
  const items = (await fetchProducts()).slice(0, 4);
  return (
    <>
      <HeaderNav />
      <CartSection />
      <section className="bg-[#FAF6EF]">
        <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-12">
          <ProductSuggestions items={items} />
        </div>
      </section>
      <Footer />
    </>
  );
}
