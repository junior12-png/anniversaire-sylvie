import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/invitation/LandingScreen";
import HeroSection from "@/components/invitation/HeroSection";
import TributeSection from "@/components/invitation/TributeSection";
import HommageGratitudes from "@/components/invitation/Hommagegratitudes";
import EventDetails from "@/components/invitation/EventDetails";
import Countdown from "@/components/invitation/Countdown";
import PhotoGallery from "@/components/invitation/PhotoGallery";
import MapSection from "@/components/invitation/MapSection";
import ContributionSection from "@/components/invitation/ContributionSection";
import RSVPForm from "@/components/invitation/RSVPForm";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import Footer from "@/components/invitation/InvitationFooter";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <LandingScreen key="landing" onOpen={() => setIsOpen(true)} />
        ) : (
          <div key="content">
            <HeroSection />
            <TributeSection />
            <EventDetails />
            <Countdown />

            {/* On peut le mettre ici pour alterner entre infos et émotion */}
            <HommageGratitudes />

            <PhotoGallery />
            <MapSection />
            <ContributionSection />
            <RSVPForm />
            <Footer />
          </div>
        )}
      </AnimatePresence>
      <MusicPlayer />
    </div>
  );
};

export default Index;