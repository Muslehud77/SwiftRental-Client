import { cursorControl } from "../redux/features/cursor/cursorSlice";
import { useAppDispatch } from "../redux/hooks";

const useCursorController = () => {
  const dispatch = useAppDispatch();

  const mouseEnterCursorResize = () => {
    dispatch(cursorControl({ size: true }));
  };
  const mouseLeaveCursorResize = () => {
    dispatch(cursorControl({ size: false }));
  };
  const mouseEnterColorBlend = () => {
    dispatch(cursorControl({ color: false }));
  };
  const mouseLeaveCursorDefault = () => {
    dispatch(cursorControl({ color: true }));
  };

  const mouseEnterControlBoth = () => {
    dispatch(cursorControl({ size: true, color: false }));
  };
  const mouseLeaveControlBoth = () => {
    dispatch(cursorControl({ size: false, color: true }));
  };

  return {
    mouseEnterCursorResize,
    mouseLeaveCursorResize,
    mouseEnterColorBlend,
    mouseLeaveCursorDefault,
    mouseEnterControlBoth,
    mouseLeaveControlBoth,
  };
};

export default useCursorController;
