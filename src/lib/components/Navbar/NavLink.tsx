import { setOpen } from "@/lib/redux/reducers/navbarSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  name: String;
  path: String;
};

const NavbarLink = ({ name, path }: NavbarProps) => {
  const dispatch = useDispatch();

  return (
    <NavLink
      //@ts-ignore
      to={path}
      onClick={() => dispatch(setOpen())}
      className={`my-2 capitalize font-semibold hover:text-primary md:mx-4 md:my-0 ${({
        //@ts-ignore
        isActive,
      }) => (isActive ? "active" : "")} `}
    >
      {name}
    </NavLink>
  );
};

export default NavbarLink;
