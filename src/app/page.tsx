import HeroSection from "@/components/HeroSection";
import Competencies from "@/components/Competencies";
import Experience from "@/components/Experience";
import FooterContact from "@/components/FooterContact";

export default function Home() {
  return (
    <main className="w-full bg-black">
      {/* 500vh Scrolly section containing canvas and text sequence */}
      <HeroSection />

      {/* Core Competencies Bento Box */}
      <Competencies />

      {/* Professional Experience Timeline */}
      <Experience />
      
      {/* Education, Certifications, and Contact Info */}
      <FooterContact />
    </main>
  );
}
