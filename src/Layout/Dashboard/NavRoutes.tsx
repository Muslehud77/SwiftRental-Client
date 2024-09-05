import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";

import { adminPaths } from "../../routes/AdminRoutes";

import { userPaths } from "../../routes/UserRoutes";
import { isMobile } from "../../utils/isMobile";
import { useRef } from "react";
import useDecodedToken from "../../hooks/useDecodedToken";

export const NavRoutes = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  const {role} = useDecodedToken()
  const { pathname } = useLocation();

  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference

  

  const routes =
    role === "admin" ? adminPaths : role === "user" ? userPaths : [];

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const onMouseEnter = () => {
    if (!isMobile()) {
      clearTimer();
      setOpen(true);
    }
  };

  const onMouseLeave = () => {
    if (!isMobile()) {
      timerRef.current = setTimeout(() => {
        setOpen(false);
        clearTimer();
      }, 1500); // Set a delay before closing the menu
    }
  };



  return (
    <nav
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col gap-4 px-2"
    >
      <TooltipProvider>
        {routes.map((path, i) =>
          path.icon !== null ? (
            <div key={i + path.route}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={path.route}
                    className={`flex p-2 relative gap-2 rounded-lg ${
                      path.route
                        ? pathname.includes(path.route)
                          ? "bg-accent-foreground text-muted "
                          : "hover:bg-accent-foreground/20 bg-secondary text-accent-foreground dark:text-white dark:hover:text-gray-300"
                        : pathname === "/dashboard"
                        ? "bg-gray-500 text-white"
                        : "bg-secondary text-accent-foreground hover:bg-accent-foreground/20"
                    } transition-colors `}
                  >
                    <span
                      className={`${
                        open ? "w-40" : "w-5"
                      } duration-500 flex gap-2 overflow-hidden h-6`}
                    >
                      {path.icon} {open && path.name}
                    </span>
                    <span className="sr-only">{path.name}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{path.name}</TooltipContent>
              </Tooltip>
            </div>
          ) : null
        )}
      </TooltipProvider>
    </nav>
  );
};
