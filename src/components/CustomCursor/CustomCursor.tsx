import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppSelector } from "../../redux/hooks";
import { selectCursor } from "../../redux/features/cursor/cursorSlice";
import useCursorController from "../../hooks/useCursorController";

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
  const { mouseEnterColorBlend, mouseLeaveCursorDefault } =
    useCursorController();
  const { isBig, defaultColor } = useAppSelector(selectCursor);
  const cursor = useRef<HTMLDivElement>(null);
  const bodyRef = useRef(document.body); // Reference to HTML body

 useEffect(() => {
   if (cursor.current) {
     if (isBig) {
       gsap.to(cursor.current, {
         scale: 4,
         duration: 0.5,
       });
     } else {
       gsap.to(cursor.current, {
         scale: 1,
         duration: 0.5,
       });
     }
   }
 }, [isBig, defaultColor]);


  // Move cursor on mouse move
  const onMouseMove = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      width: "20px",
      height: "20px",
      ease: "elastic.out(1.2, 0.5)",
      duration: 2,
    });
  };

  useEffect(() => {
    const bodyElement = bodyRef.current;

    if (bodyElement) {
      bodyElement.addEventListener("mousemove", onMouseMove);

      // Attach event listeners to links within bodyRef
      const links = bodyElement.querySelectorAll("a");
      const inputs = bodyElement.querySelectorAll("input");
      links?.forEach((link) => {
        link.addEventListener("mouseenter", mouseEnterColorBlend);
        link.addEventListener("mouseleave", mouseLeaveCursorDefault);
      });
      inputs?.forEach((input) => {
        input.addEventListener("mouseenter", mouseEnterColorBlend);
        input.addEventListener("mouseleave", mouseLeaveCursorDefault);
      });

      // Cleanup function to remove event listeners
      return () => {
        bodyElement.removeEventListener("mousemove", onMouseMove);
        links?.forEach((link) => {
          link.removeEventListener("mouseenter", mouseEnterColorBlend);
          link.removeEventListener("mouseleave", mouseLeaveCursorDefault);
        });
        inputs?.forEach((input) => {
          input.removeEventListener("mouseenter", mouseEnterColorBlend);
          input.removeEventListener("mouseleave", mouseLeaveCursorDefault);
        });
      };
    }
  }, [bodyRef, mouseEnterColorBlend, mouseLeaveCursorDefault]);

  return (
    <div
      ref={cursor}
      className={`cursor hidden lg:block top-0 z-[10000] fixed rounded-full size-0 bg-accent-foreground pointer-events-none ${
        !defaultColor ? "mix-blend-difference" : "bg-foreground"
      }`}
    ></div>
  );
};

export default CustomCursor;
