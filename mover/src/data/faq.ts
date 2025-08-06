export interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What is 404movers?",
    answer:
      "404movers connects you to truckers and movers, ready to move your stuff within the hour or up to 30 days from now.",
  },
  {
    question: "What hours does 404movers operate?",
    answer:
      "You can schedule with 404movers whenever you want as long as the driver is available.",
  },
  {
    question: "What area does 404movers cover?",
    answer:
      "You can schedule your move or delivery with 404movers in: Calgary, Edmonton, Lethbridge, Re Deer and Medicine Hat. Coming soon: Greater Vancouver, Victoria, Langley, Abbotsford and Kelowna",
  },
  {
    question: "How do I pay for my 404movers?",
    answer:
      "Paying for your 404movers is simple and easy using your debit or credit card when you schedule through website. We do not accept cash at 404movers.",
  },

  {
    question: "When do I pay for my move?",
    answer:
      "After your 404movers is complete, we will then charge the card that's associated with your account. You'll also be prompted to leave a rating & review.",
  },
  {
    question: "Do I get charged if I cancel my 404movers?",
    answer:
      "Absolutely not! We’ll only charge you for a 404movers that gets completed.",
  },
  {
    question:
      "I see a $25 fee on my credit card statement? Is that in addition to my request?",
    answer:
      "This $25 is not a booking fee, it’s simply a pre-authorization fee in order to verify your bank account is valid and funds are available. Each time you schedule a 404movers we run a $25 pre-auth charge. These funds will never leave your bank and should show as available within 1-2 days.",
  },
  {
    question: "Can I tip my movers?",
    answer:
      "Tipping is entirely optional, but if you want to reward your movers for a job well done you'll have the opportunity to do so in our app, right after your 404movers is completed. Please make sure if you tipped them in cash to select ‘No Tip’ in our app or website to prevent a double tip.",
  },
  {
    question: "Can I ride in the same vehicle as my stuff?",
    answer: "Unfortunately, we do not authorize ride sharing on our system.",
  },
];

export default faqItems;
