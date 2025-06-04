import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-full z-50 bg-lightGreen"
        />
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
