'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Heart, ChatCircle, Play, Pause } from '@phosphor-icons/react';
import { SectionWrapper } from './ui/SectionWrapper';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp } from '@/lib/animations';

const REELS = [
  { src: '/videos/video-1.mp4', likes: '455,6 mil', comments: '603' },
  { src: '/videos/video-2.mp4', likes: '45,2 mil', comments: '4.677' },
  { src: '/videos/video-3.mp4', likes: '33,2 mil', comments: '10,6 mil' },
];

function ReelCard({ reel, number }: { reel: (typeof REELS)[number]; number: number }) {
  const t = useTranslations('viralReels');
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadVideo = useInView(cardRef, { once: true, margin: '200px' });
  const visible = useInView(cardRef, { amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [userPlayback, setUserPlayback] = useState<boolean | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;
    const syncPlayback = () => {
      if (visible && !document.hidden && (userPlayback === true || userPlayback === null && !reducedMotion)) {
        void video.play().catch(() => {});
      } else video.pause();
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [visible, loadVideo, reducedMotion, userPlayback]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPlayback(true);
      void video.play().catch(() => {});
    } else {
      setUserPlayback(false);
      video.pause();
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      ref={cardRef}
      className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl shadow-lg bg-black group"
    >
      <video
        ref={videoRef}
        src={loadVideo ? reel.src : undefined}
        poster={`/videos/posters/video-${number}.jpg`}
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        loop
        muted
        playsInline
        preload="none"
      />

      {/* Play/Pause indicator */}
      <button
        type="button"
        onClick={toggle}
        aria-label={t(playing ? 'pause' : 'play', { number })}
        className={`absolute inset-0 w-full flex items-center justify-center cursor-pointer focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white transition-opacity duration-200 ${
          playing ? 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          {playing ? (
            <Pause size={28} weight="fill" className="text-white" />
          ) : (
            <Play size={28} weight="fill" className="text-white ml-0.5" />
          )}
        </div>
      </button>

      {/* Top overlay — profile */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
            <Image
              src="/images/hero.jpg"
              alt="luci.showss"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-sm font-semibold">luci.showss</span>
            <svg className="w-3.5 h-3.5 text-[#0095F6]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5L6 12.2l1.4-1.4 2.9 2.9 6.3-6.3 1.4 1.4-7.7 7.7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom overlay — metrics */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Heart size={18} weight="fill" className="text-white" />
            <span className="text-white text-xs font-semibold">{reel.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChatCircle size={18} weight="fill" className="text-white" />
            <span className="text-white text-xs font-semibold">{reel.comments}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ViralReels() {
  const t = useTranslations('viralReels');

  return (
    <SectionWrapper bg="light" id="viral-reels">
      <div className="text-center">
        <AnimatedHeading
          before={t('heading_before')}
          highlight={t('heading_highlight')}
          subtitle={t('subheading')}
          className="text-3xl md:text-5xl font-bold text-center text-foreground"
          subtitleClassName="text-foreground/60 text-lg max-w-2xl mx-auto"
        />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {REELS.map((reel, index) => (
          <ReelCard key={reel.src} reel={reel} number={index + 1} />
        ))}
      </div>
    </SectionWrapper>
  );
}
