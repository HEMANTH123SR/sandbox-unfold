import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-black">
      <h1 className="text-6xl font-normal text-zinc-300 mb-16">
        Frequently
        <br />
        Asked Questions
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Accordion type="single" collapsible className="space-y-6">
          <AccordionItem value="item-1" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              How does Toronto Tech Week work?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400 ">
              Toronto Tech Week brings together tech enthusiasts, professionals,
              and companies for a week of events, workshops, and networking
              opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              Do I need to pay to attend events?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              While some events are free, others may require a ticket purchase.
              Each event listing will clearly indicate if there is an associated
              cost.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              When is Toronto Tech Week happening?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Toronto Tech Week takes place annually. Please check our schedule
              page for specific dates and times of upcoming events.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="space-y-6">
          <AccordionItem value="item-4" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              What is Toronto Tech Week?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Toronto Tech Week is a citywide festival celebrating technology
              and innovation, featuring events, speakers, and networking
              opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              How do I find out about the events?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              You can find information about all events on our website and
              through our newsletter. Follow us on social media for real-time
              updates.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-300 hover:text-zinc-300 text-left">
              Where is Toronto Tech Week happening?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Events take place at various venues across Toronto. Each event
              listing includes specific location details and directions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
