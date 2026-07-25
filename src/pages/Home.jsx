import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Concept from "../sections/Concept";
import Service from "../sections/Service";
import Location from "../sections/Location";
import Menu from "../sections/Menu";
import Gallery from "../sections/Gallery";
import Booking from "../sections/Booking";
import Contact from "../sections/Contact";

export default function Home() {
  useEffect(() => {
    document.title = "hair salon URU by charmant";
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Concept />
        <Service />
        <Location />
        <Menu />
        <Gallery />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
