import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "./Hooks/useFetch";
import ToogleURL from "./context/ToogleURL";

const AboutMain = lazy(() => import("./components/NocneCienie"));
const AboutAk = lazy(() => import("./components/DobryKlan"));
const Navbar = lazy(() => import("./components/Navbar"));
const Stats = lazy(() => import("./components/Stats"));
const Contact = lazy(() => import("./components/Contact"));

const App: React.FC = () => {
  const { changeToMain, changeToAk, showContact, main, urlMain, urlAk } =
    ToogleURL();
  return (
    <div className="bg-wrapper">
      <Navbar />
      <Suspense
        fallback={
          <div className="loading">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            Loading...
          </div>
        }
      >
        <main>
          <ErrorBoundary>
            {main ? (
              <>
                <AboutMain url={urlMain} onClick={changeToAk} />
                <Stats url={urlMain} />
              </>
            ) : (
              <>
                <AboutAk url={urlAk} onClick={changeToMain} />
                <Stats url={urlAk} />
              </>
            )}
          </ErrorBoundary>
        </main>
      </Suspense>
      {showContact && <Contact />}
    </div>
  );
};
export default App;
