import { Beaker } from 'lucide-react';

export default function ExportFooter() {
  return (
    <footer className="bg-[#051125] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-4 pr-8">
            <div className="flex items-center gap-2 font-['Outfit'] font-normal text-2xl mb-8 tracking-wide text-white">
              <Beaker className="text-[#75c834]" size={24} strokeWidth={1.5} />
              <span>Velora</span>
            </div>
            <p className="text-slate-300 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Global chemical sourcing and secure worldwide distribution. Ensuring your operations never face downtime.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-medium mb-6 text-sm text-white">Company</h4>
            <ul className="space-y-3 text-slate-300 text-sm font-light">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="/logistics" className="hover:text-white transition-colors">Logistics Network</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-medium mb-6 text-sm text-white">Services</h4>
            <ul className="space-y-3 text-slate-300 text-sm font-light">
              <li><a href="/products" className="hover:text-white transition-colors">Solvents</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Specialty Chemicals</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Industrial Salts</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">View All Products</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-medium mb-6 text-sm text-white">Contact</h4>
            <div className="space-y-4 text-sm font-light text-slate-300">
              <p>info@velorachemicals.com</p>
              <p>+91 98765 43210</p>
              <p>Mumbai – 400083, Maharashtra, India</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-light text-slate-400 border-t border-white/10 pt-8">
          <p>Copyright © {new Date().getFullYear()} Velora Chemicals. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/contact" className="hover:text-white transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
