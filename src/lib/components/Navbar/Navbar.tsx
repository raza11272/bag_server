// import { navlinkdata } from "@/db/navlinkdata";
import { Menu, UserRound, X } from "lucide-react";
// import { useState } from "react";
import NavbarLink from "./NavLink";
import {  useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioGroupDemo } from "../DropDown";
import { useDispatch, useSelector } from "react-redux";
import { controllNav } from "@/lib/redux/reducers/navbarSlice";
import { gql, useQuery } from "@apollo/client";
const aboutdroplinks = [
  {
    link: <NavbarLink name={"BAG History"} path={"/baghistory"} />,
  },
  {
    link: <NavbarLink name={"About BAG"} path={"/aboutbag"} />,
  },
  {
    link: <NavbarLink name={"Executive Committee"} path={"/exccommittee"} />,
  },
  {
    link: <NavbarLink name={"Advisors"} path={"/advisors"} />,
  },
  {
    link: <NavbarLink name={"Standing Committee"} path={"/standingcommitte"} />,
  },
];

const memberdroplinks = [
  {
    link: (
      <NavbarLink name={"MemberShip Guideline"} path={"/membershipguideline"} />
    ),
  },
  {
    link: <NavbarLink name={"MemberShip Form"} path={"/membershipform"} />,
  },
  {
    link: (
      <NavbarLink name={"MemberShip Benefit"} path={"/membershipbenefit"} />
    ),
  },
  {
    link: <NavbarLink name={"BAG General Members"} path={"/generalmembers"} />,
  },
];
const gallerydroplinks = [
  {
    link: <NavbarLink name={"Photo Gallery"} path={"/photogallery"} />,
  },
  {
    link: (
      <NavbarLink name={"Previous Conventions"} path={"/previousconventions"} />
    ),
  },
  {
    link: <NavbarLink name={"BAG Awards"} path={"/bagawards"} />,
  },
];
const payonlinedroplinks = [
  {
    link: <NavbarLink name={"Pay Annual MemberShip Fee"} path={"/payannual"} />,
  },
  {
    link: <NavbarLink name={"BAG General Fund"} path={"/baggeneralfund"} />,
  },
  {
    link: <NavbarLink name={"Scholarship Fund"} path={"/scholarshipfund"} />,
  },
];

const GET_ADMIN_LINK = gql`
  query Adminlink {
    adminlink {
      data {
        attributes {
          link
        }
      }
    }
  }
`;

const Navbar = () => {
  //@ts-ignore
  const isOpen = useSelector((state: navcontroll) => state.navcontroll.open);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const logOut = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const { loading, data, error } = useQuery(GET_ADMIN_LINK);

  if (loading) {
    return <p>{loading}</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const dashboarddroplinks = [
    {
      link: (
        <div>
          {jwt ? (
            <NavbarLink name={"Dashboard"} path={"/dashboard"} />
          ) : (
            <NavbarLink name={"User Login"} path={"/login"} />
          )}
        </div>
      ),
    },
    {
      link: (
        <div>
          {jwt ? (
            <div className="w-full">
              <Button className="w-full" onClick={() => logOut()}>
                LogOut
              </Button>
            </div>
          ) : (
            <a
              className="p-4"
              href={data && data.adminlink.data.attributes.link}
            >
              Admin login
            </a>
          )}
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();

  return (
    <nav className="fixed top-0 left-0 w-full h-[10vh] z-50 bg-white shadow ">
      <div className="container px-6 md:px-16 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex  items-center justify-between">
          <div className="w-14 h-14">
            <img src="/img/logo.webp" alt="" />
          </div>

          {/* <!-- Mobile menu button --> */}
          <div className="flex md:hidden">
            <button
              x-cloak
              onClick={() => dispatch(controllNav())}
              type="button"
              aria-label="toggle menu"
            >
              {isOpen ? <Menu /> : <X />}
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div
          className={`
           ${
             isOpen ? "hidden " : ""
           }absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center h-[90vh] md:h-auto
        
          `}
        >
          <div className="flex gap-6 justify-center md:items-center flex-col md:flex-row flex-wrap lg:flex-nowrap ">
            <div className="flex flex-col md:flex-row md:mx-6">
              <NavbarLink name={"Home"} path={"/"} />
              <DropdownMenuRadioGroupDemo
                name={"About"}
                links={aboutdroplinks}
              />
              <NavbarLink name={"Community Dashboard"} path={"/newspost"} />
              <DropdownMenuRadioGroupDemo
                name={"Membership"}
                links={memberdroplinks}
              />
              <DropdownMenuRadioGroupDemo
                name={"Gallery"}
                links={gallerydroplinks}
              />
              <DropdownMenuRadioGroupDemo
                name={"Pay Online"}
                links={payonlinedroplinks}
              />
              <NavbarLink name={"Contact Us"} path={"/contactus"} />
            </div>

            <div className="flex  gap-4 ">
              {/* {jwt &&
                // <>
                //   <Link to="/dashboard">
                //     <Button>Dashboard</Button>
                //   </Link>
                // <Button onClick={() => logOut()}>LogOut</Button>
                // </>
                // ) : (
                //   <Link to="/login">
                //     <Button>LogIn</Button>
                //   </Link>
              } */}
            </div>

            <DropdownMenuRadioGroupDemo
              name={<UserRound />}
              links={dashboarddroplinks}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
