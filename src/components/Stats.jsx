import { useI18n } from '../i18n.jsx'
import { useState, useEffect, useRef } from 'react'

function getYouTubeEmbedUrl(url) {
  if (!url || url === "#") return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

function InstaPost({ post }) {
  const isVideo = post.mediaType === 'VIDEO';
  const imageUrl = post.thumbnailUrl || post.mediaUrl;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="snap-start shrink-0 w-64 md:w-80 aspect-square overflow-hidden relative group/post block border-r border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl}
        alt="Instagram Post"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/post:scale-110"
        loading="lazy"
      />
      {isVideo && isHovered && post.mediaUrl && (
        <video
          src={post.mediaUrl}
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover/post:bg-black/70 transition-colors duration-300 flex flex-col justify-end p-6 z-20">
        {post.caption && (
          <p className="text-white text-sm text-left line-clamp-4 opacity-0 group-hover/post:opacity-100 transition-all duration-300 translate-y-4 group-hover/post:translate-y-0 drop-shadow-md">
            {post.caption}
          </p>
        )}
      </div>
      {isVideo && !isHovered && (
        <div className="absolute top-4 right-4 text-white drop-shadow-md z-10 bg-black/40 p-2 rounded-full backdrop-blur-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </a>
  )
}

// YouTube video / social CTA section
export default function Stats({ data }) {
  const { t } = useI18n()
  const videoUrl = data?.youtubeLink || "#"
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  const [instaPosts, setInstaPosts] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (data?.instagramFeedUrl) {
      fetch(data.instagramFeedUrl)
        .then(res => res.json())
        .then(feedData => {
          if (Array.isArray(feedData)) {
            setInstaPosts(feedData)
          } else if (feedData && Array.isArray(feedData.posts)) {
            setInstaPosts(feedData.posts)
          } else if (feedData && Array.isArray(feedData.data)) {
            setInstaPosts(feedData.data)
          } else {
            console.error("Unknown Behold feed format:", feedData)
          }
        })
        .catch(err => console.error("Error fetching Instagram feed:", err))
    }
  }, [data?.instagramFeedUrl])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-bg text-center overflow-hidden">
      {/* Upper Section (Video & Social) */}
      <div className="relative pt-24 pb-12 w-full">
        {/* Downward blue gradient starting from the top */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-accent/15 to-transparent z-0 pointer-events-none" />

        {/* Upward blue gradient starting from the stripe below and fading UPWARDS */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-accent/20 to-transparent z-0 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-accent tracking-wide leading-tight drop-shadow-md">
            {t.video.heading1}<br />{t.video.heading2}
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/90 drop-shadow">{t.video.sub}</p>

          <div className="mt-8 max-w-xl mx-auto aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-[#1a1d22] to-[#0c1014] shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-accent/20">
            {embedUrl ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/20" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(36, 172, 183, .06) 0 1px, transparent 1px 4px)',
                  }}
                />

                <div className="absolute inset-x-10 top-8 bottom-20 flex items-end justify-around opacity-60">
                  <div className="w-16 h-32 rounded-t-[40%] bg-gradient-to-b from-amber-200/30 to-transparent" />
                  <div className="w-16 h-36 rounded-t-[40%] bg-gradient-to-b from-pinkNeon/30 to-transparent" />
                  <div className="w-16 h-32 rounded-t-[40%] bg-gradient-to-b from-amber-200/30 to-transparent" />
                </div>

                <div className="absolute top-4 left-4 right-4 text-left">
                  <p className="text-xs font-semibold text-white">{t.video.epTitle}</p>
                  <p className="text-[11px] text-white/60 mt-1">ITU Racing</p>
                </div>

                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.3em] text-white drop-shadow-[0_0_18px_rgba(36, 172, 183, 0.55)]">
                    {t.video.meet}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[76px] h-[54px] rounded-xl bg-brandRed flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <div
                      className="w-0 h-0"
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '11px 0 11px 18px',
                        borderColor: 'transparent transparent transparent #fff',
                      }}
                    />
                  </div>
                </div>
              </a>
            )}
          </div>

          <div className="mt-10 mb-1 flex items-center justify-center gap-4 px-2">
            <a
              href={data?.instagramPageUrl || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-white drop-shadow-sm font-medium hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              {t.video.orInsta}
            </a>
            <a
              href={data?.instagramPageUrl || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-accent transition-colors">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      {instaPosts.length > 0 && (
        <div className="relative pt-12 pb-5 group w-full bg-black z-10">
          {/* Top accent stripe to separate from the upper section */}
          <div className="absolute top-0 left-0 right-0 z-20 w-full overflow-hidden">
            <img src="/ustserit.png" alt="Stripe" className="w-full h-auto object-cover opacity-90" style={{ maxHeight: '60px' }} />
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent/80 hover:border-accent hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x hide-scrollbar border-y border-white/5 relative z-10 gap-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {instaPosts.map((post) => (
              <InstaPost key={post.id} post={post} />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent/80 hover:border-accent hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </section>
  )
}
