import { motion } from 'framer-motion';
import { Star, Users, Clock } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Clock size={32} />,
      value: '5+',
      label: 'Years Experience',
      testId: 'stat-experience'
    },
    {
      icon: <Users size={32} />,
      value: '500+',
      label: 'Happy Clients',
      testId: 'stat-clients'
    },
    {
      icon: <Star size={32} />,
      value: '100%',
      label: 'Satisfaction',
      testId: 'stat-satisfaction'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-luxury-white border-y border-luxury-border">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              data-testid={stat.testId}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-luxury-rose">
                {stat.icon}
              </div>
              <div className="font-heading text-4xl md:text-5xl font-medium text-luxury-charcoal">
                {stat.value}
              </div>
              <div className="text-sm tracking-widest uppercase text-luxury-muted-text">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
