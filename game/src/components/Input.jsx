import { motion } from "motion/react";

function Input(props) {
  if (props.type === "button" || props.type === "submit") { // Check if the input is a button or submit type
    return (
      // Use motion.button for animations
      <motion.button
        {...props}
        whileHover={{
          scale: 1.05,
          transition: { duration: 2 },
        }}
        whileTap={{ scale: 0.95 }}
        className={`py-3 px-5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg hover:bg-gold hover:text-black transition-colors duration-200 ${
          props.className || ""
        }`}
      >
        {props.value || props.children}
      </motion.button>
    );
  }
  return (
    // For other input types, use a regular input element
    <input
      {...props}
      className={`py-3 px-5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg transition-colors duration-200 ${
        props.className || ""
      }`}
    />
  );
}

export default Input;
