import { createContext, useContext, useEffect, useState } from 'react'

const dict = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      formulaStudent: 'Formula Student',
      cars: 'Arabalar',
      sponsors: 'Sponsorlar',
      team: 'Takım',
      contact: 'Bize Ulaşın',
    },
    hero: {
      tagline:
        'İTÜ Racing bünyesindeki Formula takımı, her yıl dünyanın çeşitli yerlerinde düzenlenen Formula Student yarışmalarına, takımın kendi tasarladığı araçlarla katılıyor.',
    },
    about: {
      title: 'HAKKIMIZDA',
      intro:
        'ITU Racing, uluslararası Formula Student yarışlarına katılmak amacıyla 2007 yılında kuruldu. Takım, her yıl kendi tasarlayıp ürettiği araçlarla dünyanın çeşitli ülkelerinde düzenlenen Formula Student yarışlarına katılmaktadır. Farklı mühendislik alanlarından öğrencilerden oluşmaktadır.',
      missionTitle: 'MİSYON',
      mission:
        'Gelişen ve değişen otomotiv teknolojilerine ilgi gösteren mühendis adaylarının yeteneklerini göstererek ilerleme kaydedebileceği sürekli bir ortam sağlamak. Bu doğrultuda sürdürülebilir bir takım ortamı yaratmak.',
      visionTitle: 'VİZYON',
      vision:
        'Dünyada Formula Student takımları arasında yenilikçiliği, rekabetçiliği ve kabiliyetleri ile tanınan saygın ekipler arasında yer alarak ülkemizi ve üniversitemizi en iyi şekilde temsil etmek.',
    },
    video: {
      heading1: 'Hakkımızda daha fazla bilgi',
      heading2: 'edinmek için!',
      sub: 'Youtube videomuzu izleyin!',
      epTitle: 'Ekiple Tanış - En Büyük Motivasyonumuz!',
      meet: 'EKİPLE TANIŞ',
      ytLink: 'İzlemek için:',
      orInsta: 'Veya Instagram sayfamızı takip edebilirsiniz!',
    },
    fs: {
      title: 'FORMULA STUDENT',
      desc:
        "SAE (Otomotiv Mühendisleri Derneği) tarafından 1981'de başlatılan yarışma, bugün 4 kıtada, yaklaşık 20 ülkede düzenleniyor. Dünyanın en prestijli mühendislik yarışmalarından biri olarak en iyi üniversitelerden ve deneyimli profesyonellerden oluşan takımların katılımıyla gerçekleşiyor. Amacı; otomotiv endüstrisi için nitelikli mühendisler yetiştirmek ve yeni teknolojilerin test edilebileceği bir platform sağlamak. Her yarışmada genellikle 40–50 içten yanmalı, 20–30 elektrikli ve yaklaşık 10 otonom araç boy gösteriyor.",
      cta: 'Devamını oku!',
    },
    footer: {
      address1: 'TU İSTANBUL',
      address2: 'İTÜ Ayazağa Kampüsü',
      copyright: '© Telif Hakkı ITU RACING. Tüm Hakları Saklıdır',
    },
    cars: {
      races: 'Yarışlar',
      tech: 'Teknik Bilgiler',
      acceleration: 'HIZLANMA',
      accelSub: '(0-100km/saat)',
      power: 'GÜÇ',
      maxSpeed: 'MAX. HIZ',
      torque: 'TORK',
      desc1:
        "IST25, 2025 sezonunda takımımızın en başarılı araçlarından biri olarak Formula Student ATA (İtalya) ve Formula Student Türkiye yarışlarında piste çıktı. İtalya'da tüm teknik kontrolleri başarıyla tamamlayan aracımız, tüm dinamik etaplarda yarıştı, ayrıca tüm statik etaplarda ilk 10'da yer aldı.",
      desc2:
        'Takım tarihimizin en yüksek puanını elde ettiğimiz bu yarışın ardından, ilk kez düzenlenen Formula Student Türkiye yarışında katıldığımız tüm etaplarda birinci olarak şampiyon olduk ve ',
      desc2Highlight:
        "Türkiye'nin en iyi elektrikli Formula Student takımı",
      desc2End: ' unvanını kazandık.',
      tierMain: 'ANA SPONSORLAR',
      tierPlatin: 'PLATİN',
      tierGold: 'ALTIN',
      tierSilver: 'GÜMÜŞ',
      tierBronze: 'BRONZ',
    },
    fsPage: {
      title: 'FORMULA STUDENT',
      intro:
        "SAE tarafından 1981'de başlatılan Formula Student bugün yaklaşık 20 ülkede ve 4 kıtada düzenleniyor; dünyanın en prestijli mühendislik yarışmalarından biri olarak en iyi üniversitelerden takımları ve sektörden deneyimli profesyonelleri bir araya getiriyor. Yarışmanın amacı, otomotiv endüstrisi için nitelikli mühendisler yetiştirmek ve yeni teknolojilerin denenebileceği bir platform sağlamak. Her yarışmada genellikle 40–50 içten yanmalı, 20–30 elektrikli ve yaklaşık 10 otonom araç yer alıyor.",
      teamReveal: 'ITU Racing — Takım Tanıtımı',
      static: 'Statik Etaplar',
      dynamic: 'Dinamik Etaplar',
      bp: {
        t: 'İş Planı Sunumu',
        p:
          'Bu etapta takımlar, araçları veya kritik bir bileşeni etrafında uygulanabilir bir iş modelini sunuyor. Jüri potansiyel yatırımcı rolünde, 10 dakikalık katı zamanlı bir sunumun ardından ekibin herhangi bir üyesinin yanıt verebildiği bir Q&A oturumu yürütülüyor. Ayrıca 30 saniyelik bir tanıtım videosu da teslim ediliyor. Netlik, uygulanabilirlik ve finansal planlama temel puanlama unsurları.',
      },
      cm: {
        t: 'Maliyet ve Üretim',
        p:
          'Bu etap, üretilebilirliği, maliyet verimliliğini, karbon ayak izi farkındalığını ve bütçelemeyi değerlendiriyor. Takımlar; malzeme, işçilik, üretim giderleri ve süreç emisyonlarını kapsayan ayrıntılı bir maliyet ve emisyon raporu sunuyor ve performanstan ödün vermeden maliyeti ve emisyonu nasıl optimize ettiklerini ortaya koyuyor. Jüri, ayrıştırmaları sektör standartlarıyla karşılaştırıyor ve takımlara karar süreçleri ile emisyon bilgileri üzerinden sorular yöneltiyor. Etap, ayrıca takımların bir maliyet veya emisyon senaryosuna anlık yanıt vermesini gerektiren bir bölüm de içeriyor.',
      },
      ed: {
        t: 'Mühendislik Tasarım Etabı',
        p:
          "Mühendislik Tasarım Etabı; teknik derinliği, tasarım tercihlerini ve inovasyonu test ediyor. Genellikle deneyimli mühendisler ve sektör profesyonellerinden oluşan jüri, aracın yapısal, aerodinamik ve mekanik sistemlerini değerlendiriyor; takımın tasarım gerekçeleri ve mühendislik ödünleri üzerinden sorgulama yapıyor. Takımların kararlarını hesaplamalar, simülasyonlar ve fiziksel test sonuçlarıyla desteklemesi gerekiyor; performans, güvenilirlik ve üretilebilirlik ön planda.",
      },
      ac: {
        t: 'Hızlanma',
        p:
          'Hızlanma etabı, aracın duruştan başlayarak 75 metrelik (246 ft) düz bir mesafeyi ne kadar hızlı kapatabildiğini ölçüyor. Genel tasarımın ve mühendislik verimliliğinin maksimum performansa nasıl yansıdığının yoğun bir testi.',
      },
      sk: {
        t: 'Skidpad',
        p:
          'Skidpad, iki daireden oluşan bir sekiz pisti üzerinde aracın yanal tutuş ve sürüş kabiliyetini değerlendiriyor. Araç piste dik girip ısınma turlarını tamamlıyor, ardından sağ ve sol dairelerde zamanlanmış turlarını atıyor. Puanlama en iyi tur süresi üzerinden yapılıyor; sınır ihlalleri ve devrilen koniler için cezalar uygulanıyor.',
      },
      au: {
        t: 'Autocross',
        p:
          'Autocross, aracın çeviklik ve viraj alma yeteneğini sıkı dönüşler ve slalomlarla dolu kısa, teknik bir pistte ölçüyor. Her takım birkaç deneme hakkı alıyor ve nihai puana en iyi tur belirliyor. Sonuç, Endurance için sıralamayı da belirlediğinden hız ve hassasiyet birlikte ödüllendiriliyor.',
      },
      en: {
        t: 'Endurance',
        p:
          "Endurance; güvenilirlik, verimlilik ve pilot tutarlılığının nihai testi. Araçlar, gerçek dünya yarış koşullarını simüle eden uzun bir mesafeyi (genellikle yaklaşık 22 km) tamamlıyor. Etapta sürücü değişimi yapılıyor ve sürüş hataları cezalandırılıyor. Hem tamamlama süresi hem de enerji verimliliği puanlamada belirleyici olduğu için yarışmanın belkemiği niteliğinde.",
      },
    },
    sponsorsPage: {
      title: 'SPONSORLAR',
      subtitle: 'BU YOLCULUKTA BİZE DESTEK OLAN HERKESE TEŞEKKÜRLER!',
      intro1:
        'Bu yolculuğu bir hayalden gerçeğe taşırken bize verdiğiniz destek bizim için çok kıymetli.',
      intro2: 'Bu proje, sadece bir yarış aracı üretmekten çok daha fazlasını ifade ediyor:',
      bullet1Pre: 'Geliştirmek: ',
      bullet1Hl: 'Geleceğin teknolojilerini',
      bullet2Pre: 'Hayata geçirmek: ',
      bullet2Hl: 'Yenilikçi fikirleri',
      bullet3Pre: 'Zorlamak: ',
      bullet3Hl: "Mühendisliğin sınırlarını",
      intro3:
        'En iyi Formula Student aracını üretme hayalimizi bizimle paylaştığınız ve hedeflerimize ulaşmamız için bize güç verdiğiniz için teşekkür ederiz.',
      tierPlatinum: 'PLATİN',
      tierSilver: 'GÜMÜŞ',
      tierBronze: 'BRONZ',
      tierSupporters: 'DESTEKÇİLER',
      cta: 'Enerjinle bizi besle — birlikte ilerliyoruz.',
      sec1: 'Genç Mühendislerle İletişim ve İş Birliği',
      sec1a: { t: 'Doğrudan Tanışma Fırsatı', p: 'Türkiye’nin en köklü üniversitelerinden birinin yetenekli mühendis adaylarıyla doğrudan iletişim kurma ve birlikte çalışma şansı.' },
      sec1b: { t: 'İşe Alım & Staj Avantajları', p: 'Yeni yetenekleri keşfetmek ve takım üyeleriyle iş ve staj süreçlerinde öncelikli iletişim kurmak için fırsat.' },
      sec1c: { t: 'Disiplinler Arası Uzmanlık', p: 'Otomotiv, elektrik-elektronik, malzeme, makine ve yazılım mühendisliği alanlarındaki öğrencilerle bağlantı kurma imkânı.' },
      sec2: 'Marka Görünürlüğü ve Tanıtım',
      sec2a: { t: 'Araç ve Ekipman Üzerinde Logo', p: 'Sponsor logoları araç, takım kıyafetleri ve ekipmanlarda yer alır.' },
      sec2b: { t: 'Medya & Sosyal Medya Görünürlüğü', p: 'ITU Racing’in sosyal medya hesaplarında (Instagram, LinkedIn, YouTube) sürekli paylaşımlar ve marka tanıtımı; ayrıca yerel ve ulusal basındaki haberlerde marka adının yer alması.' },
      sec2c: { t: 'Etkinlik ve Fuar Tanıtımları', p: 'Teknofest, üniversite etkinlikleri ve fuarlarda; lise ve üniversite turları sırasında markanın görünürlüğü.' },
      sec3: 'Prestij ve Uluslararası Tanıtım',
      sec3a: { t: 'Uluslararası Platformların Bir Parçası', p: 'Formula Student gibi dünyanın en prestijli mühendislik yarışmalarında marka tanıtımı — uluslararası pazarlarda farkındalığı artırma şansı.' },
      sec3b: { t: 'ITU Markasıyla İş Birliği', p: 'Türkiye’nin en köklü üniversitelerinden biriyle ortaklık kurarak kurumsal prestiji yükseltme fırsatı.' },
      sec4: 'Lansman Aktiviteleri',
      sec4a: { t: 'Yeni Aracın Lansmanı', p: 'Her yıl yeni aracın lansmanını tüm sponsorlarımızla birlikte düzenliyoruz. Etkinlik, aracı yalnızca Türkiye’ye değil tüm dünyaya tanıtmak için kullanılıyor; sponsorlar geniş bir kitleye ulaşırken lansmanın merkezinde yer alıyor.' },
      sec5: 'Özel Tanıtım Çalışmaları',
      sec5a: { t: 'Sponsora Özel Kampanyalar', p: 'Sponsorun ihtiyacına göre özelleştirilmiş sosyal medya kampanyaları, videolar ve takım sunumlarında sponsor logosunun yerleştirilmesi.' },
      sec6: 'Sürdürülebilir İş Birlikleri',
      sec6a: { t: 'Uzun Vadeli Destek', p: 'Birden fazla yıla yayılabilecek iş birlikleri ile mühendislik projelerine sürekli destek.' },
      sec6b: { t: 'Üniversite-Sanayi İş Birliği', p: 'Akademik ve sektörel iş birliğini anlamlı bir biçimde destekleme yolu.' },
    },
    teamPage: {
      title: 'TAKIM',
      teamLeader: 'Takım Kaptanı',
      management: 'Takım Yönetimi',
      controlSoftware: 'Kontrol ve Yazılım',
      electrics: 'Elektrik ve Elektronik',
      aero: 'Aerodinamik',
      vd: 'Araç Dinamiği',
      chassis: 'Şasi ve Kompozit',
      powertrain: 'Güç Aktarma',
      organization: 'Organizasyon',
      finance: 'Finans ve Sponsorluk',
      security: 'Güvenlik',
      goodBoy: 'Aferin oğluma',
    },
    contactPage: {
      title: 'BİZE ULAŞIN',
      mail: 'E-POSTA',
      location: 'KONUM',
      address1: 'İTÜ Ayazağa Kampüsü',
      address2: 'Maslak, Sarıyer / İstanbul',
      directions: 'Yol tarifi al',
    },
  },
  en: {
    nav: {
      home: 'Home',
      formulaStudent: 'Formula Student',
      cars: 'Cars',
      sponsors: 'Sponsors',
      team: 'Team',
      contact: 'Contact Us',
    },
    hero: {
      tagline:
        'The Formula team within ITU Racing competes every year with cars it designs and builds itself, taking part in Formula Student events held around the world.',
    },
    about: {
      title: 'ABOUT US',
      intro:
        'ITU Racing was founded in 2007 to take part in international Formula Student competitions. Each year the team competes in events around the world with cars it designs and builds in-house. Members come from a range of engineering disciplines.',
      missionTitle: 'MISSION',
      mission:
        'To create a continuous, sustainable team environment where engineering candidates interested in evolving automotive technologies can develop and showcase their skills.',
      visionTitle: 'VISION',
      vision:
        'To stand among the world’s most respected Formula Student teams — known for innovation, competitiveness and capability — and to represent our country and our university in the best possible way.',
    },
    video: {
      heading1: 'Want to learn more',
      heading2: 'about us?',
      sub: 'Watch our latest YouTube video!',
      epTitle: 'Meet The Team — Our Biggest Motivation!',
      meet: 'MEET THE TEAM',
      ytLink: 'Watch on:',
      orInsta: 'Or follow our Instagram page!',
    },
    fs: {
      title: 'FORMULA STUDENT',
      desc:
        'Started by SAE in 1981, Formula Student is now held in around 20 countries across 4 continents. As one of the most prestigious engineering competitions in the world, it brings together top universities and experienced industry professionals. The aim is to train qualified engineers for the automotive industry and to provide a platform for testing new technologies. A typical event features around 40–50 combustion vehicles, 20–30 electric vehicles and roughly 10 autonomous vehicles.',
      cta: 'Read more!',
    },
    footer: {
      address1: 'TU ISTANBUL',
      address2: 'ITU Ayazağa Campus',
      copyright: '© Copyright ITU RACING. All Rights Reserved',
    },
    cars: {
      races: 'Races',
      tech: 'Technical Specs',
      acceleration: 'ACCELERATION',
      accelSub: '(0-100 km/h)',
      power: 'POWER',
      maxSpeed: 'TOP SPEED',
      torque: 'TORQUE',
      desc1:
        'IST25, one of the team’s most successful cars of the 2025 season, raced at Formula Student ATA (Italy) and Formula Student Turkey. In Italy the car cleared all technical inspections, completed every dynamic event, and finished in the top 10 of every static event.',
      desc2:
        'After scoring the highest result in our team’s history, we went on to win every event we entered at the inaugural Formula Student Turkey, becoming overall champions and earning the title of ',
      desc2Highlight: "Turkey’s best electric Formula Student team",
      desc2End: '.',
      tierMain: 'MAIN SPONSORS',
      tierPlatin: 'PLATINUM',
      tierGold: 'GOLD',
      tierSilver: 'SILVER',
      tierBronze: 'BRONZE',
    },
    fsPage: {
      title: 'FORMULA STUDENT',
      intro:
        'Started by SAE in 1981, Formula Student is now held in around 20 countries across 4 continents and is one of the most prestigious engineering competitions in the world. It brings together teams from top universities and experienced industry professionals. The competition aims to train qualified engineers for the automotive industry and to provide a platform for testing new technologies. Each event typically features around 40–50 combustion vehicles, 20–30 electric vehicles and roughly 10 autonomous vehicles.',
      teamReveal: 'ITU Racing — Team Reveal',
      static: 'Static Events',
      dynamic: 'Dynamic Events',
      bp: {
        t: 'Business Plan Presentation',
        p:
          'In this event, teams pitch a viable business model built around their vehicle or a key component. Acting as potential investors, judges hear a strictly timed 10-minute presentation followed by a Q&A in which any team member may answer. Teams also submit a 30-second pitch video. Clarity, feasibility and financial planning are the main scoring factors.',
      },
      cm: {
        t: 'Cost and Manufacturing',
        p:
          'This event evaluates production feasibility, cost efficiency, carbon-footprint awareness and budgeting. Teams submit a detailed cost and emissions report covering materials, labour, manufacturing expenses and process emissions, while showing how they optimise cost and emissions without compromising performance. Judges compare each breakdown against industry standards and probe each team on their decision-making and emissions knowledge. The event also includes a real-case scenario in which teams must respond to a cost- or emissions-related challenge.',
      },
      ed: {
        t: 'Engineering Design Event',
        p:
          'The Engineering Design Event tests technical depth, design choices and innovation. Judges — typically experienced engineers and industry professionals — evaluate the car’s structural, aerodynamic and mechanical systems and probe the team’s design rationale and engineering trade-offs. Teams must back up their decisions with calculations, simulations and physical test results, with emphasis on performance, reliability and manufacturability so that every design element earns its place.',
      },
      ac: {
        t: 'Acceleration',
        p:
          'The Acceleration event measures how quickly a car covers a 75-metre (246 ft) straight from a standing start. It is a focused test of the car’s overall design and engineering efficiency in delivering peak performance.',
      },
      sk: {
        t: 'Skidpad',
        p:
          'Skidpad evaluates lateral grip and handling on a figure-eight track formed by two circles. The car enters perpendicularly, runs setup laps, and then records timed laps on the right and left circles before exiting. Scoring is based on the best lap time, with penalties for boundary violations or hit cones.',
      },
      au: {
        t: 'Autocross',
        p:
          'Autocross measures a car’s agility and cornering on a short, technical circuit full of tight turns and slaloms. Each team gets multiple attempts, with the best run setting their final score. The result is also crucial for seeding positions in Endurance, rewarding both speed and precision.',
      },
      en: {
        t: 'Endurance',
        p:
          'Endurance is the ultimate test of reliability, efficiency and driver consistency. Cars complete a long distance — typically around 22 km — under simulated real-world racing conditions. The event includes driver changes and penalises any driver errors. Both completion time and energy efficiency factor into scoring, making it a decisive component of the competition.',
      },
    },
    sponsorsPage: {
      title: 'SPONSORS',
      subtitle: 'THANK YOU TO ALL WHO SUPPORTED US THROUGH THIS JOURNEY!',
      intro1:
        'Your support means a great deal to us as we work to turn this dream into reality.',
      intro2: 'This project means much more than building a racing car. It also means:',
      bullet1Pre: 'Developing ',
      bullet1Hl: 'future technologies',
      bullet2Pre: 'Bringing ',
      bullet2Hl: 'innovative ideas',
      bullet3Pre: 'Pushing the ',
      bullet3Hl: 'limits',
      intro3:
        'Thank you for sharing our dream of building the best Formula Student car and for giving us the strength to keep reaching for our goals.',
      tierPlatinum: 'PLATINUM',
      tierSilver: 'SILVER',
      tierBronze: 'BRONZE',
      tierSupporters: 'SUPPORTERS',
      cta: 'Fuel us with your energy — we move as one.',
      sec1: 'Communication and Collaboration with Young Engineers',
      sec1a: { t: 'A Direct Line to Talent', p: 'A chance to communicate and work directly with talented engineering candidates from one of Turkey’s most established universities.' },
      sec1b: { t: 'Recruitment & Internship Advantages', p: 'Priority access to discover new talent and to engage with team members for hiring and internship opportunities.' },
      sec1c: { t: 'Interdisciplinary Expertise', p: 'Connect with students across automotive, electrical-electronic, materials, mechanical and software engineering disciplines.' },
      sec2: 'Brand Visibility and Publicity',
      sec2a: { t: 'Logo on Tools and Vehicle', p: 'Sponsor logos featured on the car, team uniforms and equipment.' },
      sec2b: { t: 'Media & Social Media Visibility', p: 'Continuous posts and promotion across ITU Racing’s social channels (Instagram, LinkedIn, YouTube), plus inclusion in local and national press coverage.' },
      sec2c: { t: 'Events and Expo Advertisements', p: 'Brand exposure at Teknofest, university events, expos and during high-school and university tours.' },
      sec3: 'Prestige and International Advertisements',
      sec3a: { t: 'Part of International Platforms', p: 'Brand promotion at the world’s most prestigious engineering competitions such as Formula Student — a chance to grow recognition in international markets.' },
      sec3b: { t: 'Collaboration with the ITU Brand', p: 'A chance to elevate corporate prestige by partnering with one of Turkey’s most established universities.' },
      sec4: 'Launch Activities',
      sec4a: { t: 'Launch of the New Car', p: 'Each year we host a launch event for the new car together with all of our sponsors. The event introduces the car not only in Turkey but to the wider world, giving sponsors prestige and a chance to reach a broad audience while being kept at the forefront of the launch.' },
      sec5: 'Specialised Advertisement Work',
      sec5a: { t: 'Sponsor-Specific Campaigns', p: 'Tailored social-media campaigns, videos and placement of the sponsor’s logo within team presentations.' },
      sec6: 'Sustainable Cooperations',
      sec6a: { t: 'Long-Term Support', p: 'Show ongoing support for engineering projects through collaborations that can extend across multiple years.' },
      sec6b: { t: 'University–Industry Cooperation', p: 'A path to support academic and sectoral collaboration in a meaningful way.' },
    },
    teamPage: {
      title: 'TEAM',
      teamLeader: 'Team Leader',
      management: 'Team Management',
      controlSoftware: 'Control and Software',
      electrics: 'Electrics and Electronic',
      aero: 'Aerodynamics',
      vd: 'Vehicle Dynamics',
      chassis: 'Chassis and Composite',
      powertrain: 'Powertrain',
      organization: 'Organization',
      finance: 'Finance and Sponsorship',
      security: 'Security',
      goodBoy: 'Good boy',
    },
    contactPage: {
      title: 'CONTACT US',
      mail: 'MAIL',
      location: 'LOCATION',
      address1: 'ITU Ayazağa Campus',
      address2: 'Maslak, Sarıyer / Istanbul',
      directions: 'Get directions',
    },
  },
}

const I18nContext = createContext({ lang: 'tr', setLang: () => { }, t: dict.tr })

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'tr'
    return localStorage.getItem('itur_lang') || 'tr'
  })

  const setLang = (l) => {
    setLangState(l)
    try { localStorage.setItem('itur_lang', l) } catch (e) { }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
