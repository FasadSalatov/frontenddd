import { NavLink, useLocation } from "react-router-dom";
import { navbarItems } from "../../../constants";

const Navbar = () => {
    const { pathname } = useLocation();
    return (
        <nav
            style={{
                display: `${pathname === "/sub" ? "none" : "flex"}`,
            }}
            className="fixed z-10 bottom-5 flex max-w-[340px] rounded-[80px] bg-[#1D4361] w-full left-1/2 -translate-x-1/2 justify-between px-5 py-2"
        >
            {navbarItems.map(({ id, icon, text, url }) => (
                <NavLink  to={url} key={id} className="flex flex-col items-center nav__link">
                    <span>{icon}</span>
                    <span className="font-semibold text-white text-xs">{text}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;
