import { fetchProductBySlug, fetchRelatedProducts } from "../../../../lib/api/products";
import ProductHero from "../components/ProductHero";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import ProductSuggestions from "../components/ProductSuggestions";
import Reveal from "../../../utils/Reveal";

export default async function ProductDetailSection({ slug }: { slug: string }) {
  const product = await fetchProductBySlug(slug);
  const related = await fetchRelatedProducts(slug, 4);
  if (!product) {
    return (
      <section className="bg-[#FAF6EF]">
        <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-28">
          <div className="text-center text-[#2a1a13]">Product not found.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          <Reveal direction="left" duration={700}>
            <ProductHero image={product.image} name={product.name} />
          </Reveal>
          <Reveal direction="right" duration={700}>
            <ProductInfo id={product.id} slug={product.slug} image={product.image} price={product.price} name={product.name} description={product.description} />
          </Reveal>
        </div>
        <div className="mt-20">
          <Reveal direction="up" duration={700}>
            <ProductDescription name={product.name} description={product.description} />
          </Reveal>
        </div>
        <div className="mt-24">
          <Reveal direction="scale" duration={700}>
            <ProductSuggestions items={related} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
