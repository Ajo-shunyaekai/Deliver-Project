import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client";
import Loader from "./Loader/Loader";
 
// Lazy-load the components
const SubscriptionPage = lazy(() => import("./SubscriptionPage"));
const PaymentSuccessful = lazy(() => import("./PayementSucsessful"));
const PaymentFailure = lazy(() => import("./PaymentFailure"));
 
const socket = io.connect(process.env.REACT_APP_SERVER_URL);
 
// Routes
const router = createBrowserRouter([
  {
    path: "/subscription/:userType/:userId/select-plan",
    // path: "/subscription",
    element: (
      <Suspense fallback={<Loader />}>
        <SubscriptionPage socket={socket} />
      </Suspense>
    ),
  },
  {
    path: "/subscription/:userType/:userId/successful",
    element: (
      <Suspense fallback={<Loader />}>
        <PaymentSuccessful socket={socket} />
      </Suspense>
    ),
  },
  {
    path: "/subscription/:userType/:userId/failure",
    element: (
      <Suspense fallback={<Loader />}>
        <PaymentFailure socket={socket} />
      </Suspense>
    ),
  },
]);
 
function Router() {
  return <RouterProvider router={router} />;
}
 
export default Router;