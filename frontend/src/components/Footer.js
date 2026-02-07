import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-luxury-charcoal text-white">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="font-heading text-2xl font-semibold" data-testid="footer-logo">
              Aaditya Tiwari
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6" data-testid="footer-social">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="footer-instagram-link"
                className="hover:text-luxury-rose transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="mailto:hello@aadityatiwari.com"
                data-testid="footer-email-link"
                className="hover:text-luxury-rose transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-white/70" data-testid="footer-copyright">
              © {currentYear} Aaditya Tiwari. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
