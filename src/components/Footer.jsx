import { Link } from "react-router-dom";

export default function Footer({ showLinks = true }) {
  return (
    <footer className="site-footer">
      <p>© 2026 hair salon URU by charmant</p>
      {showLinks && (
        <p className="footer-links">
          <Link to="/privacy">プライバシーポリシー</Link>
        </p>
      )}
    </footer>
  );
}
