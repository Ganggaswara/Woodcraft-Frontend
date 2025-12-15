import HeaderNav from "../sections/HeaderNav";
import Footer from "../sections/Footer";
import HighlightProduct from "./sections/HighlightProduct";
import Gallery from "./sections/Gallery";
import Catalog from "./sections/Catalog";
import { Suspense } from "react";

export default function Products() {
  return (
    <>
      <HeaderNav />
      <HighlightProduct />
      <Suspense>
        <Catalog />
      </Suspense>
      <Gallery />
      <Footer />
    </>
  );
}
