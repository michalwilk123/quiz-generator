import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="shell py-12">
      <h1>Page not found</h1>
      <Link to="/">Choose an exam</Link>
    </div>
  );
}
