import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Breathe & Getaway?",
      answer: "Breathe & Getaway is an AI-powered online travel agency (OTA) that turns both specific requests and broad ideas into personalized getaways. It handles real-time booking for flights, hotels, and more—starting from how you feel, not just where you want to go."
    },
    {
      question: "Is Breathe & Getaway open to the public?",
      answer: "We're currently in our waitlist phase, gradually inviting new users as we scale. A lot of early users have already joined, and momentum is growing fast. You can join the waitlist today and get priority access."
    },
    {
      question: "Why is it getting attention?",
      answer: "It flips the script on traditional trip planning. Instead of focusing on just destinations, Breathe & Getaway starts with your intent, timing, and emotions. That shift is getting attention — from both the travel industry and everyday users — as a smarter, more human way to book travel."
    },
    {
      question: "Can I ask for something vague, like \"a quiet escape\"?",
      answer: "Absolutely. You can give us a feeling, mood, or general idea—like \"I want somewhere peaceful\" or \"I need to reset\"—and our AI will design and book a trip that fits."
    },
    {
      question: "Do you handle actual booking or just planning?",
      answer: "We do both. Once your trip is tailored to your needs, you can book flights, hotels, and more directly through our platform — no switching tabs or copying details."
    },
    {
      question: "Can I pick specific features, like hotel type or flight preferences?",
      answer: "Definitely. You can request specifics like \"must have breakfast included\" or \"window seat during sunset\"—our AI can handle that level of detail."
    },
    {
      question: "Is it only for last-minute trips?",
      answer: "Not at all. You can use Breathe & Getaway for spontaneous escapes or carefully timed plans weeks or months ahead."
    },
    {
      question: "Is it free to use?",
      answer: "Yes, you can explore ideas and receive custom getaway options for free. You only pay when you decide to book."
    },
    {
      question: "Can I trust the bookings and prices?",
      answer: "Yes. We partner with trusted global flight providers like Mystifly to give you real-time, bookable results that are accurate and secure."
    },
    {
      question: "How do I get support if something goes wrong?",
      answer: "We offer support through email and chat, and we're continuing to scale our support team as more travelers join. You'll never be left in the dark."
    }
  ];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-muted/50 text-muted-foreground border-border">
              <Sparkles className="w-4 h-4 mr-2" />
              Growing Fast
            </Badge>
            
            <h2 className="font-playfair text-3xl md:text-5xl font-light text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 text-muted-foreground max-w-3xl mx-auto">
              <p className="text-lg">
                Breathe & Getaway is one of the fastest-growing AI travel startups — already building serious buzz. 
                With thousands of users on the waitlist and early beta testers sharing rave experiences, 
                it's being called the next big thing in emotionally intelligent travel booking.
              </p>
              <p className="text-base">
                We're still in our early access phase, but the momentum is real — and we're just getting started.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border bg-card/50 backdrop-blur-sm rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-foreground/80 py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FAQ;