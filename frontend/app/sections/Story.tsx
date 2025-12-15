import Reveal from "../utils/Reveal";
import Link from "next/link";
import Slideshow from "../utils/Slideshow";

export default function StorySection() {
  const img1 = "/About-Us/craftsman1.jpg";
  const img2 = "/About-Us/craftsman2.png";
  const img3 = "/About-Us/craftsman3.png";

  return (
    <section id="story" className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-35 grid md:grid-cols-[3fr_2fr] gap-28 md:gap-32 items-center ml-48 md:ml-56">
        <Reveal direction="left" duration={800} className="w-full">
          <Slideshow images={[img1, img2, img3]} />
        </Reveal>
        <Reveal direction="right" delay={200} duration={800} className="space-y-7 w-full">
          <div className="text-xs tracking-widest uppercase text-[#5C3D2E]">About Us</div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2a1a13]">Our History of Making the Best Wood Product</h2>
          <p className="text-[#7a6555] leading-relaxed">For over three generations, our family has been dedicated to the art of woodworking. Each piece tells a story of patience, skill, and an unwavering commitment to excellence.</p>
          <p className="text-[#7a6555] leading-relaxed">We source only the finest sustainable hardwoods, ensuring every creation not only beautifies your home but respects our planet. Our master craftsmen blend traditional joinery techniques with modern design sensibilities.</p>
          <Link href="#catalog" className="inline-block px-5 py-2.5 rounded-md bg-[#5C3D2E] text-white hover:bg-[#5C3D2E]/90">Read More</Link>
        </Reveal>
      </div>
    </section>
  );
}
