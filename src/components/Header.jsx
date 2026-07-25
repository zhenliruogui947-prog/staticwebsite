import { Link } from "react-router-dom";

export default function Header({ showNav = true, onHomePage = true }) {
  const anchor = (hash) => (onHomePage ? hash : `/${hash}`);

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-name">hair salon URU by charmant</span>
        <img src="/assets/IMG_3364.jpg" alt="hair salon URU by charmant" />
      </Link>
      {showNav && (
        <nav className="site-nav" aria-label="ページ内メニュー">
          <a href={anchor("#concept")}>CONCEPT</a>
          <a href={anchor("#service")}>SERVICE</a>
          <a href={anchor("#location")}>LOCATION</a>
          <a href={anchor("#menu")}>MENU</a>
          <a href={anchor("#gallery")}>GALLERY</a>
          {onHomePage && <a href="#booking">RESERVATION</a>}
        </nav>
      )}
    </header>
  );
}
