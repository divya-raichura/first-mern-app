import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Back Home</Link>
    </div>
  );
}
export default Error;
