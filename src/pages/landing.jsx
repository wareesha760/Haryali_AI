import { motion } from "framer-motion";
import ShopRow from "../components/shprow";
import AboutKisaanBot from "../components/AboutKisaanBot";
import HomePageBanner from "../components/HomePageBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 px-6 relative font-[Noto Nastaliq Urdu]">
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-28 h-28 bg-green-300 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-36 h-36 bg-lime-400 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* About Section */}
      <AboutKisaanBot />
      {/* Shop Row */}
      <ShopRow />
      <HomePageBanner/>
      
    </div>
  );
}

