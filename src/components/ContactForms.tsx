'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { CheckCircle, PaperPlaneTilt } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { SectionWrapper } from './ui/SectionWrapper';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp, staggerContainer } from '@/lib/animations';

type AgencyFormData = {
  company: string;
  contact: string;
  email: string;
  sector: string;
  services: string[];
  budget: string;
  message: string;
};

type InfluencerFormData = {
  brand: string;
  contact: string;
  email: string;
  collabType: string[];
  platform: string;
  budget: string;
  message: string;
};

const inputClass =
  'w-full rounded-2xl border border-brand-card-border bg-white/80 backdrop-blur-sm px-5 py-4 font-body text-brand-text placeholder:text-brand-text-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-cta/30 focus:border-brand-cta focus:bg-white transition-all duration-200 text-sm';

async function submitForm(formType: 'agency' | 'influencer', data: Record<string, string | string[]>) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, ...data }),
  });
  if (!res.ok) throw new Error('Form submission failed');
}

export function ContactForms() {
  const t = useTranslations('contactForms');
  const [activeTab, setActiveTab] = useState<'agency' | 'influencer'>('agency');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SectionWrapper id="contact" bg="blush">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-cta to-brand-cta-hover flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" weight="fill" />
          </motion.div>
          <p className="font-heading text-2xl md:text-3xl font-bold text-brand-text">
            {t('success')}
          </p>
        </motion.div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="contact" bg="blush">
      <div className="text-center mb-10">
        <AnimatedHeading
          before={t('heading_before')}
          highlight={t('heading_highlight')}
          subtitle={t('subheading')}
          className="font-heading text-4xl md:text-5xl font-bold text-brand-text mb-3"
          subtitleClassName="font-body text-brand-text-muted text-base md:text-lg"
        />
      </div>

      {/* Tab selector */}
      <motion.div variants={fadeUp} className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab('agency')}
          className={`px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
            activeTab === 'agency'
              ? 'bg-brand-cta text-white shadow-md shadow-brand-cta/20'
              : 'bg-white border border-gray-200 text-brand-text-muted hover:border-brand-cta/40'
          }`}
        >
          {t('tabs.agency')}
        </button>
        <button
          onClick={() => setActiveTab('influencer')}
          className={`px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
            activeTab === 'influencer'
              ? 'bg-brand-cta text-white shadow-md shadow-brand-cta/20'
              : 'bg-white border border-gray-200 text-brand-text-muted hover:border-brand-cta/40'
          }`}
        >
          {t('tabs.influencer')}
        </button>
      </motion.div>

      {/* Forms */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'agency' ? (
            <AgencyForm key="agency" t={t} onSuccess={() => setSubmitted(true)} />
          ) : (
            <InfluencerForm key="influencer" t={t} onSuccess={() => setSubmitted(true)} />
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

function AgencyForm({ t, onSuccess }: { t: ReturnType<typeof useTranslations<'contactForms'>>; onSuccess: () => void }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<AgencyFormData>();

  const serviceOptions = ['social_media', 'paid_ads', 'seo', 'web_design', 'email_mkt', 'full_service'];
  const budgetOptions = ['under_1000', '1000_3000', '3000_5000', '5000_plus', 'not_sure'];

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: AgencyFormData) => {
    setSubmitting(true);
    setError(false);
    try {
      await submitForm('agency', { ...data, services: selectedServices });
      onSuccess();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const agencyInputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-body text-brand-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-text/10 focus:border-brand-text/30 transition-all duration-200 text-sm';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10">
        <h3 className="font-heading text-xl font-bold text-brand-text mb-1">
          {t('agency.title')}
        </h3>
        <div className="h-px bg-gray-100 my-5" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                {t('agency.fields.company')}
              </label>
              <input
                {...register('company', { required: t('validation.required') })}
                className={agencyInputClass}
                placeholder="Acme Inc."
              />
              {errors.company && <p className="text-red-500 text-xs mt-1.5 ml-0.5">{errors.company.message}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                {t('agency.fields.contact')}
              </label>
              <input
                {...register('contact', { required: t('validation.required') })}
                className={agencyInputClass}
                placeholder="María García"
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1.5 ml-0.5">{errors.contact.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                {t('agency.fields.email')}
              </label>
              <input
                {...register('email', {
                  required: t('validation.required'),
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('validation.invalid_email') }
                })}
                type="email"
                className={agencyInputClass}
                placeholder="hello@company.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-0.5">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                {t('agency.fields.sector')}
              </label>
              <input
                {...register('sector')}
                className={agencyInputClass}
                placeholder="E-commerce, SaaS..."
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-medium text-gray-500 mb-2.5 ml-0.5">
              {t('agency.fields.services')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {serviceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleService(opt)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-body font-medium border transition-all duration-200 text-left ${
                    selectedServices.includes(opt)
                      ? 'bg-brand-text text-white border-brand-text shadow-sm'
                      : 'bg-gray-50/80 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {t(`agency.service_options.${opt}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
              {t('agency.fields.budget')}
            </label>
            <select {...register('budget')} className={agencyInputClass} defaultValue="">
              <option value="" disabled>{t('agency.fields.budget')}</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{t(`agency.budget_options.${opt}`)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
              {t('agency.fields.message')}
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className={agencyInputClass}
              placeholder={t('agency.fields.message')}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{t('validation.submit_error')}</p>
          )}
          <div className="pt-3">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-xl bg-brand-text text-white font-body font-medium text-sm py-3.5 px-6 hover:bg-black transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperPlaneTilt size={18} weight="fill" />
              {submitting ? '...' : t('buttons.submit')}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function InfluencerForm({ t, onSuccess }: { t: ReturnType<typeof useTranslations<'contactForms'>>; onSuccess: () => void }) {
  const [selectedCollabTypes, setSelectedCollabTypes] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<InfluencerFormData>();

  const collabOptions = ['feed_post', 'stories', 'reel', 'ugc', 'full_pack'];
  const platformOptions = ['instagram', 'tiktok', 'facebook', 'multi'];
  const budgetOptions = ['under_500', '500_1000', '1000_3000', '3000_plus', 'not_sure'];

  const toggleCollabType = (type: string) => {
    setSelectedCollabTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: InfluencerFormData) => {
    setSubmitting(true);
    setError(false);
    try {
      await submitForm('influencer', { ...data, collabType: selectedCollabTypes });
      onSuccess();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] rounded-3xl shadow-md p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-brand-text mb-6">
          {t('influencer.title')}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
                {t('influencer.fields.brand')}
              </label>
              <input
                {...register('brand', { required: t('validation.required') })}
                className={inputClass}
                placeholder="Your Brand"
              />
              {errors.brand && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.brand.message}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
                {t('influencer.fields.contact')}
              </label>
              <input
                {...register('contact', { required: t('validation.required') })}
                className={inputClass}
                placeholder="John Smith"
              />
              {errors.contact && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.contact.message}</p>}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
              {t('influencer.fields.email')}
            </label>
            <input
              {...register('email', {
                required: t('validation.required'),
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('validation.invalid_email') }
              })}
              type="email"
              className={inputClass}
              placeholder="hello@brand.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 ml-1">
              {t('influencer.fields.collabType')}
            </label>
            <div className="flex flex-wrap gap-2">
              {collabOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleCollabType(opt)}
                  className={`rounded-full px-4 py-2.5 text-sm font-body font-medium border transition-all duration-200 ${
                    selectedCollabTypes.includes(opt)
                      ? 'bg-brand-cta text-white border-brand-cta shadow-sm shadow-brand-cta/15'
                      : 'bg-white/80 text-brand-text-muted border-brand-card-border hover:border-brand-cta/40'
                  }`}
                >
                  {t(`influencer.collab_options.${opt}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
                {t('influencer.fields.platform')}
              </label>
              <select {...register('platform')} className={inputClass} defaultValue="">
                <option value="" disabled>{t('influencer.fields.platform')}</option>
                {platformOptions.map((opt) => (
                  <option key={opt} value={opt}>{t(`influencer.platform_options.${opt}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
                {t('influencer.fields.budget')}
              </label>
              <select {...register('budget')} className={inputClass} defaultValue="">
                <option value="" disabled>{t('influencer.fields.budget')}</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{t(`influencer.budget_options.${opt}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1.5 ml-1">
              {t('influencer.fields.message')}
            </label>
            <textarea
              {...register('message')}
              rows={3}
              className={inputClass}
              placeholder={t('influencer.fields.message')}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{t('validation.submit_error')}</p>
          )}
          <div className="pt-2">
            <GlossyButton type="submit" variant="full" disabled={submitting}>
              <PaperPlaneTilt size={18} weight="fill" className="mr-1" />
              {submitting ? '...' : t('buttons.submit')}
            </GlossyButton>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
