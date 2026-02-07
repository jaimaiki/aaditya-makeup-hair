import { useState } from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1710494422513-84f510745792?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'bridal',
      title: 'Traditional Bridal',
      testId: 'portfolio-item-1'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1758749652183-3c7bb8f9641d?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'celebrity',
      title: 'Editorial Glamour',
      testId: 'portfolio-item-2'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1742893071818-ba15a3b588a0?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'models',
      title: 'Fashion Model',
      testId: 'portfolio-item-3'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1684868265714-fd2300637c23?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'shoots',
      title: 'Bridal Detail',
      testId: 'portfolio-item-4'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1765852549357-7dc1979a4ead?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'shoots',
      title: 'Professional Shoot',
      testId: 'portfolio-item-5'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1590156351813-11741a501057?crop=entropy&cs=srgb&fm=jpg&q=85',
      category: 'celebrity',
      title: 'Luxury Beauty',
      testId: 'portfolio-item-6'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Work', testId: 'filter-all' },
    { id: 'bridal', label: 'Bridal', testId: 'filter-bridal' },
    { id: 'celebrity', label: 'Celebrity', testId: 'filter-celebrity' },
    { id: 'models', label: 'Models', testId: 'filter-models' },
    { id: 'shoots', label: 'Shoots', testId: 'filter-shoots' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-luxury-white">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-widest uppercase text-luxury-rose font-medium mb-4" data-testid="portfolio-subtitle">
              My Work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-luxury-charcoal" data-testid="portfolio-title">
              Portfolio
            </h2>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
          >
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                data-testid={filter.testId}
                className={`px-6 py-2.5 text-sm uppercase tracking-widest transition-all duration-300 rounded-full ${
                  activeFilter === filter.id
                    ? 'bg-luxury-rose text-white'
                    : 'bg-luxury-accent text-luxury-charcoal hover:bg-luxury-rose hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                data-testid={item.testId}
                className="group relative aspect-[3/4] overflow-hidden bg-luxury-accent cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-luxury-charcoal/0 group-hover:bg-luxury-charcoal/40 transition-all duration-300 flex items-end">
                  <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-heading text-2xl font-medium text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
