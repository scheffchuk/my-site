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
      className="flex w-full flex-col -mx-2"
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <AccordionItem value="now">
        <AccordionTrigger className="text-accent hover:bg-accent data-[expanded]:bg-accent/10 group hover:text-primary-foreground w-full cursor-pointer p-2 text-left transition-all duration-150 ease-out hover:no-underline [&>svg]:hidden">
          <div className="group-data-[expanded]:text-accent flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChevronUp className="h-4 w-4 transition-transform duration-150 ease-out group-data-[expanded]:-rotate-180" />
              <div>Now</div>
            </div>
            <span className="hidden md:block">2023 - Present</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-accent/10">
          <p className="text-accent px-3 pb-4">
            Moved to Japan, enrolled in language school, and passed JLPT N1
            after one year of study. Currently studying at an IT trade school while
            self-learning web development.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="past">
        <AccordionTrigger className="text-accent hover:bg-accent data-[expanded]:bg-accent/10 group hover:text-primary-foreground w-full cursor-pointer p-2 text-left transition-all duration-150 ease-out hover:no-underline [&>svg]:hidden">
          <div className="group-data-[expanded]:text-accent flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChevronUp className="h-4 w-4 transition-transform duration-150 ease-out group-data-[expanded]:-rotate-180" />
              <div>Past</div>
            </div>
            <span className="hidden md:block">2013 - 2022</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-accent/10">
          <p className="text-accent px-3 pb-4">
            Majored in English while helping with the family restaurant. Later
            worked in SNS marketing, freelance translation, and English teaching.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
