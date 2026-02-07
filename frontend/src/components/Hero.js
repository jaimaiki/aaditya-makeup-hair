import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1758749220219-83a817a9356d?crop=entropy&cs=srgb&fm=jpg&q=85" 
          alt="High fashion editorial makeup portrait"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-cream/95 via-luxury-cream/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-20 md:py-32 w-full">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm tracking-widest uppercase text-luxury-rose font-medium"
              data-testid="hero-subtitle"
            >
              Professional Makeup Artist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-tight text-luxury-charcoal"
              data-testid="hero-title"
            >
              Artistry That
              <br />
              <span className="text-luxury-rose">Transforms</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg leading-relaxed tracking-wide text-luxury-charcoal/80 max-w-xl"
              data-testid="hero-description"
            >
              Creating breathtaking looks for your most important moments. From bridal elegance to editorial glamour, experience luxury makeup artistry that celebrates your unique beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('contact')}
                data-testid="hero-book-now-btn"
                className="bg-luxury-rose text-white hover:bg-luxury-rose-dark rounded-full px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Book Now
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                data-testid="hero-view-portfolio-btn"
                className="bg-transparent border-2 border-luxury-rose text-luxury-rose hover:bg-luxury-rose hover:text-white rounded-full px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                View Portfolio
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Empty for image to show through */}
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
