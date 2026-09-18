import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="shell py-12">
      <h1>Nie znaleziono strony</h1>
      <Link to="/">Wybierz test</Link>
    </div>
  );
}
