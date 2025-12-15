import HeaderNav from "../sections/HeaderNav";
import Footer from "../sections/Footer";
import HighlightProduct from "./sections/HighlightProduct";
import Gallery from "./sections/Gallery";
import Catalog from "./sections/Catalog";

export default function Products() {
  return (
    <>
      <HeaderNav />
      <HighlightProduct />
      <Catalog />
      <Gallery />
      <Footer />
    </>
  );
}
