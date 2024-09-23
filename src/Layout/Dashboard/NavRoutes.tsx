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
import { AnimatePresence, motion } from "framer-motion";

export const NavRoutes = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  const { role } = useDecodedToken();
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
                    className={`flex  bg-muted  p-2 relative gap-2 rounded-lg  transition-colors`}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", duration: 1 }}
                      className={` ${
                        path.route
                          ? pathname.includes(path.route)
                            ? "text-white"
                            : ""
                          : pathname === "/dashboard"
                          ? "text-white"
                          : ""
                      } text-foreground relative z-10 flex justify-start items-center gap-2 overflow-hidden h-6`}
                    >
                      {path.icon}
                      <AnimatePresence>
                        {open && (
                          <motion.span
                            transition={{ type: "spring", duration: 0.5 }}
                          >
                            {path.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.span>

                    {path.route ? (
                      pathname.includes(path.route) ? (
                        <>
                          <motion.span
                            layoutId="navLink"
                            transition={{ type: "spring", duration: 0.5 }}
                            className="absolute inset-0 z-0 bg-primary rounded-md"
                          ></motion.span>
                        </>
                      ) : (
                        <></>
                      )
                    ) : pathname === "/dashboard" ? (
                      <>
                        <motion.span
                          layoutId="navLink"
                          transition={{ type: "spring", duration: 0.5 }}
                          className="absolute inset-0 z-0 bg-muted-foreground rounded-md"
                        ></motion.span>
                      </>
                    ) : (
                      <></>
                    )}

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
