import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/Login";
import RegisterJob from "./pages/RegisterJob";
import JobRegisterForm from "./pages/JobRegisterForm";
import WorkerLogin from "./pages/WorkerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminProfile from "./pages/AdminProfile";
import CreateAdmin from "./pages/CreateAdmin";
import CreateNewJob from "./components/CreateNewJob";
import BillingPage from "./pages/BillingPage";
import UserLandingPage from "./pages/UserLandingPage";

import CompletedJobDetails from "./components/CompletedJobDetails";
import TrackOrder from "./components/TrackOrder";
import ViewHistory from "./components/ViewHistory";
import UserProfile from "./components/UserProfile";
import WorkerLandingPage from "./pages/WorkerLandingPage";
import WorkerProfile from "./components/WorkerProfile";
import ReviewUs from "./components/ReviewUs";
import Footer from "./components/Footer";
import SearchJobs from "./components/SearchJobs";
import CompletedJobsForAdmin from "./components/CompletedJobsForAdmin";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <LandingPage />
          <Footer />
        </div>
      ),
    },
    {
      path: "/user-registration",
      element: (
        <div>
          <UserRegistration />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Login />
        </div>
      ),
    },
    {
      path: "/user-landing-page",
      element: (
        <div>
          < UserLandingPage />
          <Footer />
        </div>
      ),
    },
    {
      path: "/register-job",
      element: (
        <div>
          <RegisterJob />
          <Footer />
        </div>
      ),
    },
    {
      path: "/job-form",
      element: (
        <div>
          <JobRegisterForm />
          <Footer />
        </div>
      ),
    },
    {
      path: "/worker-landing-page",
      element: (
        <div>
          <WorkerLandingPage />
          <Footer />
        </div>
      ),
    },
    {
      path: "/worker-login",
      element: (
        <div>
          <WorkerLogin />
        </div>
      ),
    },
    {
      path: "/worker-profile",
      element: (
        <div>
          <NavBar />
          <WorkerProfile />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin-login",
      element: (
        <div>
          <AdminLogin />
          <Footer />
        </div>
      ),
    },
    {
      path: '/completed-jobs-details/:workerId',
      element: (
        <div>
          <NavBar />
          <CompletedJobDetails />
          <Footer />
        </div>
      )
    },
    {
      path: "/create-admin",
      element: (
        <div>
          <CreateAdmin />
          <Footer />
        </div>
      ),
    },
    {
      path: "/admin-profile",
      element: (
        <div>
          <AdminProfile />
          <Footer />
        </div>
      ),
    },
    //     {
    //   path: "/admin-completed-jobs",
    //   element: (
    //     <div>
    //       <CompletedJobsForAdmin />
    //       <Footer />
    //     </div>
    //   ),
    // },
        {
      path: "/list-job",
      element: (
        <div>
          <NavBar />
          <CreateNewJob/>
          <Footer />
        </div>
      ),
    },
      {
      path: "/billing-page/:jobId",
      element: (
        <div>
          <BillingPage />
          <Footer />
        </div>
      ),
    },
          {
      path: "/hire-worker/:jobId",
      element: (
        <div>
          <BillingPage />
          <Footer />
        </div>
      ),
    },
    {
      path: "/track-order",
      element: (
        <div>
          <NavBar />
          <TrackOrder />
          <Footer />
        </div>
      )
    },
        {
      path: "/view-history",
      element: (
        <div>
          <NavBar />
          <ViewHistory/>
          <Footer />
        </div>
      )
    },
    {
      path: "/user-profile-active",
      element: (
        <div>
           <NavBar />
          <UserProfile />
          <Footer />
        </div>
      )
    },
        {
      path: "/review-us",
      element: (
        <div>
          <ReviewUs />
        </div>
      )
    },
    {
      path: "/search-jobs",
      element: (
        <div>
          <NavBar />
          <SearchJobs />
          <Footer />
        </div>
      )
    }
        
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
