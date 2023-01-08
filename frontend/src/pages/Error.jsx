import { Link } from "react-router-dom";

function Error() {
  return (
    <main className="min-h-screen text-center flex justify-center items-center">
      <div>
        <h1 className="text-9xl mb-6 font-bold">404</h1>
        <p className="mb-3 text-4xl font-medium">Page Not Found</p>
        <p className="mb-2 text-md ">
          The page you're looking for was not found
        </p>
        <Link className="underline text-sky-500" to="/">
          Back Home
        </Link>
      </div>
    </main>
  );
}
export default Error;
