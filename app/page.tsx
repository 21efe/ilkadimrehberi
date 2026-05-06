"use client";

import { useRef, useState, useCallback } from "react";

const WHATSAPP_NUMBER = "905462574251";
const whatsappBase = `https://wa.me/${WHATSAPP_NUMBER}`;

function whatsappLink(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.12 1.523 5.849L.044 23.956l6.266-1.64A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.792 9.792 0 01-5.015-1.376l-.36-.214-3.723.976.993-3.629-.234-.373A9.762 9.762 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
    </svg>
  );
}

const defaultMessage = "Merhaba Veysel Bey, bebek ürünü almadan önce danışmak istiyorum.";

const products = [
  ["🍼", "Bebek Arabası"],
  ["🚶", "Travel Sistem Bebek Arabası"],
  ["🛏️", "Park Beşik"],
  ["🚗", "Oto Koltuğu"],
  ["🔋", "Akülü Araba"],
  ["🤱", "Otomatik Ana Kucağı"],
  ["🌙", "Otomatik Anne Beşiği"],
  ["🪑", "Mama Sandalyesi"],
  ["👶", "Kanguru"],
  ["🚼", "Yürüteç"],
  ["📷", "Bebek Telsizi / Kamera"],
  ["✨", "Diğer Bebek Araç Gereçleri"],
];

const packages = [
  {
    name: "Basit Program",
    desc: "Tek bir ürün hakkında hızlı ve net yorum almak isteyen aileler için.",
    price: "299 ₺",
    featured: false,
    note: "",
    cta: "Bu Ürünü Sor",
    ctaStyle: "outline",
    message: "Merhaba Veysel Bey, Basit Program almak istiyorum. 1 ürün için danışmanlık almak istiyorum.",
    features: [
      "1 ürün değerlendirmesi",
      "WhatsApp üzerinden danışmanlık",
      "Ürünün artı/eksi yorumu",
      "Bütçeye göre kısa değerlendirme",
    ],
  },
  {
    name: "Orta Paket",
    desc: "Birkaç ürün arasında kararsız kalan aileler için en mantıklı seçim.",
    price: "499 ₺",
    featured: true,
    note: "💡 1 yanlış alışverişten daha ucuz",
    cta: "Karşılaştırma Al",
    ctaStyle: "wa",
    message: "Merhaba Veysel Bey, Orta Paket almak istiyorum. Birkaç ürün arasında kararsız kaldım.",
    features: [
      "3 ürüne kadar karşılaştırma",
      "Artı/eksi analizi",
      "Kullanım ihtiyacına göre öneri",
      "Alternatif ürün yorumu",
      "WhatsApp üzerinden birebir destek",
    ],
  },
  {
    name: "Premium Paket",
    desc: "Bebek alışverişini toplu planlamak isteyen aileler için.",
    price: "699 ₺",
    featured: false,
    note: "",
    cta: "Alışverişimi Planla",
    ctaStyle: "outline",
    message: "Merhaba Veysel Bey, Premium Paket almak istiyorum. Bebek alışverişimi kapsamlı planlamak istiyorum.",
    features: [
      "5+ ürün değerlendirmesi",
      "Kategori bazlı öneri",
      "Bütçe planına göre yönlendirme",
      "Temel ürünlerde kapsamlı destek",
      "Öncelikli WhatsApp dönüşü",
    ],
  },
];

const reviews = [
  {
    avatar: "👩",
    name: "Ayşe K.",
    role: "7 aylık bebek annesi",
    text: "İki farklı bebek arabası arasında haftalardır kararsız kaldım. Linklerini attım, hangisinin bizim için daha mantıklı olduğunu, farkını ve neden birini önerdiğini tek tek anlattı.",
  },
  {
    avatar: "👩‍👧",
    name: "Merve T.",
    role: "İkinci çocuğunu bekleyen anne",
    featured: true,
    text: "Park beşik için neredeyse 8 bin TL'lik bir ürün alacaktım. Veysel Bey kullanım ihtiyacımı sordu, ona göre çok daha uygun fiyatlı ama işlevsel bir alternatif önerdi.",
  },
  {
    avatar: "👨",
    name: "Emre S.",
    role: "Baba, arabada çok yolculuk yapıyor",
    text: "Oto koltuğu almak istiyordum ama grubu, taban yüksekliği, araç uyumu derken tamamen kayboldum. Araç modelimi ve bebeğimin kilosunu söyledim, çok daha net karar verdim.",
  },
  {
    avatar: "🧕",
    name: "Fatma D.",
    role: "5 aylık bebek annesi",
    featured: true,
    text: "Otomatik ana kucağı almayı düşünüyordum. Linki attım, bebeğimin yaşını ve kullanım amacımı sordu. Modelin bize uygun olmadığını nedenleriyle açıkladı.",
  },
  {
    avatar: "👩‍👦",
    name: "Selin A.",
    role: "Anne, 2 yaşında çocuğu var",
    text: "Akülü araba almayı düşünüyorduk ama yaş uyumu, güvenlik özellikleri ve kullanım alanını hiç düşünmemiştik. Gereksiz bir ürün almaktan kurtulduk.",
  },
  {
    avatar: "👨‍👩‍👦",
    name: "Burak & Zeynep",
    role: "Aile, ilk bebekleri geliyor",
    text: "Premium paketi aldık çünkü ilk bebeğimiz ve listede 6-7 ürün vardı. Bütçemizi nasıl dağıtmamız gerektiği konusunda çok yardımcı oldu.",
  },
];

const faqs = [
  ["Danışmanlık nasıl yapılıyor?", "WhatsApp üzerinden ürün linki, fotoğrafı veya model adı göndererek danışmanlık alabilirsiniz."],
  ["Hangi ürünleri sorabilirim?", "Bebek arabası, park beşik, oto koltuğu, ana kucağı, akülü araba, mama sandalyesi ve birçok bebek araç gereci hakkında danışabilirsiniz."],
  ["Ürünleri siz mi satıyorsunuz?", "Hayır. Bu hizmet ürün satışı değil, ürün seçimi konusunda danışmanlık hizmetidir."],
  ["Kesin olarak hangi ürünü almalıyım diyebilir misiniz?", "İhtiyacınıza ve bütçenize göre en mantıklı seçenekleri yorumlayabiliriz. Son satın alma kararı size aittir."],
  ["Danışmanlık ücretli mi?", "Paketlere göre ücretlendirme yapılır. Güncel bilgi için WhatsApp'tan iletişime geçebilirsiniz."],
  ["Ödeme nasıl yapılıyor?", "Paket seçimi sonrası ödeme bilgileri WhatsApp üzerinden paylaşılır. Ödeme tamamlandıktan sonra danışmanlık süreci başlar."],
  ["Marka öneriyor musunuz?", "Belirli bir markayı reklam veya anlaşma nedeniyle önermiyoruz. Ürünleri ihtiyacınıza, bütçenize ve kullanım durumunuza göre değerlendiriyoruz."],
  ["Komisyon alıyor musunuz?", "Hayır. Ürün satışından, mağazadan veya markadan komisyon almıyoruz."],
  ["En pahalı ürünü mü öneriyorsunuz?", "Hayır. Amacımız pahalı olanı değil, bütçenize ve kullanım ihtiyacınıza en uygun olanı değerlendirmektir."],
  ["Danışmanlık almadan ürünü kendim seçemez miyim?", "Elbette seçebilirsiniz. Bu hizmet, kararsız kaldığınızda ikinci bir göz sağlar ve ürünün ihtiyacınıza uygun olup olmadığını daha bilinçli değerlendirmenize yardımcı olur."],
  ["Sizden ürün satın alabilir miyim?", "Hayır. Bu hizmet ürün satışı değil, satın alma öncesi danışmanlık hizmetidir."],
];

const trustProblems = [
  { icon: "📢", title: "Abartılı satış anlatımları", text: "Ürünü sadece güzel göstermek için yapılan satış konuşmaları çoğu zaman gerçek kullanım deneyimini yansıtmaz.", color: "amber" },
  { icon: "🤖", title: "Bot ve sahte yorum karmaşası", text: "İnternetteki yorumların hangisinin gerçek kullanıcı deneyimi olduğunu anlamak her zaman kolay değildir.", color: "rose" },
  { icon: "📵", title: "Satış sonrası ulaşamama problemi", text: "Bazı kullanıcılar ürünü aldıktan sonra destek alamadığını veya satıcıya ulaşamadığını söylüyor.", color: "orange" },
  { icon: "🎯", title: "İhtiyaca uygun olmayan ürünler", text: "Her popüler veya pahalı ürün her aile için doğru seçim olmayabilir.", color: "purple" },
];

const heroTrustPoints = [
  "Pahalı ürün = doğru ürün değildir",
  "Gerçek ihtiyaç analizi",
  "Satış değil, danışmanlık",
];

const footerTrustItems = [
  "Marka reklamı yok",
  "Komisyon anlaşması yok",
  "Sahte yorum yönlendirmesi yok",
  "Gerçek kullanım odaklı değerlendirme",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderScroll = useCallback(() => {
    const track = sliderRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const scrollLeft = track.scrollLeft;
    const trackWidth = track.offsetWidth;
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - scrollLeft - (trackWidth - child.offsetWidth) / 2);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setCurrentReview(closest);
  }, []);

  const goToReview = (index: number) => {
    const next = Math.max(0, Math.min(index, reviews.length - 1));
    setCurrentReview(next);
    const card = sliderRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800&display=swap');
        :root {
          --cream: #FDF8F2;
          --cream-dark: #F5EDE0;
          --cream-border: #EAD9C5;
          --lavender: #9B7EC8;
          --lavender-light: #C4A8E8;
          --lavender-dark: #7A5FAA;
          --lavender-bg: #F3EEF9;
          --green-wa: #25D366;
          --green-wa-dark: #1DA851;
          --text-dark: #2C1F0E;
          --text-mid: #6B5744;
          --text-soft: #9C8572;
          --white: #FFFFFF;
          --shadow-soft: 0 4px 24px rgba(155, 126, 200, 0.12);
          --shadow-card: 0 2px 16px rgba(44, 31, 14, 0.07);
          --radius: 20px;
          --radius-sm: 12px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Nunito', sans-serif; background: var(--cream); color: var(--text-dark); overflow-x: hidden; }

        /* NAV */
        nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.94); backdrop-filter: blur(14px); border-bottom: 1px solid var(--cream-border); padding: 0 24px; }
        .nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 16px; }
        .nav-logo { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--lavender-dark); text-decoration: none; white-space: nowrap; }
        .nav-logo span { color: var(--text-dark); }
        .nav-links { display: flex; gap: 24px; list-style: none; }
        .nav-links a { font-size: 0.88rem; font-weight: 600; color: var(--text-mid); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--lavender-dark); }
        .btn-wa-nav { background: var(--green-wa); color: #fff; border: none; border-radius: 50px; padding: 10px 20px; font-size: 0.85rem; font-weight: 700; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 7px; white-space: nowrap; transition: background 0.22s, transform 0.18s, box-shadow 0.22s; box-shadow: 0 0 0 4px rgba(37,211,102,0.08), 0 10px 24px rgba(37,211,102,0.22); }
        .btn-wa-nav:hover { background: var(--green-wa-dark); transform: translateY(-2px) scale(1.03); box-shadow: 0 0 0 7px rgba(37,211,102,0.10), 0 16px 34px rgba(37,211,102,0.32); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: transparent; border: 0; }
        .hamburger span { width: 24px; height: 2.5px; background: var(--text-mid); border-radius: 4px; display: block; transition: 0.3s; }
        .mobile-menu { display: none; flex-direction: column; background: var(--cream); border-top: 1px solid var(--cream-border); padding: 16px 24px 24px; gap: 12px; }
        .mobile-menu a { font-size: 1rem; font-weight: 600; color: var(--text-mid); text-decoration: none; padding: 8px 0; border-bottom: 1px solid var(--cream-border); }
        .mobile-menu.open { display: flex; }

        /* HERO */
        .hero { background: linear-gradient(160deg, var(--lavender-bg) 0%, var(--cream) 55%); padding: 80px 24px 72px; text-align: center; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(196,168,232,0.18) 0%, transparent 70%); top: -120px; right: -140px; pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--white); border: 1.5px solid var(--lavender-light); border-radius: 50px; padding: 6px 16px; font-size: 0.82rem; font-weight: 700; color: var(--lavender-dark); margin-bottom: 24px; animation: fadeUp 0.6s ease both; }
        .hero h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5.5vw, 3.4rem); line-height: 1.2; color: var(--text-dark); max-width: 760px; margin: 0 auto 20px; animation: fadeUp 0.7s 0.1s ease both; }
        .hero h1 em { color: var(--lavender-dark); font-style: italic; }
        .hero-sub { font-size: 1.05rem; color: var(--text-mid); max-width: 620px; margin: 0 auto 36px; line-height: 1.7; animation: fadeUp 0.7s 0.2s ease both; }
        .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; animation: fadeUp 0.7s 0.3s ease both; }
        .btn-wa-main { background: linear-gradient(135deg, var(--green-wa), #1FCB63); color: #fff; border: none; border-radius: 50px; padding: 15px 30px; font-size: 1rem; font-weight: 800; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 9px; transition: background 0.22s, transform 0.18s, box-shadow 0.22s; box-shadow: 0 0 0 5px rgba(37,211,102,0.10), 0 10px 28px rgba(37,211,102,0.34); }
        .btn-wa-main:hover { background: linear-gradient(135deg, var(--green-wa-dark), #20C964); transform: translateY(-3px); box-shadow: 0 0 0 9px rgba(37,211,102,0.12), 0 18px 40px rgba(37,211,102,0.42); }
        .btn-outline { background: rgba(255,255,255,0.45); color: var(--lavender-dark); border: 2px solid var(--lavender-light); border-radius: 50px; padding: 13px 26px; font-size: 1rem; font-weight: 700; cursor: pointer; text-decoration: none; transition: background 0.22s, transform 0.18s, box-shadow 0.22s, border-color 0.22s; box-shadow: 0 8px 22px rgba(122,95,170,0.08); }
        .btn-outline:hover { background: var(--white); border-color: var(--lavender-dark); transform: translateY(-3px); box-shadow: 0 14px 34px rgba(122,95,170,0.16); }
        .trust-pills { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.7s 0.4s ease both; }
        .trust-pill { display: flex; align-items: center; gap: 7px; background: var(--white); border: 1px solid var(--cream-border); border-radius: 50px; padding: 8px 16px; font-size: 0.82rem; font-weight: 600; color: var(--text-mid); box-shadow: var(--shadow-card); }

        /* DECISION STRIP */
        .decision-strip { background: linear-gradient(180deg, var(--cream) 0%, var(--lavender-bg) 100%); padding: 0 24px 72px; }
        .decision-card { max-width: 980px; margin: -18px auto 0; background: rgba(255,255,255,0.88); border: 1.5px solid var(--lavender-light); border-radius: 24px; box-shadow: 0 18px 50px rgba(122,95,170,0.13); padding: 34px; position: relative; overflow: hidden; backdrop-filter: blur(14px); }
        .decision-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(196,168,232,0.16), transparent 48%, rgba(37,211,102,0.08)); pointer-events: none; }
        .decision-content { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr 1fr; gap: 30px; align-items: center; }
        .decision-copy h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.55rem, 3.4vw, 2.35rem); line-height: 1.2; color: var(--text-dark); margin-bottom: 12px; }
        .decision-copy p { color: var(--text-mid); line-height: 1.75; font-size: 0.98rem; }
        .decision-mini-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .decision-mini { background: var(--white); border: 1px solid var(--cream-border); border-radius: 16px; padding: 14px 16px; color: var(--text-dark); font-weight: 800; box-shadow: var(--shadow-card); display: flex; align-items: center; gap: 10px; }
        .decision-mini::before { content: '✓'; width: 24px; height: 24px; border-radius: 50%; background: var(--lavender-bg); color: var(--lavender-dark); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.82rem; }

        /* GLOBAL */
        section { padding: 72px 24px; }
        .container { max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 0.78rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lavender); margin-bottom: 10px; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 4vw, 2.4rem); color: var(--text-dark); margin-bottom: 14px; line-height: 1.25; }
        .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.7; max-width: 560px; }
        .section-header { margin-bottom: 44px; }

        /* PROFILE */
        .profile-section { background: var(--lavender-bg); }
        .profile-card { background: var(--white); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow-soft); display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: center; max-width: 900px; margin: 0 auto; }
        .profile-avatar { background: linear-gradient(135deg, var(--lavender-light), var(--lavender-dark)); border-radius: var(--radius); aspect-ratio: 1; max-width: 220px; width: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; box-shadow: 0 8px 32px rgba(155,126,200,0.3); }
        .profile-name { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: var(--text-dark); margin-bottom: 6px; }
        .profile-title { font-size: 0.88rem; font-weight: 700; color: var(--lavender); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
        .profile-desc { font-size: 0.97rem; color: var(--text-mid); line-height: 1.75; margin-bottom: 24px; }
        .profile-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { background: var(--lavender-bg); border: 1px solid var(--lavender-light); color: var(--lavender-dark); font-size: 0.78rem; font-weight: 700; padding: 5px 12px; border-radius: 50px; }

        /* STEPS */
        .steps-section { background: var(--cream); }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .step-card { background: var(--white); border-radius: var(--radius); padding: 32px 28px; box-shadow: var(--shadow-card); border: 1px solid var(--cream-border); transition: transform 0.2s, box-shadow 0.2s; }
        .step-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-soft); }
        .step-num { width: 44px; height: 44px; background: var(--lavender-dark); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 20px; }
        .step-card h3 { font-size: 1.05rem; font-weight: 800; color: var(--text-dark); margin-bottom: 10px; }
        .step-card p { font-size: 0.91rem; color: var(--text-mid); line-height: 1.65; }

        /* PRODUCTS */
        .products-section { background: var(--cream-dark); }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
        .product-card { background: var(--white); border-radius: var(--radius-sm); padding: 22px 16px; text-align: center; border: 1.5px solid var(--cream-border); transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .product-card:hover { border-color: var(--lavender-light); transform: translateY(-3px); box-shadow: var(--shadow-soft); }
        .product-emoji { font-size: 2rem; margin-bottom: 10px; }
        .product-card p { font-size: 0.84rem; font-weight: 700; color: var(--text-mid); }

        /* PACKAGES */
        .packages-section { background: var(--lavender-bg); }
        .package-conversion-note { max-width: 720px; margin: -24px auto 42px; background: rgba(255,255,255,0.82); border: 1.5px solid var(--lavender-light); border-radius: 18px; padding: 16px 20px; color: var(--lavender-dark); font-size: 0.95rem; font-weight: 800; text-align: center; box-shadow: 0 12px 32px rgba(122,95,170,0.10); }
        .packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }
        .package-card { background: var(--white); border-radius: var(--radius); padding: 36px 28px; border: 2px solid var(--cream-border); box-shadow: var(--shadow-card); display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; }
        .package-card:hover { transform: translateY(-5px); box-shadow: 0 16px 44px rgba(155,126,200,0.18); }
        .package-card.featured { border-color: var(--lavender); background: linear-gradient(180deg, #F8F3FF 0%, var(--white) 100%); position: relative; }
        .featured-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--lavender-dark); color: #fff; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.06em; padding: 5px 14px; border-radius: 50px; white-space: nowrap; }
        .package-name { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: var(--text-dark); margin-bottom: 8px; }
        .package-desc { font-size: 0.88rem; color: var(--text-soft); line-height: 1.6; margin-bottom: 20px; }
        .price-amount { font-family: 'DM Serif Display', serif; font-size: 2rem; color: var(--text-dark); font-weight: 700; }
        .sales-note { display: inline-block; background: linear-gradient(135deg, #FFF3CD, #FFE8A3); border: 1.5px solid #F5C842; border-radius: 50px; padding: 7px 16px; font-size: 0.82rem; font-weight: 800; color: #7A5A00; margin: 16px 0 18px; }
        .package-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 16px 0 28px; flex: 1; }
        .package-features li { display: flex; align-items: flex-start; gap: 9px; font-size: 0.88rem; color: var(--text-mid); line-height: 1.5; }
        .check { color: var(--lavender-dark); font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
        .btn-package { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 50px; font-size: 0.92rem; font-weight: 800; text-decoration: none; transition: background 0.22s, transform 0.18s, box-shadow 0.22s, border-color 0.22s; }
        .btn-package-wa { background: linear-gradient(135deg, var(--green-wa), #20C964); color: #fff; box-shadow: 0 0 0 5px rgba(37,211,102,0.10), 0 9px 24px rgba(37,211,102,0.28); }
        .btn-package-wa:hover { background: linear-gradient(135deg, var(--green-wa-dark), #20C964); transform: translateY(-3px); box-shadow: 0 0 0 8px rgba(37,211,102,0.12), 0 16px 34px rgba(37,211,102,0.38); }
        .btn-package-outline { background: transparent; color: var(--lavender-dark); border: 2px solid var(--lavender-light); }
        .btn-package-outline:hover { background: var(--white); border-color: var(--lavender-dark); transform: translateY(-3px); box-shadow: 0 12px 28px rgba(122,95,170,0.14); }

        /* ABOUT */
        .about-section { background: var(--cream); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; max-width: 960px; margin: 0 auto; }
        .about-text p { font-size: 0.97rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 18px; }
        .about-text p:last-of-type { margin-bottom: 24px; }
        .about-text blockquote { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--lavender-dark); border-left: 3px solid var(--lavender-light); padding-left: 16px; margin: 20px 0; font-style: italic; line-height: 1.6; }
        .about-text .highlight-line { background: var(--lavender-bg); border-radius: 10px; padding: 10px 14px; font-size: 0.92rem; font-weight: 700; color: var(--lavender-dark); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .about-stat-row { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 28px; }
        .about-stat { background: var(--lavender-bg); border: 1.5px solid var(--lavender-light); border-radius: var(--radius-sm); padding: 14px 18px; flex: 1; min-width: 110px; text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
        .about-stat:hover { transform: translateY(-3px); box-shadow: var(--shadow-soft); }
        .about-stat-num { font-family: 'DM Serif Display', serif; font-size: 1.7rem; color: var(--lavender-dark); display: block; }
        .about-stat-label { font-size: 0.72rem; font-weight: 700; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.06em; }
        .about-visual { background: linear-gradient(145deg, var(--lavender-bg), #EDE4F8); border-radius: var(--radius); padding: 36px 28px; border: 1.5px solid var(--lavender-light); position: sticky; top: 90px; }
        .about-visual-emoji { font-size: 3rem; margin-bottom: 16px; display: block; }
        .about-visual-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--lavender-dark); margin-bottom: 12px; }
        .about-no-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .about-no-list li { font-size: 0.88rem; color: var(--text-mid); display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .about-no-list li::before { content: '✗'; width: 22px; height: 22px; border-radius: 50%; background: #FEE2E2; color: #DC2626; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.78rem; font-weight: 800; }
        .about-yes-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
        .about-yes-list li { font-size: 0.88rem; color: var(--text-mid); display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .about-yes-list li::before { content: '✓'; width: 22px; height: 22px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.78rem; font-weight: 800; }
        .about-divider { border: none; border-top: 1px solid var(--lavender-light); margin: 16px 0; }

        /* TRANSPARENCY */
        .transparency-section { background: var(--cream-dark); }
        .transparency-header { text-align: center; max-width: 680px; margin: 0 auto 44px; }
        .transparency-sub { font-size: 0.97rem; color: var(--text-mid); line-height: 1.75; margin-top: 12px; }
        .transparency-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 36px; }
        .trans-card { background: var(--white); border-radius: var(--radius); padding: 28px 20px; text-align: center; border: 1.5px solid var(--cream-border); transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .trans-card:hover { border-color: var(--lavender-light); transform: translateY(-3px); box-shadow: var(--shadow-soft); }
        .trans-icon { font-size: 2rem; margin-bottom: 12px; display: block; }
        .trans-card h4 { font-size: 0.95rem; font-weight: 800; color: var(--text-dark); margin-bottom: 6px; }
        .trans-card p { font-size: 0.82rem; color: var(--text-soft); line-height: 1.55; }
        .transparency-note { background: linear-gradient(135deg, #2C1F0E, #4A3020); border-radius: var(--radius); padding: 28px 40px; text-align: center; color: rgba(255,255,255,0.9); max-width: 800px; margin: 0 auto; }
        .transparency-note p { font-size: 0.97rem; line-height: 1.75; }
        .transparency-note strong { color: var(--lavender-light); }

        /* REAL CONSULTING */
        .real-consulting-section { background: var(--cream); }
        .real-consulting-header { text-align: center; max-width: 680px; margin: 0 auto 48px; }
        .real-consulting-header .section-title { margin-bottom: 16px; }
        .real-consulting-desc { font-size: 1rem; color: var(--text-mid); line-height: 1.75; }
        .problem-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 36px; }
        .problem-card { background: var(--white); border-radius: var(--radius); padding: 28px 22px; border: 1.5px solid var(--cream-border); overflow: hidden; transition: transform 0.22s, box-shadow 0.22s; }
        .problem-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-soft); }
        .problem-card.amber { border-top: 3px solid #F59E0B; }
        .problem-card.amber .problem-icon-wrap { background: #FFFBEB; }
        .problem-card.rose { border-top: 3px solid #F43F5E; }
        .problem-card.rose .problem-icon-wrap { background: #FFF1F3; }
        .problem-card.orange { border-top: 3px solid #FB923C; }
        .problem-card.orange .problem-icon-wrap { background: #FFF7ED; }
        .problem-card.purple { border-top: 3px solid var(--lavender); }
        .problem-card.purple .problem-icon-wrap { background: var(--lavender-bg); }
        .problem-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .problem-icon-wrap span { font-size: 1.5rem; line-height: 1; }
        .problem-card h4 { font-size: 0.97rem; font-weight: 800; color: var(--text-dark); margin-bottom: 10px; line-height: 1.3; }
        .problem-card p { font-size: 0.85rem; color: var(--text-mid); line-height: 1.65; }
        .real-consulting-footer { background: linear-gradient(135deg, var(--lavender-bg) 0%, #EDE4F8 100%); border: 1.5px solid var(--lavender-light); border-radius: var(--radius); padding: 28px 36px; display: flex; align-items: center; gap: 20px; max-width: 860px; margin: 0 auto; }
        .real-consulting-footer-icon { width: 56px; height: 56px; background: linear-gradient(135deg, var(--lavender-light), var(--lavender-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0; box-shadow: 0 4px 16px rgba(122,95,170,0.28); }
        .real-consulting-footer p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.7; }
        .real-consulting-footer p strong { color: var(--lavender-dark); font-weight: 800; }

        /* TRUST BOX */
        .trust-box-section { background: var(--lavender-bg); }
        .trust-box { background: var(--white); border-radius: var(--radius); padding: 40px 44px; border: 1.5px solid var(--lavender-light); box-shadow: var(--shadow-soft); display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; max-width: 860px; margin: 0 auto; }
        .trust-box-icon { width: 76px; height: 76px; background: linear-gradient(135deg, var(--lavender-light), var(--lavender-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; flex-shrink: 0; }
        .trust-box h3 { font-family: 'DM Serif Display', serif; font-size: 1.45rem; color: var(--text-dark); margin-bottom: 10px; }
        .trust-box p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.75; }

        /* REVIEWS */
        .reviews-section { background: var(--cream); }
        .slider-wrapper { position: relative; overflow: hidden; margin: 0 -8px; }
        .slider-track { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 8px 8px 16px; scrollbar-width: none; }
        .slider-track::-webkit-scrollbar { display: none; }
        .review-card { background: var(--white); border-radius: var(--radius); padding: 28px 24px; border: 1.5px solid var(--cream-border); box-shadow: var(--shadow-card); flex: 0 0 calc(33.333% - 14px); min-width: 280px; display: flex; flex-direction: column; gap: 14px; scroll-snap-align: start; transition: transform 0.2s, box-shadow 0.2s; }
        .review-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-soft); }
        .review-disclaimer { font-size: 0.7rem; font-weight: 700; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.06em; background: var(--cream-dark); border-radius: 50px; padding: 3px 10px; align-self: flex-start; }
        .review-avatar { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--lavender-light), var(--lavender-dark)); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
        .review-header { display: flex; align-items: center; gap: 12px; }
        .review-name { font-weight: 800; font-size: 0.92rem; color: var(--text-dark); }
        .review-role { font-size: 0.76rem; color: var(--text-soft); font-weight: 600; }
        .review-stars { color: #F5A623; font-size: 0.85rem; letter-spacing: 1px; }
        .review-text { font-size: 0.9rem; color: var(--text-mid); line-height: 1.65; font-style: italic; flex: 1; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
        .review-text::before { content: '"'; font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--lavender-light); line-height: 0; vertical-align: -8px; margin-right: 2px; }
        .review-text::after { content: '"'; font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--lavender-light); line-height: 0; vertical-align: -8px; margin-left: 2px; }
        .experience-label { border-radius: var(--radius-sm); background: linear-gradient(135deg, var(--lavender-bg), #EDE4F8); height: 52px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--lavender-light); }
        .experience-label span { font-size: 0.78rem; font-weight: 800; color: var(--lavender-dark); letter-spacing: 0.05em; }
        .slider-controls { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 28px; }
        .slider-btn { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--lavender-light); background: var(--white); color: var(--lavender-dark); font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
        .slider-btn:hover { background: var(--lavender-bg); transform: scale(1.08); box-shadow: var(--shadow-soft); }
        .slider-dots { display: flex; gap: 6px; }
        .slider-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--lavender-light); cursor: pointer; transition: background 0.2s, transform 0.2s; border: none; padding: 0; }
        .slider-dot.active { background: var(--lavender-dark); transform: scale(1.3); }

        /* WHY */
        .why-section { background: var(--cream-dark); }
        .why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
        .why-card { background: var(--white); border-radius: var(--radius); padding: 28px 24px; border: 1px solid var(--cream-border); display: flex; align-items: flex-start; gap: 16px; transition: transform 0.2s, box-shadow 0.2s; }
        .why-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-soft); }
        .why-icon { width: 44px; height: 44px; background: var(--lavender-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
        .why-card p { font-size: 0.92rem; color: var(--text-mid); line-height: 1.6; font-weight: 600; }

        /* CTA SECTION */
        .cta-section { background: linear-gradient(135deg, var(--lavender-dark) 0%, #5A3A8A 100%); text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: rgba(255,255,255,0.05); bottom: -150px; right: -100px; pointer-events: none; }
        .cta-section h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 4vw, 2.4rem); color: #fff; margin-bottom: 14px; }
        .cta-section > div > p { font-size: 1rem; color: rgba(255,255,255,0.8); max-width: 520px; margin: 0 auto 36px; line-height: 1.7; }
        .cta-prelude { max-width: 680px; margin: 0 auto 30px; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.22); border-radius: 22px; padding: 22px 26px; backdrop-filter: blur(10px); box-shadow: 0 18px 44px rgba(26,15,51,0.18); }
        .cta-prelude h3 { font-family: 'DM Serif Display', serif; color: #fff; font-size: clamp(1.35rem, 3vw, 2rem); margin-bottom: 8px; }
        .cta-prelude p { margin: 0 auto; color: rgba(255,255,255,0.82); max-width: 540px; }

        /* FAQ */
        .faq-section { background: var(--cream-dark); }
        .faq-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: var(--white); border-radius: var(--radius-sm); border: 1px solid var(--cream-border); overflow: hidden; transition: box-shadow 0.2s; }
        .faq-item:hover { box-shadow: var(--shadow-card); }
        .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; cursor: pointer; font-weight: 700; font-size: 0.95rem; color: var(--text-dark); user-select: none; gap: 12px; background: transparent; border: 0; width: 100%; text-align: left; font-family: inherit; transition: background 0.2s; }
        .faq-question:hover { background: var(--lavender-bg); }
        .faq-arrow { font-size: 1.1rem; color: var(--lavender); transition: transform 0.3s; flex-shrink: 0; }
        .faq-item.open .faq-arrow { transform: rotate(180deg); }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.3s; font-size: 0.92rem; color: var(--text-mid); line-height: 1.7; }
        .faq-item.open .faq-answer { max-height: 220px; padding: 0 24px 20px; }

        /* FOOTER TRUST */
        .footer-trust-section { background: linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%); padding: 68px 24px; }
        .footer-trust-card { max-width: 900px; margin: 0 auto; background: var(--white); border: 1.5px solid var(--cream-border); border-radius: 24px; padding: 34px; box-shadow: var(--shadow-soft); display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; align-items: center; }
        .footer-trust-card h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.45rem, 3.4vw, 2.2rem); line-height: 1.22; color: var(--text-dark); }
        .footer-trust-card > div > p { color: var(--text-mid); line-height: 1.7; margin-top: 10px; }
        .footer-trust-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .footer-trust-item { background: var(--lavender-bg); border: 1px solid var(--lavender-light); border-radius: 14px; padding: 13px 14px; color: var(--lavender-dark); font-size: 0.9rem; font-weight: 800; display: flex; align-items: center; gap: 9px; }
        .footer-trust-item::before { content: '✓'; width: 22px; height: 22px; border-radius: 50%; background: var(--white); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.78rem; }

        /* FOOTER */
        footer { background: var(--text-dark); color: rgba(255,255,255,0.75); padding: 48px 24px 32px; text-align: center; }
        .footer-logo { font-family: 'DM Serif Display', serif; font-size: 1.6rem; color: #fff; margin-bottom: 10px; }
        .footer-logo span { color: var(--lavender-light); }
        .footer-desc { font-size: 0.9rem; margin-bottom: 24px; }
        .footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 24px 0; }
        .footer-note { font-size: 0.78rem; color: rgba(255,255,255,0.45); line-height: 1.6; max-width: 600px; margin: 0 auto; }
        .footer-links { display: flex; gap: 20px; justify-content: center; margin-top: 16px; }
        .footer-links a { font-size: 0.78rem; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--lavender-light); }

        /* FLOATING WA BUTTON */
        .floating-wa { position: fixed; bottom: 24px; right: 24px; z-index: 200; display: flex; align-items: center; gap: 9px; background: linear-gradient(135deg, var(--green-wa), #1FCB63); color: #fff; text-decoration: none; border-radius: 50px; padding: 13px 22px; font-size: 0.92rem; font-weight: 800; box-shadow: 0 0 0 5px rgba(37,211,102,0.12), 0 12px 32px rgba(37,211,102,0.38); transition: background 0.22s, transform 0.18s, box-shadow 0.22s; }
        .floating-wa:hover { background: linear-gradient(135deg, var(--green-wa-dark), #20C964); transform: translateY(-3px); box-shadow: 0 0 0 9px rgba(37,211,102,0.14), 0 18px 44px rgba(37,211,102,0.46); }

        /* ANIMATIONS */
        .reveal { animation: revealUp both; animation-timeline: view(); animation-range: entry 8% cover 28%; }
        @supports not (animation-timeline: view()) { .reveal { animation: fadeUp 0.7s ease both; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revealUp { from { opacity: 0; transform: translateY(34px) scale(0.985); filter: blur(4px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }

        /* RESPONSIVE */
        @media (max-width: 860px) {
          .nav-links, .btn-wa-nav { display: none; }
          .hamburger { display: flex; }
          .profile-card { grid-template-columns: 1fr; text-align: center; }
          .profile-avatar { max-width: 160px; margin: 0 auto; }
          .profile-tags { justify-content: center; }
          .steps-grid, .packages-grid, .about-grid { grid-template-columns: 1fr; }
          .about-visual { position: static; }
          .transparency-grid { grid-template-columns: repeat(2, 1fr); }
          .problem-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-box { grid-template-columns: 1fr; text-align: center; }
          .trust-box-icon { margin: 0 auto; }
          .review-card { flex: 0 0 calc(85% - 10px); }
          .real-consulting-footer { flex-direction: column; text-align: center; }
          .real-consulting-footer-icon { margin: 0 auto; }
          .decision-content, .footer-trust-card { grid-template-columns: 1fr; text-align: center; }
          .footer-trust-list { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          section { padding: 56px 18px; }
          .hero { padding: 60px 18px 56px; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas .btn-wa-main, .hero-ctas .btn-outline { width: 100%; }
          .cta-section .btn-wa-main { width: 100%; }
          .transparency-grid { grid-template-columns: 1fr 1fr; }
          .problem-cards-grid { grid-template-columns: 1fr; }
          .review-card { flex: 0 0 calc(92% - 10px); }
          .trust-box, .profile-card { padding: 28px 24px; }
          .real-consulting-footer { padding: 24px 22px; }
          .decision-card { padding: 26px 20px; }
          .footer-trust-card { padding: 26px 20px; }
          .footer-trust-list { grid-template-columns: 1fr; }
          .floating-wa { padding: 12px 18px; font-size: 0.85rem; bottom: 16px; right: 16px; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">İlk Adım<span> Rehberi</span></a>
          <ul className="nav-links">
            <li><a href="#nasil-calisir">Nasıl Çalışır?</a></li>
            <li><a href="#paketler">Paketler</a></li>
            <li><a href="#urunler">Hangi Ürünler?</a></li>
            <li><a href="#biz-kimiz">Biz Kimiz?</a></li>
            <li><a href="#sss">SSS</a></li>
          </ul>
          <a href={whatsappLink(defaultMessage)} target="_blank" rel="noreferrer" className="btn-wa-nav">
            <WhatsAppIcon size={16} />
            WhatsApp&apos;tan Danış
          </a>
          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menüyü aç/kapat">
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#nasil-calisir" onClick={closeMenu}>Nasıl Çalışır?</a>
          <a href="#paketler" onClick={closeMenu}>Paketler</a>
          <a href="#urunler" onClick={closeMenu}>Hangi Ürünler?</a>
          <a href="#biz-kimiz" onClick={closeMenu}>Biz Kimiz?</a>
          <a href="#sss" onClick={closeMenu}>SSS</a>
          <a href={whatsappLink(defaultMessage)} target="_blank" rel="noreferrer" onClick={closeMenu} style={{ color: "var(--green-wa)", borderBottom: "none" }}>
            💬 WhatsApp&apos;tan Danış
          </a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">✨ 6 yıllık sektör deneyimi</div>
          <h1>Bebek ürünü almadan önce<br /><em>yanlış karar vermeyin.</em></h1>
          <p className="hero-sub">
            Veysel Dayanan&apos;ın 6 yıllık bebek araç gereçleri deneyimiyle, almak istediğiniz ürünü bütçenize, bebeğinizin yaşına ve kullanım ihtiyacınıza göre birlikte değerlendirelim. Ürün linkini gönderin, almadan önce artılarını ve eksilerini öğrenin.
          </p>
          <div className="hero-ctas">
            <a href={whatsappLink(defaultMessage)} target="_blank" rel="noreferrer" className="btn-wa-main">
              <WhatsAppIcon size={20} />
              WhatsApp&apos;tan Ürünümü Sor
            </a>
            <a href="#nasil-calisir" className="btn-outline">Nasıl Çalışıyor?</a>
          </div>
          <div className="trust-pills">
            <div className="trust-pill"><span>🏅</span> 6 yıllık sektör deneyimi</div>
            <div className="trust-pill"><span>💰</span> Bütçeye göre öneri</div>
            <div className="trust-pill"><span>💬</span> WhatsApp&apos;tan birebir danışmanlık</div>
            <div className="trust-pill"><span>🔗</span> Ürün linki gönder, yorum al</div>
          </div>
        </section>

        {/* DECISION STRIP */}
        <section className="decision-strip">
          <div className="decision-card reveal">
            <div className="decision-content">
              <div className="decision-copy">
                <h2>Satın almadan önce emin olun.</h2>
                <p>Bir ürün pahalı, popüler ya da çok yorum almış olabilir; ama sizin bebeğiniz, bütçeniz ve kullanım alışkanlığınız için doğru seçenek olmayabilir. Ürünü almadan önce profesyonel bir gözle değerlendirelim, gereksiz masraf ve pişmanlık riskini azaltalım.</p>
              </div>
              <div className="decision-mini-grid">
                {heroTrustPoints.map((point) => (
                  <div className="decision-mini" key={point}>{point}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE */}
        <section className="profile-section reveal">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center" }}>
              <div className="section-label">Danışmanınız</div>
              <h2 className="section-title">Veysel Dayanan</h2>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">👶</div>
              <div>
                <p className="profile-name">Veysel Dayanan</p>
                <p className="profile-title">Bebek Araç Gereç Danışmanı · 6 Yıl Deneyim</p>
                <p className="profile-desc">
                  Veysel Dayanan, 6 yıldır bebek araç gereçleri alanında ailelere ürün seçimi konusunda destek olur. Amaç, annenin bütçesine, bebeğin yaşına ve kullanım ihtiyacına göre en mantıklı ürünü seçmesine yardımcı olmaktır.
                </p>
                <div className="profile-tags">
                  {["🍼 Bebek Arabası","🚗 Oto Koltuğu","🛏️ Park Beşik","⚡ Ana Kucağı","🔋 Akülü Araba","✅ Artı/Eksi Analizi","💬 WhatsApp Destek"].map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="steps-section reveal" id="nasil-calisir">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 44px" }}>
              <div className="section-label">3 Adımda Danışmanlık</div>
              <h2 className="section-title">Nasıl Çalışır?</h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>Birkaç dakika içinde ürün hakkında net bir yorum alın.</p>
            </div>
            <div className="steps-grid">
              {[
                ["1","Ürünü Gönder","Almak istediğiniz ürünün linkini, fotoğrafını veya model adını WhatsApp'tan gönderin."],
                ["2","İhtiyacınızı Anlatın","Bebeğinizin yaşı, bütçeniz, kullanım alanınız ve beklentinizi paylaşın."],
                ["3","Net Yorum Alın","Ürünün artılarını, eksilerini ve size uygun olup olmadığını sade şekilde öğrenin."],
              ].map(([num, title, text]) => (
                <div className="step-card" key={num}>
                  <div className="step-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section reveal" id="urunler">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-label">Danışmanlık Kapsamı</div>
              <h2 className="section-title">Hangi Ürünlerde Danışmanlık Var?</h2>
            </div>
            <div className="products-grid">
              {products.map(([emoji, name]) => (
                <div className="product-card" key={name}>
                  <div className="product-emoji">{emoji}</div>
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="packages-section reveal" id="paketler">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="section-label">Danışmanlık Paketleri</div>
              <h2 className="section-title">İhtiyacınıza Göre Paket Seçin</h2>
              <p className="section-sub" style={{ margin: "0 auto", textAlign: "center" }}>
                Pahalı olan değil, <strong>size uygun olan</strong> ürün seçilir.
              </p>
            </div>
            <div className="package-conversion-note">
              ⚠️ Tek bir yanlış alışveriş bazen danışmanlık ücretinden çok daha pahalıya mal olabilir.
            </div>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div className={`package-card${pkg.featured ? " featured" : ""}`} key={pkg.name}>
                  {pkg.featured && <span className="featured-badge">⭐ EN ÇOK SEÇİLEN</span>}
                  <p className="package-name">{pkg.name}</p>
                  <p className="package-desc">{pkg.desc}</p>
                  <div><span className="price-amount">{pkg.price}</span></div>
                  {pkg.note && <div className="sales-note">{pkg.note}</div>}
                  <ul className="package-features">
                    {pkg.features.map((feature) => (
                      <li key={feature}><span className="check">✓</span> {feature}</li>
                    ))}
                  </ul>
                  <a href={whatsappLink(pkg.message)} target="_blank" rel="noreferrer" className={`btn-package btn-package-${pkg.ctaStyle}`}>
                    <WhatsAppIcon size={15} />
                    {pkg.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section reveal" id="biz-kimiz">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <div className="section-label">Hakkımızda</div>
                <h2 className="section-title">Biz Kimiz?</h2>
                <p>
                  Ben Veysel Dayanan. Yaklaşık 6 yıldır bebek sektöründe araç gereç satışıyla ilgileniyorum.
                </p>
                <p>
                  Bu süreçte yüzlerce anne ve baba ile tanıştım. İlk bebeğini bekleyen heyecanlı ailelerden, ikinci çocuğu için daha bilinçli seçim yapmak isteyen ebeveynlere kadar birçok insanın aynı soruyla kararsız kaldığını gördüm:
                </p>
                <blockquote>
                  &ldquo;Gerçekten doğru ürünü mü alıyoruz?&rdquo;
                </blockquote>
                <p>
                  Birçok aile mağaza mağaza geziyor, saatlerce internetten yorum okuyor, videolar izliyor ama yine de karar veremiyordu. Çünkü herkes farklı bir şey söylüyordu. Kimi en pahalı ürünü öneriyor, kimi reklam yapıyor, kimi ise gerçekten kullanmadan yorum yapıyordu.
                </p>
                <p>
                  Zamanla şunu fark ettim: Ailelerin aslında ürüne değil, <strong style={{color:"var(--lavender-dark)"}}>güvenilir bir rehbere ihtiyacı vardı.</strong>
                </p>
                <div className="highlight-line">👶 Her bebek farklıdır.</div>
                <div className="highlight-line">🏠 Her ailenin yaşam tarzı farklıdır.</div>
                <div className="highlight-line">💰 Her bütçe farklıdır.</div>
                <p style={{marginTop: "18px"}}>
                  Bir aile için mükemmel olan bir ürün, başka bir aile için gereksiz olabilir. İşte bu yüzden <strong style={{color:"var(--lavender-dark)"}}>İlk Adım Rehberi</strong> ortaya çıktı.
                </p>
                <p>
                  Bugün İlk Adım Rehberi ile; bebek arabasından oto koltuğuna, park beşikten ana kucağına kadar birçok üründe ailelere deneyime dayalı danışmanlık sunuyorum.
                </p>
                <div className="about-stat-row">
                  <div className="about-stat"><span className="about-stat-num">6</span><span className="about-stat-label">Yıl Deneyim</span></div>
                  <div className="about-stat"><span className="about-stat-num">100%</span><span className="about-stat-label">Bağımsız Yorum</span></div>
                  <div className="about-stat"><span className="about-stat-num">WA</span><span className="about-stat-label">Kolay İletişim</span></div>
                </div>
              </div>
              <div className="about-visual">
                <span className="about-visual-emoji">🧡</span>
                <p className="about-visual-title">Amacımız ürün satmak değil</p>
                <p style={{fontSize:"0.9rem", color:"var(--text-mid)", lineHeight:1.7, marginBottom:"16px"}}>
                  Ailelerin ilk adımlarını daha bilinçli, daha güvenli ve daha doğru atmasına yardımcı olmak.
                </p>
                <hr className="about-divider" />
                <p style={{fontSize:"0.82rem", fontWeight:800, color:"var(--text-soft)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>Yapmıyoruz</p>
                <ul className="about-no-list">
                  <li>Marka reklamı yapmıyoruz</li>
                  <li>Komisyonlu yönlendirme yapmıyoruz</li>
                  <li>Satış baskısı uygulamıyoruz</li>
                </ul>
                <hr className="about-divider" />
                <p style={{fontSize:"0.82rem", fontWeight:800, color:"var(--text-soft)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"10px"}}>Yapıyoruz</p>
                <ul className="about-yes-list">
                  <li>Gerçek ihtiyaca göre değerlendirme</li>
                  <li>Bütçeye uygun yönlendirme</li>
                  <li>Deneyime dayalı dürüst yorum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENCY */}
        <section className="transparency-section reveal">
          <div className="container">
            <div className="transparency-header">
              <div className="section-label">Şeffaflık İlkemiz</div>
              <h2 className="section-title">Marka reklamı değil, şeffaf danışmanlık.</h2>
              <p className="transparency-sub">
                Önerilerimiz marka anlaşmasına, reklam gelirine veya komisyona göre değil; ürünün kullanım amacı, bütçe, aile ihtiyacı ve teknik özelliklerine göre yapılır.
              </p>
            </div>
            <div className="transparency-grid">
              {[
                ["🚫","Reklam Yok","Hiçbir marka adına reklam veya tanıtım yapmıyoruz."],
                ["💸","Komisyon Yok","Mağaza, marka veya pazaryerinden komisyon almıyoruz."],
                ["🛒","Ürün Satışı Yok","Ürün satmıyoruz. Yalnızca danışmanlık hizmeti sunuyoruz."],
                ["🎯","İhtiyaca Göre Yorum","Pahalı olanı değil, size en uygun olanı değerlendiriyoruz."],
              ].map(([icon, title, text]) => (
                <div className="trans-card" key={title}>
                  <span className="trans-icon">{icon}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="transparency-note">
              <p><strong>Son satın alma kararı her zaman aileye aittir.</strong> Amacımız pahalı ürünü değil, ailenin ihtiyacına en uygun ürünü birlikte değerlendirmektir.</p>
            </div>
          </div>
        </section>

        {/* REAL CONSULTING */}
        <section className="real-consulting-section reveal">
          <div className="container">
            <div className="real-consulting-header">
              <div className="section-label">Neden Danışmanlık?</div>
              <h2 className="section-title">Satış baskısı değil, gerçek değerlendirme.</h2>
              <p className="real-consulting-desc">
                Birçok aile ürün seçerken reklam, abartılı satış anlatımları ve sahte yorumlar arasında kararsız kalıyor. Amacımız ürünü size satmak değil, gerçekten ihtiyacınıza uygun olup olmadığını birlikte değerlendirmek.
              </p>
            </div>
            <div className="problem-cards-grid">
              {trustProblems.map((item) => (
                <div className={`problem-card ${item.color}`} key={item.title}>
                  <div className="problem-icon-wrap"><span>{item.icon}</span></div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="real-consulting-footer">
              <div className="real-consulting-footer-icon">🤝</div>
              <p><strong>Biz ürün satmıyoruz. Marka komisyonu almıyoruz.</strong> Amacımız yalnızca daha bilinçli karar vermenize yardımcı olmak.</p>
            </div>
          </div>
        </section>

        {/* TRUST BOX */}
        <section className="trust-box-section reveal">
          <div className="container">
            <div className="trust-box">
              <div className="trust-box-icon">🔍</div>
              <div>
                <h3>Karar vermeden önce ikinci bir göz.</h3>
                <p>Bebek ürünlerinde her pahalı ürün en doğru seçenek olmayabilir. Ürünün kullanım amacı, bebeğin yaşı, ev/araç yapısı, bütçe ve uzun vadeli kullanım ihtimali birlikte değerlendirilmelidir.</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-section">
          <div className="container">
            <div className="section-header reveal" style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="section-label">Müşteri Deneyimleri</div>
              <h2 className="section-title">Danışan aileler ne diyor?</h2>
              <p className="section-sub" style={{ margin: "0 auto", textAlign: "center" }}>Ürün almadan önce danışan ailelerin deneyimleri.</p>
            </div>
            <div className="slider-wrapper">
              <div className="slider-track" ref={sliderRef} onScroll={handleSliderScroll}>
                {reviews.map((review) => (
                  <div className="review-card" key={review.name}>
                    <div className="review-disclaimer">Temsili danışan deneyimi</div>
                    {review.featured && (
                      <div className="experience-label">
                        <span>✦ Deneyim Kartı</span>
                      </div>
                    )}
                    <div className="review-header">
                      <div className="review-avatar">{review.avatar}</div>
                      <div>
                        <div className="review-name">{review.name}</div>
                        <div className="review-role">{review.role}</div>
                      </div>
                    </div>
                    <div className="review-stars">★★★★★</div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="slider-controls">
              <button className="slider-btn" onClick={() => goToReview(currentReview - 1)} aria-label="Önceki">←</button>
              <div className="slider-dots">
                {reviews.map((review, index) => (
                  <button
                    key={review.name}
                    className={`slider-dot${index === currentReview ? " active" : ""}`}
                    onClick={() => goToReview(index)}
                    aria-label={`Slayt ${index + 1}`}
                  />
                ))}
              </div>
              <button className="slider-btn" onClick={() => goToReview(currentReview + 1)} aria-label="Sonraki">→</button>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="why-section reveal">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-label">Neden Danışmanlık?</div>
              <h2 className="section-title">Danışmanlık Almanın Faydaları</h2>
            </div>
            <div className="why-grid">
              {[
                ["🛡️","Yanlış ürün alma riskini azaltır"],
                ["💰","Bütçenize uygun seçim yapmanıza yardımcı olur"],
                ["⏰","Ürün yorumlarını tek tek okumakla zaman kaybetmezsiniz"],
                ["🎯","İhtiyacınıza uygun ürünü bulmanız kolaylaşır"],
                ["✅","Pahalı olan değil, size uygun olan ürün seçilir"],
              ].map(([icon, text]) => (
                <div className="why-card" key={text}>
                  <div className="why-icon">{icon}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div className="cta-prelude reveal">
              <h3>Kararsız kalmadan önce danışın.</h3>
              <p>Ürünü satın aldıktan sonra pişman olmak yerine, satın almadan önce değerlendirelim.</p>
            </div>
            <h2>Almayı düşündüğünüz ürünü gönderin,<br />birlikte değerlendirelim.</h2>
            <p>Ürün linkini, fotoğrafını veya model adını WhatsApp&apos;tan paylaşın. Size uygun olup olmadığını birlikte inceleyelim.</p>
            <a href={whatsappLink(defaultMessage)} target="_blank" rel="noreferrer" className="btn-wa-main">
              <WhatsAppIcon size={20} />
              WhatsApp&apos;tan Hemen Yaz
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section reveal" id="sss">
          <div className="container">
            <div className="section-header" style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-label">Sıkça Sorulan Sorular</div>
              <h2 className="section-title">SSS</h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item${openFaq === index ? " open" : ""}`} key={question}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    {question}
                    <span className="faq-arrow">▼</span>
                  </button>
                  <div className="faq-answer">{answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER TRUST */}
      <section className="footer-trust-section reveal">
        <div className="footer-trust-card">
          <div>
            <div className="section-label">Güven İlkesi</div>
            <h2>Gerçek kullanıcı ihtiyacına göre yorum</h2>
            <p>Öneriler, ürünün gerçekten aileye uyup uymadığına odaklanır. Satış baskısı yerine sade, anlaşılır ve kullanım odaklı değerlendirme yapılır.</p>
          </div>
          <div className="footer-trust-list">
            {footerTrustItems.map((item) => (
              <div className="footer-trust-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">İlk Adım<span> Rehberi</span></div>
        <p className="footer-desc">Bebek araç gereçleri satın almadan önce danışmanlık hizmeti.</p>
        <hr className="footer-divider" />
        <p className="footer-note" style={{ marginBottom: 10 }}>
          İlk Adım Rehberi herhangi bir marka, mağaza veya pazaryeri adına satış yapmaz. Öneriler danışmanlık niteliğindedir.
        </p>
        <p className="footer-note">Bu hizmet tıbbi tavsiye veya sağlık danışmanlığı değildir. Satın alma kararı kullanıcıya aittir.</p>
        <div className="footer-links">
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Şartları</a>
        </div>
      </footer>

      {/* FLOATING WA */}
      <a href={whatsappLink(defaultMessage)} target="_blank" rel="noreferrer" className="floating-wa" aria-label="WhatsApp'tan ürünü sor">
        <WhatsAppIcon size={20} />
        Ürünü Sor
      </a>
    </>
  );
}
