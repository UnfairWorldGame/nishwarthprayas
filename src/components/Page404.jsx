import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import "./styles/page404.css";

export default function Page404() {
  return (
    <>
      <Seo {...PAGE_SEO.notFound} noindex />
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold shadow-md hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Go back home
            </Link>
            <Link
              to="/india-ngo-contact"
              className="mt-4 sm:mt-0 text-sm font-semibold text-gray-900"
            >
              Contact us <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
