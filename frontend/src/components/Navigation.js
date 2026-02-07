import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-luxury-white shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('hero')}
          data-testid="logo-button"
          className="font-heading text-2xl md:text-3xl font-semibold text-luxury-charcoal tracking-tight"
        >
          Aaditya Tiwari
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('services')}
            data-testid="nav-services"
            className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')}
            data-testid="nav-portfolio"
            className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            data-testid="nav-process"
            className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium"
          >
            Process
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            data-testid="nav-book-now-btn"
            className="bg-luxury-rose text-white hover:bg-luxury-rose-dark rounded-full px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-toggle"
          className="md:hidden text-luxury-charcoal"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          data-testid="mobile-menu"
          className="md:hidden bg-luxury-white border-t border-luxury-border mt-4"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            <button 
              onClick={() => scrollToSection('services')}
              data-testid="mobile-nav-services"
              className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              data-testid="mobile-nav-portfolio"
              className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium text-left"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              data-testid="mobile-nav-process"
              className="text-luxury-charcoal hover:text-luxury-rose transition-colors text-sm uppercase tracking-widest font-medium text-left"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              data-testid="mobile-nav-book-now-btn"
              className="bg-luxury-rose text-white hover:bg-luxury-rose-dark rounded-full px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
