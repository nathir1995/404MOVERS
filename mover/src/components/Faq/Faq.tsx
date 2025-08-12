import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import faqItems from "@/data/faq";
import { safeMap, hasItems } from "@/utility/arraySafety";

const Faq = () => {
  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      {safeMap(faqItems, (item, idx) => (
        <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <h6 style={{ display: "inline" }}>{item.question}</h6>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>{item.answer}</p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faq;
