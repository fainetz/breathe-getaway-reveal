import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
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
    },
    {
      question: "Who is behind Breathe & Getaway?",
      answer: "Breathe & Getaway is founded and led by a passionate young entrepreneur (he/him, 19 years old) who believes in the power of AI to transform how we discover and experience travel. Driven by a vision of making personalized travel accessible to everyone, the founder combines innovative technology with a deep understanding of human emotions and wanderlust."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 overflow-x-hidden transition-colors duration-300">
      {/* Elegant Back Button */}
      <div className="fixed top-28 left-6 z-40">
        <Link 
          to="/" 
          className="group flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border rounded-2xl px-6 py-4 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium mb-8">
            <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full"></div>
            <span className="text-foreground/80">Growing Fast</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight mb-8">
            <span className="block text-foreground/90 mb-2">
              Frequently Asked
            </span>
            <span className="block text-foreground font-medium">
              Questions
            </span>
          </h1>
          
          <div className="space-y-4 text-lg text-muted-foreground mb-12">
            <p>
              Breathe & Getaway is one of the fastest-growing AI travel startups — already building serious buzz. With thousands of users on the waitlist and early beta testers sharing rave experiences, it's being called the next big thing in emotionally intelligent travel booking.
            </p>
            <p>
              We're still in our early access phase, but the momentum is real — and we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/80 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Q: {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A: {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </div>
  );
};

export default FAQ;