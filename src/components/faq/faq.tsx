import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="acc_faq w-full rounded-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Cosmedicenter?</AccordionTrigger>
        <AccordionContent>
          CosMediCenter bridges accessibility with affordability, making high
          quality dental, beauty, and wellness services available to everyone.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Are there any membership fees?</AccordionTrigger>
        <AccordionContent>
          Cosmedicenter is designed as an integrative health, nutrition, and
          wellness app. It offers a reduced fee plan for dentistry and cosmetic
          esthetics, allowing users to search for in-network providers and leave
          reviews after appointments. The app also has a barcode feature that
          serves as an identity card and allows users to earn rewards for
          wellness visits. Cosmedicenter aims to provide an all-in-one path to
          affordable health, beauty, and wellness.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does Cosmedicenter work?</AccordionTrigger>
        <AccordionContent>
          CosMediCenter offers a variety of plans custom fit to your needs.
          Savings can be geared towards individuals, families and businesses.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Can I cancel my membership at any time?
        </AccordionTrigger>
        <AccordionContent>
          You can cancel your membership anytime before your next billing cycle.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
