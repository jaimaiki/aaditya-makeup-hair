import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bridal Makeup',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/contact`, formData);
      toast.success('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Bridal Makeup',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-luxury-white">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-widest uppercase text-luxury-rose font-medium mb-4" data-testid="contact-subtitle">
                Get In Touch
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-luxury-charcoal mb-6" data-testid="contact-title">
                Let's Create Magic Together
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-luxury-charcoal/80 mb-12">
                Ready to transform your look? Reach out to discuss your vision and book your appointment. I can't wait to work with you.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4" data-testid="contact-email">
                  <div className="w-12 h-12 bg-luxury-accent rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-luxury-rose" />
                  </div>
                  <div>
                    <p className="text-sm text-luxury-muted-text uppercase tracking-widest">Email</p>
                    <p className="text-luxury-charcoal">hello@aadityatiwari.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-luxury-accent rounded-full flex items-center justify-center">
                    <Phone size={20} className="text-luxury-rose" />
                  </div>
                  <div>
                    <p className="text-sm text-luxury-muted-text uppercase tracking-widest">Phone</p>
                    <p className="text-luxury-charcoal">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    data-testid="contact-input-name"
                    className="w-full bg-transparent border-b-2 border-luxury-rose px-0 py-4 text-luxury-charcoal placeholder:text-luxury-rose/50 focus:border-luxury-charcoal focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    data-testid="contact-input-email"
                    className="w-full bg-transparent border-b-2 border-luxury-rose px-0 py-4 text-luxury-charcoal placeholder:text-luxury-rose/50 focus:border-luxury-charcoal focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (Optional)"
                    data-testid="contact-input-phone"
                    className="w-full bg-transparent border-b-2 border-luxury-rose px-0 py-4 text-luxury-charcoal placeholder:text-luxury-rose/50 focus:border-luxury-charcoal focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    data-testid="contact-input-service"
                    className="w-full bg-transparent border-b-2 border-luxury-rose px-0 py-4 text-luxury-charcoal focus:border-luxury-charcoal focus:outline-none transition-colors"
                  >
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Celebrity Makeup">Celebrity Makeup</option>
                    <option value="Model Shoots">Model Shoots</option>
                    <option value="Photo Shoots">Photo Shoots</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your vision..."
                    data-testid="contact-input-message"
                    className="w-full bg-transparent border-b-2 border-luxury-rose px-0 py-4 text-luxury-charcoal placeholder:text-luxury-rose/50 focus:border-luxury-charcoal focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-btn"
                  className="w-full bg-luxury-rose text-white hover:bg-luxury-rose-dark rounded-full px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
