import { Link, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main">
        Przejdź do treści
      </a>
      <header className="site-header">
        <div className="shell flex h-12 items-center justify-between">
          <Link className="brand" to="/">
            Generator quizów
          </Link>
          <Link className="text-sm" to="/configure">
            Konfiguracja
          </Link>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
