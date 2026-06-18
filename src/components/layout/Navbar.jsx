import { useCallback, useEffect, useRef, useState } from 'react';
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
  const scrolledRef = useRef(false);
  const scrollFrameRef = useRef(null);

  /* Scroll detection for blur background */
  useEffect(() => {
    const updateScrolledState = () => {
      scrollFrameRef.current = null;
      const nextScrolled = window.scrollY > 30;

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(updateScrolledState);
      }
    };

    updateScrolledState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
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

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((isOpen) => !isOpen);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle('nav-lock', mobileOpen);
    return () => document.body.classList.remove('nav-lock');
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMobileMenu, mobileOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const handleViewportChange = (event) => {
      if (event.matches) closeMobileMenu();
    };

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleViewportChange);
      return () => desktopQuery.removeEventListener('change', handleViewportChange);
    }

    desktopQuery.addListener(handleViewportChange);
    return () => desktopQuery.removeListener(handleViewportChange);
  }, [closeMobileMenu]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${mobileOpen ? 'navbar--mobile-open' : ''}`}>
      <nav className="navbar__inner container" aria-label="Navigasi utama">
        <a href="#beranda" className="navbar__logo" onClick={closeMobileMenu}>
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
            type="button"
            className="navbar__toggle"
            onClick={toggleMobileMenu}
            aria-controls="navbar-mobile-menu"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="navbar-mobile-menu"
        className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="navbar__mobile-links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                onClick={closeMobileMenu}
                tabIndex={mobileOpen ? undefined : -1}
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
              onClick={closeMobileMenu}
              tabIndex={mobileOpen ? undefined : -1}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Hubungi Saya
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
