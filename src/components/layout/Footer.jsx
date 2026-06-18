import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">Desta</span>
            <p className="footer__tagline">Web Developer &amp; Data Analytics Enthusiast</p>
            <p className="footer__personal">
              Terus belajar, membangun, dan memperbaiki sedikit demi sedikit.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigasi">
            <a href="#beranda" className="footer__link">Beranda</a>
            <a href="#tentang" className="footer__link">Tentang</a>
            <a href="#skill" className="footer__link">Skill</a>
            <a href="#proyek" className="footer__link">Proyek</a>
            <a href="#perjalanan" className="footer__link">Perjalanan</a>
            <a href="#pendidikan" className="footer__link">Pendidikan</a>
            <a href="#kontak" className="footer__link">Kontak</a>
          </nav>

          <div className="footer__bottom">
            <p className="footer__copy">
              © 2026 Desta Adriyan Saputra.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
