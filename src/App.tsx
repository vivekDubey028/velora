import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/navbar'
import Loader from './components/common/loader'
import Lenis from 'lenis'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Logistics from './pages/Logistics'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import Export from './pages/export/Export'
import Footer from './components/common/footer'
import NotFound from './pages/NotFound'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [navbarTheme, setNavbarTheme] = useState<'light' | 'dark'>('dark');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      setIsAtTop(scrolled < 10);

      const darkHeroPages = ['/', '/about', '/products', '/logistics', '/sustainability'];
      const hasDarkHero = darkHeroPages.includes(location.pathname);

      if (hasDarkHero && scrolled <= vh * 0.25) {
        setNavbarTheme('dark');
      } else {
        setNavbarTheme('light');
      }

      const topThreshold = vh * 1.5;

      if (scrolled < vh * 0.5) {
        setIsVisible(true);
      } else if (scrolled > lastScrollY + 5) {
        setIsVisible(false);
      } else if (scrolled < lastScrollY) {
        if (scrolled <= topThreshold) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      setLastScrollY(scrolled);

      clearTimeout(idleTimer);
      if (scrolled <= topThreshold) {
        idleTimer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimer);
    };
  }, [lastScrollY, location.pathname]);

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [])

  const isExportPage = location.pathname === '/export';

  useEffect(() => {
    if (isExportPage && isLoading) {
      setIsLoading(false);
    }
  }, [isExportPage]);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoading]);

  return (
    <div className="font-['Inter'] antialiased bg-white min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && !isExportPage && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar theme={navbarTheme} isVisible={isVisible} isAtTop={isAtTop} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/export" element={<Export />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
