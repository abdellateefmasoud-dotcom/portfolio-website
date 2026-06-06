let memory = {
  lastTopic: null
};
function addMessage(text, type) {
  let div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  document.getElementById("chatArea").appendChild(div);
  scrollChat();
}

// ===== SCROLL =====
function scrollChat() {
  let chat = document.getElementById("chatArea");
  chat.scrollTop = chat.scrollHeight;
}

// ===== SEND MESSAGE =====
function sendMessage() {

  let input = document.getElementById("userInput");
  let text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  showTyping(true);

  setTimeout(() => {

    let reply = bot(text.toLowerCase());

    showTyping(false);

    addMessage(reply, "bot");

    speak(reply);

  }, 900);
}

// ===== SHOW TYPING =====
function showTyping(state) {

  let typing = document.getElementById("typing");

  if (!typing) return;

  typing.classList.toggle("hidden", !state);
}

// ===== AI BRAIN =====
function bot(text) {

  let ccna = /ccna|cisco|network|routing|switch|vlan|subnet/.test(text);

  let cyber = /cyber|security|hack|hacking|phishing|malware/.test(text);

  let cloud = /cloud|aws|azure|saas|iaas|paas/.test(text);

  let web = /html|css|javascript|js/.test(text);

  if(
  text.includes("who are you") ||
  text.includes("about you") ||
  text.includes("من انت")
){
  return "👨‍💻 I am Abdellateef Mahran, an IT Officer specializing in Networking, Cyber Security, Cloud Computing and Web Development.";
}

  if (ccna) {
    memory.lastTopic = "Networking";
    return "CCNA covers Routing, Switching, VLANs, Subnetting and Networking fundamentals.";
  }

  if (cyber) {
    memory.lastTopic = "Cyber Security";
    return "Cyber Security protects systems from attacks like malware, phishing and hacking.";
  }

  if (cloud) {
    memory.lastTopic = "Cloud";
    return "Cloud Computing provides AWS, Azure and Google Cloud services.";
  }

  if (web) {
    memory.lastTopic = "Web Development";
    return "Web Development uses HTML, CSS and JavaScript to build websites.";
  }

  if (text.includes("more")) {
    return memory.lastTopic
      ? "Let me explain more about " + memory.lastTopic + "."
      : "Ask about a topic first.";
  }
// Greetings
if(
  text.includes("hello") ||
  text.includes("hi") ||
  text.includes("hey")
){
  return "👋 Hello! Welcome to my portfolio. How can I help you today?";
}

// Good morning
if(text.includes("good morning")){
  return "☀️ Good morning! Hope you're having a great day.";
}

// Good evening
if(text.includes("good evening")){
  return "🌙 Good evening! How can I help you?";
}

// How are you
if(text.includes("how are you")){
  return "😊 I'm doing great, thanks for asking!";
}

// Today's date
if(
  text.includes("date") ||
  text.includes("today")
){
  return "📅 Today is " + new Date().toLocaleDateString();
}

// Current time
if(
  text.includes("time") ||
  text.includes("what time")
){
  return "⏰ Current time: " + new Date().toLocaleTimeString();
}

// Working hours
if(
  text.includes("available") ||
  text.includes("working hours") ||
  text.includes("office hours")
){
  return "🕒 Working hours are from 8:00 AM to 5:00 PM.";
}

// Contact information
if(
  text.includes("contact") ||
  text.includes("email") ||
  text.includes("phone")
){
  return "📩 Please use the Contact Form on the left side of this page and I will reply as soon as possible.";
}

// CV
if(
  text.includes("cv") ||
  text.includes("resume")
){
  return "📄 You can download my CV from the CV section of the website.";
}

// Skills
if(
  text.includes("skills")
){
  return "💻 My skills include Networking, CCNA, Cyber Security, Azure, Active Directory, Windows Administration and Web Development.";
}

if(
  text.includes("education") ||
  text.includes("study")
){
  return "🎓 I have experience in IT, Networking and Cyber Security studies.";
}
if(
  text.includes("are you available") ||
  text.includes("can i call you")
){
  let hour = new Date().getHours();

  if(hour >= 8 && hour < 17){
    return "🧑‍💼 I am currently at work (8 AM - 5 PM). Please leave your message using the contact form.";
  }

  return "✅ I am currently available. Please leave your message using the contact form.";
}
 return `
🤖 I don't have enough information to answer that.

You can ask me about my expertise, certifications, projects, networking, cyber security, cloud technologies, or web development.

Please try another question.
`;
}

// ===== SPEAK =====
function speak(text) {

  let msg = new SpeechSynthesisUtterance(text);

  msg.lang = "en-US";
  msg.rate = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// ===== VOICE INPUT =====
function startVoice() {

  let rec =
    new (window.SpeechRecognition ||
         window.webkitSpeechRecognition)();

  rec.lang = "en-US";
  rec.start();

  rec.onresult = function (e) {

    document.getElementById("userInput").value =
      e.results[0][0].transcript;

    sendMessage();
  };
}

// ===== ENTER KEY =====
window.addEventListener("DOMContentLoaded", () => {

  let input = document.getElementById("userInput");

  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Suggestions
  let list = [
    "What is CCNA?",
    "Explain Cyber Security",
    "What is Cloud?",
    "Who are you?"
  ];

  let box = document.getElementById("suggestions");

  if (!box) return;

  list.forEach(q => {

    let s = document.createElement("span");

    s.innerText = q;

    s.onclick = () => {
      document.getElementById("userInput").value = q;
      sendMessage();
    };

    box.appendChild(s);
    
  });

});
function sendContact(){

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  let status = document.getElementById("statusMsg");

  if(!name.value || !email.value || !message.value){
    status.className = "error";
    status.innerText = "❌ Please fill all fields";
    return;
  }

  let params = {
    from_name: name.value,
    from_email: email.value,
    reply_to: email.value,
    message: message.value
  };

  emailjs.send("service_vkrc2dd", "template_knmlyzq", params)
    .then(() => {

      status.className = "success";
      status.innerText = "✅ Message sent successfully";

      name.value = "";
      email.value = "";
      message.value = "";

    })
    .catch(() => {
      status.className = "error";
      status.innerText = "❌ Failed to send message";
    });
}