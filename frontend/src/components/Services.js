import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Bridal Makeup',
      description: 'Exquisite bridal looks that capture your essence on your special day. Traditional to contemporary styles.',
      image: 'https://images.unsplash.com/photo-1710494422513-84f510745792?crop=entropy&cs=srgb&fm=jpg&q=85',
      testId: 'service-bridal'
    },
    {
      title: 'Celebrity Makeup',
      description: 'Red carpet glamour and high-profile event styling. Flawless camera-ready looks for the spotlight.',
      image: 'https://images.unsplash.com/photo-1758749652183-3c7bb8f9641d?crop=entropy&cs=srgb&fm=jpg&q=85',
      testId: 'service-celebrity'
    },
    {
      title: 'Model Shoots',
      description: 'Editorial and commercial makeup for fashion photography. Bold, creative, and trend-setting aesthetics.',
      image: 'https://images.unsplash.com/photo-1742893071818-ba15a3b588a0?crop=entropy&cs=srgb&fm=jpg&q=85',
      testId: 'service-models'
    },
    {
      title: 'Photo Shoots',
      description: 'Professional makeup for all types of photoshoots. From lifestyle to high-fashion editorial work.',
      image: 'https://images.unsplash.com/photo-1684868265714-fd2300637c23?crop=entropy&cs=srgb&fm=jpg&q=85',
      testId: 'service-shoots'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-luxury-cream">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-widest uppercase text-luxury-rose font-medium mb-4" data-testid="services-subtitle">
              What I Offer
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-luxury-charcoal" data-testid="services-title">
              Services
            </h2>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                data-testid={service.testId}
                className="group relative overflow-hidden bg-luxury-white border border-luxury-border transition-all duration-500 hover:shadow-[0_8px_30px_-2px_rgba(166,112,112,0.2)]"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-4 text-white/90">
                    {service.description}
                  </p>
                  <button
                    onClick={scrollToContact}
                    data-testid={`${service.testId}-contact-btn`}
                    className="text-sm uppercase tracking-widest text-white hover:text-luxury-rose transition-colors flex items-center gap-2 group/btn"
                  >
                    Contact for Pricing
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
