import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, Phone } from 'lucide-react';

interface ContactCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: React.ReactNode;
}

function ContactCard({ index, icon, title, description, detail }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] shrink-0">
        {icon}
      </div>

      {/* Title */}
      <p className="text-lg font-bold text-[var(--brand)] font-['Outfit'] mt-1">{title}</p>

      {/* Description */}
      <p className="text-[var(--text-secondary)] font-dm-sans text-sm leading-relaxed">{description}</p>

      {/* Detail / CTA */}
      <div className="text-[var(--brand)] font-semibold font-roboto-mono text-sm mt-1">
        {detail}
      </div>
    </motion.div>
  );
}

const ContactForm: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 pt-10 pb-16 md:pb-24">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block px-3 py-1 text-[11px] font-roboto-mono tracking-[0.15em] uppercase border border-[var(--brand)]/20 rounded-full text-[var(--text-secondary)]"
        >
          Reach Out To Us
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Outfit'] font-bold text-[var(--brand)] mt-5 leading-tight"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
        >
          We'd love to hear from you.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-4 font-dm-sans text-[var(--text-secondary)] text-sm md:text-base"
        >
          Or reach out directly to{' '}
          <a
            href="mailto:info@velorachemicals.com"
            className="text-[var(--brand)] font-semibold hover:text-[var(--accent)] transition-colors underline underline-offset-2"
          >
            info@velorachemicals.com
          </a>
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mt-14 md:mt-16">

          <ContactCard
            index={0}
            icon={<Mail size={20} strokeWidth={1.75} />}
            title="Email Support"
            description="Our team responds to every inquiry within 1–2 business days. Chemical sourcing, export, or general questions — we're here."
            detail={
              <a
                href="mailto:info@velorachemicals.com"
                className="hover:text-[var(--accent)] transition-colors"
              >
                info@velorachemicals.com
              </a>
            }
          />

          <ContactCard
            index={1}
            icon={<Building2 size={20} strokeWidth={1.75} />}
            title="Visit Our Office"
            description="Our Ahmedabad headquarters is open Monday through Saturday. Come meet the team or schedule a facility tour."
            detail={
              <a
  href="https://www.google.com/maps?rlz=1C1ONGR_enIN1180IN1180&sca_esv=bf958c3e0f55ada9&sxsrf=APpeQnsDr493C1qui4z_dd6pdAvAl5Vi6w:1782328432948&biw=1707&bih=811&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KW8Bq2xJhV45MYDvBZlBsRY2&daddr=12th+floor,+Sun+Gravitas,+1218,+Radio+Mirchi+Road,+Rajmani+Society,+Shyamal,+Ahmedabad,+Gujarat+380051"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-[var(--accent)] transition-colors leading-relaxed block"
>
  12th floor, Sun Gravitas, 1218, Radio Mirchi Road, Rajmani Society,
  Shyamal, Ahmedabad, Gujarat 380051
</a>
            }
          />

          <ContactCard
            index={2}
            icon={<Phone size={20} strokeWidth={1.75} />}
            title="Call Us Directly"
            description="Prefer a quick conversation? Speak directly with our sourcing specialists during working hours."
            detail={
              <a
                href="tel:+919876543210"
                className="hover:text-[var(--accent)] transition-colors"
              >
                +91 98765 43210
              </a>
            }
          />

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
