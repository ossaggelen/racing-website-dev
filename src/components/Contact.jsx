export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-ituBlueDark">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-ituAccent mb-6">
          Bize Katıl
        </p>
        <h2 className="font-display text-5xl md:text-7xl leading-tight mb-8">
          GELECEĞİN MÜHENDİSLERİ<br />
          <span className="text-stroke">PISTTE BULUŞUYOR</span>
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10">
          Farklı disiplinlerden öğrencileri bekleyen ITU Racing'e katıl, hayalini
          kurduğun yarış aracını birlikte üretelim.
        </p>
        <a
          href="mailto:info@ituracing.com"
          className="inline-block px-10 py-4 bg-white text-ituBlueDark uppercase tracking-widest text-sm font-semibold hover:bg-ituAccent hover:text-white transition-colors"
        >
          İletişime Geç
        </a>
      </div>
    </section>
  )
}
