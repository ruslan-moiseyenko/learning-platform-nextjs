"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";

const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
const tags = ["web development", "enterprise IT", "React.js"];

const Landing = () => {
  const currentImage = useCarousel({ totalImages: heroImages.length });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Welcome to your new app</h1>
          <p className="landing__description">
            Here will be a list of available courses
          </p>
          <div className="landing__cta">
            <Link href="/search">
              <div className="landing__cta-button">Search for courses</div>
            </Link>
          </div>
        </div>

        <div className="landing__hero-images">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`landing__hero-image ${
                index === currentImage ? "landing__hero-image--active" : ""
              }`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          Here will be a list of courses for every skill level and interest
        </p>
        <div className="landing__tags">
          {tags.map((tag, index) => (
            <span key={tag + index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="landing__courses">HERE WILL BE REAL COURSES</div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
