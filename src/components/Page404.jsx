import "./styles/page404.css";
import { Helmet } from "react-helmet"; 
export default function Page404() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Helmet>
          <title>निस्वार्थ प्रयास | एक कदम मानवता की ओर</title>
          <meta
            name="description"
            content="Ngo in farrukhabad,ngo in kanpur,ngo in uttarpradesh,farrukhabad ngo, ngo in UP, ngo"
          />
          <meta
            property="og:title"
            content="NiswarthPrays: Helping the needy in Farrukhabad and Kanpur Ngo in farrukhabad kanpur,farrukhabad ngo in uttarpradesh ngo in UP ngo"
          />
          <meta
            property="og:description"
            content="NiswarthPrays is a non-profit organization that provides food, shelter, and education to the needy in Farrukhabad and Kanpur, India.Ngo in farrukhabad kanpur,farrukhabad ngo in uttarpradesh ngo in UP ngo"
          />
          <meta
            property="og:image"
            content="https://farrukhabadngo.com/fevicon.ico"
          />
        </Helmet>
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold  shadow-md hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Go back home
            </a>
            <a
              href="/"
              className="mt-4 sm:mt-0 text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
