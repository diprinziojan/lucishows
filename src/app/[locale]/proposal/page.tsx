'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { CheckCircle, PaperPlaneTilt } from '@phosphor-icons/react';
import { Navbar } from '@/components/Navbar';

import { Footer } from '@/components/Footer';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { fadeUp } from '@/lib/animations';
import { FormNotice, Honeypot } from '@/components/ui/FormNotice';

type ProposalFormData = {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  budget: string;
  project: string;
  websiteTrap: string;
};

const budgetOptions = ['under_500', '500_1000', '1000_3000', '3000_5000', '5000_plus', 'not_sure'];

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-body text-brand-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-text/10 focus:border-brand-text/30 transition-all duration-200 text-sm';

export default function ProposalPage() {
  const t = useTranslations('proposal');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<ProposalFormData>();

  const onSubmit = async (data: ProposalFormData) => {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'proposal', locale, ...data }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <div className="max-w-2xl mx-auto px-6 pb-16">
          <div className="text-center mb-10">
            <AnimatedHeading
              before={t('heading_before')}
              highlight={t('heading_highlight')}
              subtitle={t('subheading')}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-3"
              subtitleClassName="font-body text-brand-text-muted text-base md:text-lg"
            />
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
              role="status"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-cta to-brand-cta-hover flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" weight="fill" />
              </motion.div>
              <p className="font-heading text-2xl md:text-3xl font-bold text-brand-text mb-3">
                {t('success_title')}
              </p>
              <p className="font-body text-brand-text-muted text-base md:text-lg max-w-md mx-auto">
                {t('success_message')}
              </p>
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10">
                <form aria-busy={submitting} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Honeypot {...register('websiteTrap')} />
                  <div>
                    <label htmlFor="proposal-fullName" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.fullName')}
                    </label>
                    <input
                      id="proposal-fullName"
                      {...register('fullName', { required: t('required') })}
                      className={inputClass}
                      placeholder={t('placeholders.fullName')}
                    />
                    {errors.fullName && <p className="text-red-700 text-xs mt-1.5 ml-0.5">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="proposal-email" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.email')}
                      </label>
                      <input
                        id="proposal-email"
                      {...register('email', {
                          required: t('required'),
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('invalid_email') }
                        })}
                        type="email"
                        className={inputClass}
                        placeholder={t('placeholders.email')}
                      />
                      {errors.email && <p className="text-red-700 text-xs mt-1.5 ml-0.5">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="proposal-phone" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.phone')}
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: t('required') }}
                        render={({ field }) => (
                          <input
                            id="proposal-phone"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            autoComplete="tel"
                            type="tel"
                            className={inputClass}
                            placeholder={t('placeholders.phone')}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        )}
                      />
                      {errors.phone && <p className="text-red-700 text-xs mt-1.5 ml-0.5">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="proposal-website" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.website')}
                      </label>
                      <input
                        id="proposal-website"
                      {...register('website')}
                        type="url"
                        className={inputClass}
                        placeholder={t('placeholders.website')}
                      />
                    </div>
                    <div>
                      <label htmlFor="proposal-budget" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.budget')}
                      </label>
                      <select id="proposal-budget" {...register('budget')} className={inputClass} defaultValue="">
                        <option value="" disabled>{t('budget_options.placeholder')}</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{t(`budget_options.${opt}`)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="proposal-project" className="block font-body text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                        {t('fields.project')}
                    </label>
                    <textarea
                      id="proposal-project"
                      {...register('project', { required: t('required') })}
                      rows={4}
                      className={inputClass}
                      placeholder={t('placeholders.project')}
                    />
                    {errors.project && <p className="text-red-700 text-xs mt-1.5 ml-0.5">{errors.project.message}</p>}
                  </div>

                  <FormNotice namespace="proposal" />
                  {error && (
                    <p role="alert" className="text-red-700 text-sm text-center">{t('error')}</p>
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
                      {submitting ? t('sending') : t('submit')}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>

      </main>
      <Footer hideCta />
    </>
  );
}
