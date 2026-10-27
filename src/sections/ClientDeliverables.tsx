import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, EMAIL, BRAND_NAME } from '../data/siteData';
import { getSectionConfig } from '../config/sectionsConfig';
import {
  Mail,
  PhoneCall,
  Send,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  Check,
  Scissors,
  Sparkles,
  UtensilsCrossed,
  Hotel,
  Factory,
  Store,
} from 'lucide-react';
import { Reveal } from '../components/motion/Reveal';

interface BusinessTypeOption {
  value: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BUSINESS_TYPES: BusinessTypeOption[] = [
  {
    value: 'Hair Salon / Barbering / Academy',
    label: 'Hair Salon, Barbering & Academy',
    desc: 'Salons, barbershops, parlours, styling academies',
    icon: Scissors,
  },
  {
    value: 'Skin, Hair & Laser Clinic',
    label: 'Skin, Hair & Laser Clinic',
    desc: 'Dermatologists, cosmetology & wellness centres',
    icon: Sparkles,
  },
  {
    value: 'Bakery / Cafe / Restaurant',
    label: 'Bakery, Cafe & Restaurant',
    desc: 'Eateries, cafes, bakeries, cloud kitchens',
    icon: UtensilsCrossed,
  },
  {
    value: 'Hotel / Resort / Banquet',
    label: 'Hotel, Resort & Banquet',
    desc: 'Hotels, guest houses, marriage halls & event venues',
    icon: Hotel,
  },
  {
    value: 'Stone Crusher / Quarry',
    label: 'Stone Crusher & Mining Quarry',
    desc: 'Crusher plants, aggregate mining & construction supply',
    icon: Factory,
  },
  {
    value: 'Other Local Business',
    label: 'Other Local Business / Service',
    desc: 'Retail shops, distribution, professional services',
    icon: Store,
  },
];

export const ClientDeliverables: React.FC = () => {
  const sectionInfo = getSectionConfig('contact');
  const [formData, setFormData] = useState({ name: '', phone: '', industry: '', webOrMaps: '', message: '' });
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [industryError, setIndustryError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ message?: string; industry?: string }>;
      if (customEvent.detail?.message) {
        setFormData(prev => ({ ...prev, message: customEvent.detail.message! }));
      }
      if (customEvent.detail?.industry) {
        setFormData(prev => ({ ...prev, industry: customEvent.detail.industry! }));
      }
    };
    window.addEventListener('prefill-contact-form', handlePrefill);
    return () => window.removeEventListener('prefill-contact-form', handlePrefill);
  }, []);

  const validatePhone = (phoneStr: string) => {
    return /^[6-9][0-9]{9}$/.test(phoneStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setNameError('Please enter your name.');
      document.getElementById('input-name')?.focus();
      return;
    }
    setNameError('');

    if (!formData.industry) {
      setIndustryError('Please select your business type.');
      return;
    }
    setIndustryError('');

    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.');
      return;
    }
    setPhoneError('');

    const mapsInfo = formData.webOrMaps ? ` Existing Link: ${formData.webOrMaps}.` : '';
    const customMessage = `Hi ${BRAND_NAME}! My name is ${formData.name} (${formData.phone}). Business Type: ${formData.industry}.${mapsInfo} Note: ${formData.message || 'I want to get a free homepage preview.'}`;
    const targetUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(customMessage)}`;

    // // CHANGED: Secure external window open with noopener,noreferrer
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setWaUrl(targetUrl);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', industry: '', webOrMaps: '', message: '' });
    setFormSubmitted(false);
    setNameError('');
    setPhoneError('');
    setIndustryError('');
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="contact" className="pt-24 pb-12 md:py-24 bg-grain relative border-b border-ink/15 overflow-hidden">



      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <Reveal>
          <div className="mb-8 pb-4 border-b border-ink/15 text-left">
            <div className="font-mono text-xs text-vermilion-text uppercase tracking-widest mb-1.5 font-bold">
              [ SECTION {sectionInfo.number} ] • CONTACT
            </div>
            <h2 className="font-display font-black text-[clamp(1.5rem,5.5vw,3.5rem)] uppercase tracking-tight text-ink leading-none">
              Let's Build{' '}
              <span className="font-serif italic font-normal text-vermilion-text lowercase inline">
                your site.
              </span>
            </h2>
            <p className="font-sans text-ink-muted text-sm sm:text-base mt-2 leading-relaxed max-w-xl">
              Send a message on WhatsApp or fill out the project inquiry form below. We reply fast with clear quotes.
            </p>
          </div>
        </Reveal>

        {/* Contact Layout: 2-column on desktop (lg+), stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Contact Details Bar (Readable on Dark Card) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="bg-ink text-paper rounded-lg border border-ink p-5 sm:p-6 shadow-mobile-soft space-y-4">
                <span className="stamp-badge bg-vermilion-text text-paper text-[11px]">
                  DIRECT FOUNDER CONTACT
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-paper uppercase leading-snug">
                  Ready to Give Your Business a Professional Website?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-paper-dark leading-relaxed">
                  Call us, WhatsApp us directly, or send your details using the form.
                </p>

                <div className="flex flex-col gap-3 pt-3 border-t border-paper/20 font-mono text-xs text-paper">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-vermilion hover:text-paper transition-colors py-1"
                  >
                    <PhoneCall className="w-4 h-4 flex-shrink-0" />
                    <span>WhatsApp: {WHATSAPP_NUMBER}</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 text-paper-dark hover:text-vermilion transition-colors py-1"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>Email: {EMAIL}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="bg-paper text-ink p-5 sm:p-7 rounded-lg border border-ink/30 shadow-mobile-soft lg:min-h-[560px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="py-8 sm:py-10 px-2 text-center font-sans flex flex-col items-center"
                    >
                      <div className="w-14 h-14 bg-emerald-700 text-paper rounded-full flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <h4 className="mt-5 font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                        Thank you, {formData.name.split(' ')[0]}!
                      </h4>

                      <p className="mt-3 text-sm sm:text-base text-ink-muted max-w-md leading-relaxed">
                        Your enquiry is ready in WhatsApp. Already sent it? You’re all set, and we reply
                        within 1 hour.
                      </p>
                      <p className="mt-2 text-xs text-ink-muted max-w-md">
                        WhatsApp didn’t open, or you haven’t sent it yet?{' '}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-vermilion-text underline underline-offset-2"
                        >
                          Open it with my details
                        </a>
                      </p>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-vermilion-text hover:bg-vermilion-dark text-paper font-bold text-sm px-6 py-3 rounded-badge border-2 border-ink shadow-stamp transition-all"
                        >
                          <Send className="w-4 h-4" />
                          <span>Open WhatsApp chat</span>
                        </a>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-paper-dark/60 hover:bg-paper-dark text-ink font-bold text-sm px-6 py-3 rounded-badge border border-ink/30 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email instead</span>
                        </a>
                      </div>

                      <button
                        onClick={resetForm}
                        className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-ink-muted hover:text-vermilion-text transition-colors min-h-[44px]"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Send another enquiry</span>
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 font-sans" noValidate>
                      <div className="font-mono text-xs text-vermilion-text font-bold uppercase mb-1">
                        [ PROJECT ENQUIRY FORM ]
                      </div>

                      {/* Name */}
                      <div>
                        <label htmlFor="input-name" className="block text-xs font-mono font-bold uppercase mb-1.5 text-ink">
                          Your Name or Business Name *
                        </label>
                        <input
                          id="input-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (nameError) setNameError('');
                          }}
                          onFocus={handleInputFocus}
                          placeholder="e.g. Ramesh Patel / Shivam Construction"
                          className="w-full bg-card border border-ink/30 p-3 rounded-badge font-sans text-base text-ink placeholder:text-ink-muted focus:outline-none focus:border-vermilion-text focus:ring-2 focus:ring-vermilion/20 transition-all duration-200 min-h-[46px]"
                        />
                        {nameError && (
                          <span className="text-vermilion-text text-xs font-mono font-bold block mt-1" role="alert">
                            {nameError}
                          </span>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label htmlFor="input-phone" className="block text-xs font-mono font-bold uppercase mb-1.5 text-ink">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          id="input-phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
                            if (phoneError) setPhoneError('');
                          }}
                          onFocus={handleInputFocus}
                          placeholder="10-digit mobile number, e.g. 9876543210"
                          className={`w-full bg-card border p-3 rounded-badge font-sans text-base text-ink placeholder:text-ink-muted focus:outline-none transition-all duration-200 min-h-[46px] ${phoneError ? 'border-red-600 focus:ring-2 focus:ring-red-200' : 'border-ink/30 focus:border-vermilion-text focus:ring-2 focus:ring-vermilion/20'
                            }`}
                        />
                        {phoneError && (
                          <span className="text-xs text-red-600 font-mono font-bold block mt-1">
                            {phoneError}
                          </span>
                        )}
                      </div>

                      {/* Business Type Custom Dropdown */}
                      <div ref={dropdownRef} className="relative">
                        <label id="input-industry-label" className="block text-xs font-mono font-bold uppercase mb-1.5 text-ink">
                          Business Type *
                        </label>

                        <button
                          id="input-industry"
                          type="button"
                          role="combobox"
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="listbox"
                          aria-labelledby="input-industry-label"
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className={`w-full bg-card border p-3 rounded-badge font-sans text-left flex items-center justify-between gap-3 min-h-[50px] transition-all duration-200 outline-none cursor-pointer ${isDropdownOpen
                              ? 'border-vermilion-text ring-2 ring-vermilion/20 shadow-sm'
                              : industryError
                                ? 'border-red-600 focus:ring-2 focus:ring-red-200'
                                : 'border-ink/30 hover:border-ink/50 focus:border-vermilion-text focus:ring-2 focus:ring-vermilion/20'
                            }`}
                        >
                          {(() => {
                            const selectedOption = BUSINESS_TYPES.find((b) => b.value === formData.industry);
                            const SelectedIcon = selectedOption?.icon;

                            if (selectedOption && SelectedIcon) {
                              return (
                                <span className="flex items-center gap-2.5 min-w-0">
                                  <span className="w-7 h-7 rounded-md bg-vermilion-text/10 text-vermilion-text flex items-center justify-center shrink-0">
                                    <SelectedIcon className="w-4 h-4" />
                                  </span>
                                  <span className="font-sans font-semibold text-ink text-sm sm:text-base truncate">
                                    {selectedOption.label}
                                  </span>
                                </span>
                              );
                            }

                            return (
                              <span className="font-sans text-sm sm:text-base text-ink-muted">
                                {formData.industry || 'Select your business type...'}
                              </span>
                            );
                          })()}

                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-vermilion-text' : 'text-ink-muted'
                              }`}
                          />
                        </button>

                        {/* Hidden form input for standard validation and autofill compatibility */}
                        <input type="hidden" name="industry" value={formData.industry} />

                        {/* Floating Custom Dropdown Menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.15, ease: 'easeOut' }}
                              role="listbox"
                              aria-labelledby="input-industry-label"
                              data-lenis-prevent
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()}
                              className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-paper border-2 border-ink rounded-xl shadow-stamp shadow-2xl p-1.5 max-h-[300px] overflow-y-auto space-y-1 overscroll-contain dropdown-scroll"
                            >
                              <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted flex items-center justify-between border-b border-ink/10 pb-1.5 mb-1">
                                <span>Choose Your Industry</span>
                                <span>{BUSINESS_TYPES.length} Categories</span>
                              </div>

                              {BUSINESS_TYPES.map((item) => {
                                const isSelected = formData.industry === item.value;
                                const ItemIcon = item.icon;
                                return (
                                  <button
                                    key={item.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                      setFormData((prev) => ({ ...prev, industry: item.value }));
                                      if (industryError) setIndustryError('');
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left p-2.5 rounded-lg transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer ${isSelected
                                        ? 'bg-card border border-ink/20 shadow-sm'
                                        : 'hover:bg-card/80 border border-transparent hover:border-ink/10'
                                      }`}
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isSelected
                                            ? 'bg-vermilion-text text-paper shadow-sm'
                                            : 'bg-paper-dark text-ink group-hover:bg-vermilion-text/10 group-hover:text-vermilion-text'
                                          }`}
                                      >
                                        <ItemIcon className="w-4 h-4" />
                                      </span>
                                      <div className="min-w-0">
                                        <div
                                          className={`font-display font-bold text-xs sm:text-sm leading-tight truncate ${isSelected ? 'text-vermilion-text' : 'text-ink'
                                            }`}
                                        >
                                          {item.label}
                                        </div>
                                        <div className="font-sans text-[11px] text-ink-muted leading-tight mt-0.5 truncate">
                                          {item.desc}
                                        </div>
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-paper flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3" strokeWidth={3} />
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {industryError && (
                          <span className="text-xs text-red-600 font-mono font-bold block mt-1">
                            {industryError}
                          </span>
                        )}
                      </div>

                      {/* Website / Maps Link */}
                      <div>
                        <label htmlFor="input-web-or-maps" className="block text-xs font-mono font-bold uppercase mb-1.5 text-ink">
                          Your business website or Google Maps link (optional)
                        </label>
                        <input
                          id="input-web-or-maps"
                          type="url"
                          inputMode="url"
                          autoComplete="url"
                          value={formData.webOrMaps}
                          onChange={(e) => setFormData({ ...formData, webOrMaps: e.target.value })}
                          onFocus={handleInputFocus}
                          placeholder="https://g.co/kgs/... or existing site link"
                          className="w-full bg-card border border-ink/30 p-3 rounded-badge font-sans text-base text-ink placeholder:text-ink-muted focus:outline-none focus:border-vermilion-text focus:ring-2 focus:ring-vermilion/20 transition-all duration-200 min-h-[46px]"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="input-message" className="block text-xs font-mono font-bold uppercase mb-1.5 text-ink">
                          Short Message (Optional)
                        </label>
                        <textarea
                          id="input-message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={handleInputFocus}
                          placeholder="Tell us about your website requirements..."
                          className="w-full bg-card border border-ink/30 p-3 rounded-badge font-sans text-base text-ink placeholder:text-ink-muted focus:outline-none focus:border-vermilion-text focus:ring-2 focus:ring-vermilion/20 transition-all duration-200"
                        />
                      </div>

                      {/* Big Full-Width Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-vermilion-text hover:bg-vermilion-dark text-paper font-sans font-bold text-base py-4 min-h-[50px] rounded-badge border-2 border-ink shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send on WhatsApp</span>
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
};
