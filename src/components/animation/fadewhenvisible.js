import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeWhenVisible = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeWhenVisible;
