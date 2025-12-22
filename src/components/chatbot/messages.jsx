const replies = [
  {
    keywords: ["hi", "hello", "hey"],
    reply: "Hi 👋 I’m Chitti, Brajesh’s AI assistant. How can I help you?"
  },
  {
    keywords: ["who are you", "your name"],
    reply: "I’m Chitti 🤖, a virtual assistant created by Brajesh."
  },
  {
    keywords: ["brajesh", "owner", "creator"],
    reply: "Brajesh is a Computer Engineer, Tech Explorer, and Developer 🚀"
  },
  {
    keywords: ["skills", "expertise"],
    reply: "Brajesh works with React, IoT, AI basics, UI design, and automation."
  },
  {
    keywords: ["projects"],
    reply: "Brajesh has built IoT systems, portfolio websites, and chatbot interfaces."
  },
  {
    keywords: ["contact", "email"],
    reply: "You can contact Brajesh at 📧 kodambrajesh1111@gmail.com"
  },
  {
    keywords: ["bye", "thank"],
    reply: "Glad I could help 😊 Have a great day!"
  }
];

export function getBotReply(userText) {
  const text = userText.toLowerCase();

  for (let item of replies) {
    if (item.keywords.some(word => text.includes(word))) {
      return item.reply;
    }
  }

  return "🤖 I’m still learning. Try asking about Brajesh, skills, or projects.";
}
