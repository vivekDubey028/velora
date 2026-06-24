import { useEffect } from 'react';

import ExportHero from './components/ExportHero';
import ExportCards from './components/ExportCards';
import ExportServices from './components/ExportServices';
import ExportVideoSection from './components/ExportVideoSection';
import ExportTrackingTestimonial from './components/ExportTrackingTestimonial';
import ExportFeatures from './components/ExportFeatures';
import ExportCarousel from './components/ExportCarousel';
import ExportFAQ from './components/ExportFAQ';
import ExportCTA from './components/ExportCTA';

export default function Export() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-slate-600 font-light"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Hero */}
      <div className="p-4 pt-24 lg:p-8 lg:pt-24 max-w-[1920px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#051125]">
          <ExportHero />
        </div>
      </div>

      {/* Cards */}
      <ExportCards />

      {/* Services */}
      <ExportServices />

      {/* Video Section */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto">
        <ExportVideoSection />
      </div>

      {/* Tracking & Testimonial */}
      <ExportTrackingTestimonial />

      {/* Features */}
      <ExportFeatures />

      {/* Carousel */}
      <ExportCarousel />

      {/* FAQ */}
      <ExportFAQ />

      {/* CTA */}
      <ExportCTA />
    </div>
  );
}
