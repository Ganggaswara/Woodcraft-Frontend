"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Leaf, Shield, Truck } from "lucide-react";
import Image from "next/image";

const stats = [
  { number: "230+", label: "Exclusive Products" },
];

const features = [
  { icon: Award, title: "Top Quality", description: "Premium materials only" },
  { icon: Leaf, title: "Eco-Friendly", description: "Sustainable sourcing" },
  { icon: Shield, title: "Lifetime Guarantee", description: "Built to last" },
  { icon: Truck, title: "Free Delivery", description: "Worldwide shipping" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-[#FAF6EF]" ref={ref}>
      <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#D4AF37] font-medium tracking-widest uppercase text-sm mb-4">
              Why Choose Us
            </p>
            
            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-[#2a1a13] leading-tight mb-8">
              Elevate Your Home With Our Wood Furniture
            </h2>

            {/* Stats */}
            <div className="mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-6">
                  <span className="font-sans text-7xl lg:text-8xl text-[#D4AF37]">{stat.number}</span>
                  <span className="text-[#7a6555] text-lg">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#F2E9DA] hover:bg-[#E6D7C1] transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2a1a13] mb-1">{feature.title}</h3>
                    <p className="text-[#7a6555] text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[600px]">
                <Image
                  src="/Login/Login3.jpg"
                  alt="Elegant living room with wooden furniture"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-[#5C3D2E] text-[#FAF6EF] p-6 rounded-xl shadow-xl max-w-xs"
            >
              <p className="font-sans text-xl mb-2">Crafted with Passion</p>
              <p className="text-[#FAF6EF]/70 text-sm">Every piece is handmade with attention to the smallest details</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
