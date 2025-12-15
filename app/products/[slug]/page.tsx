import ProductDetailSection from "./sections/ProductDetailSection";
import HeaderNav from "@/app/sections/HeaderNav";
import Footer from "@/app/sections/Footer";
import Gallery from "../sections/Gallery";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <HeaderNav />
      <ProductDetailSection slug={slug} />
      <Gallery />
      <Footer />
    </>
  );
}
