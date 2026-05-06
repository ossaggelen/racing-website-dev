# ITU Racing — Vite + React

ITU Racing sitesinin Vite + React + Tailwind ile yeniden yazılmış versiyonu.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` açılır.

## Build

```bash
npm run build
npm run preview
```

`dist/` klasörü oluşur — Vercel/Netlify'a direkt deploy edebilirsin.

## Yapı

```
src/
├── App.jsx              # Ana sayfa düzeni
├── main.jsx             # Giriş noktası
├── index.css            # Tailwind + global style
└── components/
    ├── Navbar.jsx       # Sticky navigasyon + mobile menü
    ├── Hero.jsx         # Açılış bölümü
    ├── About.jsx        # Hakkımızda + Mission/Vision
    ├── Stats.jsx        # Sayılar bandı
    ├── Cars.jsx         # Araçlar grid
    ├── Contact.jsx      # CTA + iletişim
    └── Footer.jsx       # Alt kısım
```

## Görseller

Görselleri `public/images/` klasörüne koy, sonra component'lerde
`<img src="/images/dosya.jpg" />` olarak kullan.

Cloudinary'e yüklediğin görseller için:
```jsx
<img src="https://res.cloudinary.com/.../car.jpg" />
```

## Eksik sayfalar

Şu an sadece anasayfa var. Diğer sayfalar (Team, Sponsors, Formula Student
detay) için `react-router-dom` ekleyip yönlendirme kurabilirsin:

```bash
npm install react-router-dom
```

## Deploy

**Vercel:**
1. GitHub'a push et
2. vercel.com'da "Import Project" → repo seç
3. Otomatik deploy

**Netlify:** Aynı şekilde, build command `npm run build`, publish dir `dist`.
# racing-website
