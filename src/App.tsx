import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./lib/pages/Home/Home";
// import About from "./lib/pages/About/About";
import CommutityPost from "./lib/pages/CommunityPost/CommutityPost";
// import Membership from "./lib/pages/Membarship/Membership";
import PhotoGallery from "./lib/pages/PhotoGallery/PhotoGallery";
// import PayOnline from "./lib/pages/PayOnline/PayOnline";
import Contactus from "./lib/pages/Contactus/Contactus";
import Login from "./lib/pages/Login/Login";
import Register from "./lib/pages/Register/Register";
import Navbar from "./lib/components/Navbar/Navbar";
import Footer from "./lib/components/Footer/Footer";
import PostDetails from "./lib/pages/CommunityPost/PostDetails";
import BagHistory from "./lib/pages/About/BagHistory";
import AboutBag from "./lib/pages/About/AboutBag";
// import TeamMember from "./lib/pages/About/TeamMember";
import Advisors from "./lib/pages/About/Advisors";
import StandingCommete from "./lib/pages/About/StandingCommete";
import Guidelline from "./lib/pages/Membarship/Guidelline";
// import Form from "./lib/pages/Membarship/MombershipForm";
import Benefit from "./lib/pages/Membarship/Benefit";
import GeneralMember from "./lib/pages/Membarship/GeneralMember";
import PreviousConvention from "./lib/pages/PhotoGallery/PreviousConvention";
import BagAwards from "./lib/pages/PhotoGallery/BagAwards";
import PayAnnual from "./lib/pages/PayOnline/PayAnnual";
import GeneralFund from "./lib/pages/PayOnline/GeneralFund";
import ScholarshiopFund from "./lib/pages/PayOnline/ScholarshiopFund";
import ExcCommittee from "./lib/pages/About/ExcCommittee";
import MemberShipForm from "./lib/pages/Membarship/MombershipForm";
import DashBoard from "./lib/pages/DashBoard/DashBoard";
// import CreatePostForm from "./lib/pages/DashBoard/CreatePostForm";
import { ProtectedRoute } from "./lib/ProtectedRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { setUser } from "./lib/redux/AuthSlice";
// import { UploadForm } from "./lib/pages/ImageUpload";
// import ImageUpload from "./lib/pages/Uploadimage";
import CreatePost from "./lib/pages/DashBoard/CreatePost";
import ErrorPage from "./lib/pages/ErrorPage";
import CheckMail from "./lib/pages/CheckMail";
// import LoaderSpin from "./lib/components/LoaderSpin";

const App = () => {
  const dispatch = useDispatch();

  const GET_SINGLE_USER = gql`
    query Query {
      me {
        id
        username
        email
      }
    }
  `;

  const { data } = useQuery(GET_SINGLE_USER);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <BrowserRouter>
      <div className="max-w-[1440px] flex flex-col min-h-screen justify-between  m-auto">
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* about us  */}
            <Route path="/baghistory" element={<BagHistory />} />
            <Route path="/aboutbag" element={<AboutBag />} />
            <Route path="/exccommittee" element={<ExcCommittee />} />
            <Route path="/aboutbag" element={<AboutBag />} />
            <Route path="/advisors" element={<Advisors />} />
            <Route path="/standingcommitte" element={<StandingCommete />} />
            {/* member ship  */}
            <Route path="/membershipguideline" element={<Guidelline />} />
            <Route path="/membershipform" element={<MemberShipForm />} />
            <Route path="/membershipbenefit" element={<Benefit />} />
            <Route path="/generalmembers" element={<GeneralMember />} />

            {/* photogallery  */}
            <Route path="/photogallery" element={<PhotoGallery />} />
            <Route
              path="/previousconventions"
              element={<PreviousConvention />}
            />
            <Route path="/bagawards" element={<BagAwards />} />
            {/* pay online  */}
            <Route path="/payannual" element={<PayAnnual />} />
            <Route path="/baggeneralfund" element={<GeneralFund />} />
            <Route path="/scholarshipfund" element={<ScholarshiopFund />} />
            {/* others  */}
            <Route path="/newspost" element={<CommutityPost />} />
            <Route path="/newspost/:id" element={<PostDetails />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/checkmail" element={<CheckMail />} />

            <Route path="*" element={<ErrorPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/createpost" element={<CreatePost />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
