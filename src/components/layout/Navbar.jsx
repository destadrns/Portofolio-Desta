import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import './Navbar.css';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Skill', href: '#skill' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Pendidikan', href: '#pendidikan' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  /* Scroll detection for blur background */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Active section detection */
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* Close mobile menu on link click */
  const handleNavClick = () => {
    setMobileOpen(false);
  };

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Navigasi utama">
        <a href="#beranda" className="navbar__logo" onClick={handleNavClick}>
          Desta
        </a>

        {/* Desktop Nav */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Button
            variant="primary"
            size="sm"
            href="#kontak"
            className="navbar__cta"
          >
            Hubungi Saya
          </Button>

          {/* Mobile toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ul className="navbar__mobile-links" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  variant="primary"
                  size="md"
                  href="#kontak"
                  onClick={handleNavClick}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Hubungi Saya
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
