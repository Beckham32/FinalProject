import { motion } from "motion/react";

function Input(props) {
  if (props.type === "button" || props.type === "submit") {
    return (
      <motion.button
        {...props}
        whileHover={{
          scale: 1.05,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-2 text-2xl border-8 ridge border-border-wood outline-black outline-3 inset-ring-2 inset-ring-black bg-gradient-to-br from-wood to-dark-wood text-tan rounded-sm hover:cursor-pointer ${
          props.className || ""
        }`}
      >
        {props.value || props.children}
      </motion.button>
    );
  }
  return (
    <input
      {...props}
      className={`px-5 py-2 text-2xl border-8 ridge border-border-wood outline-black outline-3 inset-ring-2 inset-ring-black placeholder:text-dark bg-gradient-to-br from-ingrain to-tan text-dark ${
        props.className || ""
      }`}
    />
  );
}

export default Input;
