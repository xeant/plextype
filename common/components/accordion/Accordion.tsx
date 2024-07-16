import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

interface AccordionEmployee {
  children?: any;
  multiple?: any;
  defaultIndex?: any;
}

const Accordion = ({
  children,
  multiple,
  defaultIndex,
}: AccordionEmployee): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState(
    multiple ? [defaultIndex] : defaultIndex,
  );

  function onChangeIndex(index) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return index === activeIndex ? -1 : index;
      }

      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((i) => i !== index);
      }

      return currentActiveIndex.concat(index);
    });
  }

  return React.Children.map(children, (child, index) => {
    const isActive =
      multiple && Array.isArray(activeIndex)
        ? activeIndex.includes(index)
        : activeIndex === index;

    return (
      <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>
        {child}
      </AccordionContext.Provider>
    );
  });
};

function AccordionItem({ children }) {
  return <div className="AccordionItem mb-3">{children}</div>;
}
type Employee = {
  isActive?: any;
  index?: any;
  onChangeIndex?: any;
};

function AccordionHeader({ children, classname }) {
  const { isActive, index, onChangeIndex }: Employee = useAccordion();

  return (
    <motion.div
      className={`${classname} ${isActive ? "active" : ""}`}
      onClick={() => onChangeIndex(index)}
    >
      {children}
    </motion.div>
  );
}
function AccordionPanel({ children, classname }) {
  let isActive: any;
  isActive = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
                delay: 0.15,
              },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
              },
            },
          }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.5 }}
        >
          <div className={`${classname}`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export { Accordion, AccordionPanel, AccordionHeader, AccordionItem };
