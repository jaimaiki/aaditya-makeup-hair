import { motion } from 'framer-motion';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We discuss your vision, preferences, and the occasion. Understanding your style is the foundation of creating the perfect look.',
      testId: 'process-step-1'
    },
    {
      number: '02',
      title: 'Preparation',
      description: 'Skincare prep and primer application to ensure a flawless base. Your skin is prepped for long-lasting, camera-ready results.',
      testId: 'process-step-2'
    },
    {
      number: '03',
      title: 'Application',
      description: 'Expert makeup application using premium products. Every detail is carefully crafted to enhance your natural beauty.',
      testId: 'process-step-3'
    },
    {
      number: '04',
      title: 'Final Touch',
      description: 'Setting and perfecting the look with final adjustments. Ensuring everything is flawless before your big moment.',
      testId: 'process-step-4'
    }
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-luxury-cream">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-widest uppercase text-luxury-rose font-medium mb-4" data-testid="process-subtitle">
              How It Works
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-luxury-charcoal" data-testid="process-title">
              The Process
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-luxury-border transform md:-translate-x-1/2"></div>

            {/* Steps */}
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
              className="space-y-16"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 }
                  }}
                  data-testid={step.testId}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Number Circle */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-luxury-rose rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="font-heading text-white text-xl font-semibold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}`}>
                    <h3 className="font-heading text-2xl md:text-3xl font-medium text-luxury-charcoal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-luxury-charcoal/80">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
