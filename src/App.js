import { Outlet, ReactLocation, Router, useRouter } from "react-location";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getPresentationHomeById, getPresentationPageById } from "./api";
import { AuthProvider } from "./auth";
import ErrorBoundary from "./components/ErrorBoundary";
import FAB from "./components/FAB";
import PresentationHeader from "./components/PresentationHeader";
import Spinner from "./components/Spinner";
import PresentationHome from "./views/PresentationHome";
import PresentationMode from "./views/PresentationMode";
import PresentationUpload from "./views/PresentationUpload";

const DEFAULT_CACHE_TIME = 1000 * 60 * 30;
const DEFAULT_STALE_TIME = 1000 * 60 * 5;

const location = new ReactLocation();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      cacheTime: DEFAULT_CACHE_TIME,
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

export const ErrorElement = ({ text = "Oops! Something went wrong..." }) => {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center text-red-400">
        <p>{text}</p>
      </div>
    </>
  );
};

const AppRoot = () => {
  const router = useRouter();
  return (
    <>
      {router.pending && <Spinner />}
      <Outlet />
    </>
  );
};

const AppRouter = () => {
  return (
    <Router
      location={location}
      basepath={process.env.PUBLIC_URL}
      routes={[
        {
          path: "/:dealerGroup",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            {
              path: "/",
              element: <PresentationUpload />,
            },
            {
              path: "/:presentationId",
              loader: async ({ params: { presentationId } }) => ({
                presentationHome:
                  queryClient.getQueryData([
                    "presentation",
                    { presentationId },
                  ]) ??
                  (await queryClient
                    .fetchQuery(["presentation", { presentationId }], () =>
                      getPresentationHomeById(presentationId)
                    )
                    .then(async data => {
                      await Promise.all(
                        data.attributes.playlist.map(page => {
                          return queryClient.prefetchQuery(
                            [
                              "presentation",
                              { presentationId, pageId: page.id },
                            ],
                            () =>
                              getPresentationPageById(presentationId, page.id)
                          );
                        })
                      );
                      return data;
                    })),
              }),
              element: (
                <>
                  <PresentationHeader />
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </>
              ),
              children: [
                {
                  path: "/",
                  element: <PresentationHome />,
                },
                {
                  path: "/:pageId",
                  loader: async ({ params: { presentationId, pageId } }) => ({
                    presentationPage:
                      queryClient.getQueryData([
                        "presentation",
                        { presentationId, pageId },
                      ]) ??
                      (await queryClient.fetchQuery(
                        ["presentation", { presentationId, pageId }],
                        () => getPresentationPageById(presentationId, pageId)
                      )),
                  }),
                  element: (
                    <>
                      <Outlet />
                    </>
                  ),
                  children: [
                    {
                      path: "/",
                      element: (
                        <>
                          <PresentationMode />
                          <FAB />
                        </>
                      ),
                    },
                    {
                      path: "/:mode",
                      element: (
                        <>
                          <PresentationMode />
                          <FAB />
                        </>
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]}
    >
      <AppRoot />
    </Router>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
          <AppRouter />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
