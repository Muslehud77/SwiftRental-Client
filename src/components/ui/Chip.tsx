import { motion } from 'framer-motion';

export const Chip = ({
  text,
  selected,
  setSelected,
  layoutId,
}: {
  text: string;
  selected: boolean;
  layoutId: string;
  setSelected: (value: string) => void;
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-foreground hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId={layoutId}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-primary rounded-md"
        ></motion.span>
      )}
    </button>
  );
};
