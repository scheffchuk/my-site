import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronUp } from "lucide-react";

export function ExperienceAccordion() {
  return (
    <Accordion
      className="divide-accent/10 flex w-full flex-col divide-y"
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <AccordionItem value="life-in-japan">
        <AccordionTrigger className="text-accent hover:bg-accent data-[expanded]:bg-accent/10 group hover:text-primary-foreground w-full cursor-pointer px-4 py-2 text-left transition-all duration-150 hover:no-underline [&>svg]:hidden">
          <div className="group-data-[expanded]:text-accent flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChevronUp className="h-4 w-4 transition duration-150 group-data-[expanded]:-rotate-180" />
              <div>Life in Japan</div>
            </div>
            <span>2023 - Present</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-accent/10 px-4">
          <p className="text-accent px-3 pb-4">
            Move to Japan and enrolled in language school. Passed JLPT N1 test
            after one year of study. Then enrolled in an IT trade school for
            systematic learning, while self-learning web development.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="marketing-translator">
        <AccordionTrigger className="text-accent hover:bg-accent data-[expanded]:bg-accent/10 group hover:text-primary-foreground w-full cursor-pointer px-4 py-2 text-left transition-all duration-100 hover:no-underline [&>svg]:hidden">
          <div className="group-data-[expanded]:text-accent flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChevronUp className="h-4 w-4 transition duration-150 group-data-[expanded]:-rotate-180" />
              <div>Marketing, Translator</div>
            </div>
            <span>2019 - 2022</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-accent/10 px-4">
          <p className="text-accent px-3 pb-4">
            Primarily handled SNS marketing, including event planning and
            collaboration with designers, covering a wide range of
            responsibilities. Also worked as a freelance translator and English
            teacher.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="family-business">
        <AccordionTrigger className="text-accent hover:bg-accent data-[expanded]:bg-accent/10 group hover:text-primary-foreground w-full cursor-pointer px-4 py-2 text-left transition-all duration-150 hover:no-underline [&>svg]:hidden">
          <div className="group-data-[expanded]:text-accent flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChevronUp className="h-4 w-4 transition duration-150 group-data-[expanded]:-rotate-180" />
              <div>English Major, Family Business</div>
            </div>
            <span>2015 - 2019</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-accent/10 px-4">
          <p className="text-accent px-3 pb-4">
            Helping with the family restaurant business while majoring in
            English at university. Develop English skills, gain an international
            perspective, and appreciate diverse values.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
