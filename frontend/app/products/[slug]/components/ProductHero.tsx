import Image from "next/image";

export default function ProductHero({ image, name }: { image: string; name: string }) {
  return (
    <div className="rounded-2xl bg-[#FAF6EF] border border-[#E8D9C6] overflow-hidden mt-6 md:mt-8">
      <div className="relative h-[380px] sm:h-[460px]">
        <Image src={image} alt={name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
    </div>
  );
}
