import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
  type?: "text" | "system";
}

interface UnlockedInfo {
  name: boolean;
  photo: boolean;
  contact: boolean;
  location: boolean;
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! 👋", sender: "other", timestamp: new Date(Date.now() - 3600000) },
    { id: "2", text: "Hi! Excited to learn more about the trip", sender: "me", timestamp: new Date(Date.now() - 3000000) },
    { id: "3", text: "Metoo! Where should we start?", sender: "other", timestamp: new Date(Date.now() - 2400000) },
    { id: "4", text: "How about starting with Day 1?", sender: "me", timestamp: new Date(Date.now() - 1800000) },
  ]);
  const [inputText, setInputText] = useState("");
  const [showSafetyMenu, setShowSafetyMenu] = useState(false);
  const [tripConfirmed, setTripConfirmed] = useState(false);
  const [unlockedInfo, setUnlockedInfo] = useState<UnlockedInfo>({
    name: true,
    photo: false,
    contact: false,
    location: false,
  });
  const [itineraryVisibility, setItineraryVisibility] = useState({
    day1: true,
    day2: true,
    day3: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds great! Let's plan it out. 🗺️",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const unlockInfo = (type: keyof UnlockedInfo) => {
    setUnlockedInfo(prev => ({ ...prev, [type]: true }));
    
    const systemMessage: Message = {
      id: Date.now().toString(),
      text: `🔓 ${type.charAt(0).toUpperCase() + type.slice(1)} information unlocked`,
      sender: "other",
      timestamp: new Date(),
      type: "system",
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSOS = () => {
    alert("SOS Alert sent! Emergency contacts and nearby authorities have been notified.");
    setShowSafetyMenu(false);
  };

  const handleShareLocation = () => {
    alert("Location shared with your emergency contacts.");
    setShowSafetyMenu(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_35%,_#fffdfd_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <BackIcon />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-lg font-bold text-white">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Alex</p>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cancel Button */}
            <button 
              onClick={() => navigate("/home")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowSafetyMenu(!showSafetyMenu)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
              >
                <ShieldIcon />
              </button>
            
            {showSafetyMenu && (
              <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <button 
                  onClick={handleSOS}
                  className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left text-red-600 transition hover:bg-red-100"
                >
                  <SOSIcon />
                  <div>
                    <p className="font-bold">SOS Emergency</p>
                    <p className="text-xs text-red-400">Alert authorities</p>
                  </div>
                </button>
                <button 
                  onClick={handleShareLocation}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50"
                >
                  <LocationShareIcon />
                  <div>
                    <p className="font-semibold">Share Location</p>
                    <p className="text-xs text-slate-400">Send to contacts</p>
                  </div>
                </button>
                <button 
                  onClick={() => setShowSafetyMenu(false)}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50"
                >
                  <BlockIcon />
                  <div>
                    <p className="font-semibold">Block User</p>
                    <p className="text-xs text-slate-400">Stop all communication</p>
                  </div>
                </button>
              </div>
            )}
            </div>
          </div>
        </header>

        {/* Privacy Status Bar */}
        <div className="bg-white border-b border-slate-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${tripConfirmed ? "bg-green-500" : "bg-amber-500"}`}></span>
              <span className="text-xs font-medium text-slate-600">
                {tripConfirmed ? "Trip Confirmed" : "Anonymous chat before confirming"}
              </span>
            </div>
            <button 
              onClick={() => setTripConfirmed(!tripConfirmed)}
              className="text-xs font-semibold text-red-500 hover:text-red-600"
            >
              {tripConfirmed ? "View Agreement" : "Confirm Trip"}
            </button>
          </div>
        </div>

        {/* Unlock Info Steps */}
        <div className="bg-slate-50 px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Gradual Information Unlock
          </p>
          <div className="flex gap-2">
            <UnlockButton 
              label="Photo" 
              unlocked={unlockedInfo.photo} 
              onClick={() => unlockInfo("photo")} 
            />
            <UnlockButton 
              label="Contact" 
              unlocked={unlockedInfo.contact} 
              onClick={() => unlockInfo("contact")} 
            />
            <UnlockButton 
              label="Location" 
              unlocked={unlockedInfo.location} 
              onClick={() => unlockInfo("location")} 
            />
          </div>
        </div>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto bg-white px-4 py-4">
          {/* System Message */}
          <div className="mb-4 rounded-2xl bg-blue-50 p-3 text-center">
            <p className="text-xs font-medium text-blue-600">
              🔒 Anonymous chat mode - Your personal info is hidden until trip is confirmed
            </p>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                {msg.type === "system" ? (
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-center">
                    <p className="text-xs text-slate-500">{msg.text}</p>
                  </div>
                ) : (
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.sender === "me" 
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-md" 
                      : "bg-slate-100 text-slate-800 rounded-bl-md"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`mt-1 text-right text-[10px] ${msg.sender === "me" ? "text-red-100" : "text-slate-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </main>

        {/* Itinerary Visibility Toggle */}
        <div className="border-t border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Itinerary Visibility</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Day 1</span>
              <ToggleSwitch 
                checked={itineraryVisibility.day1} 
                onClick={() => setItineraryVisibility(prev => ({ ...prev, day1: !prev.day1 }))}
              />
              <span className="text-xs text-slate-400">Day 2</span>
              <ToggleSwitch 
                checked={itineraryVisibility.day2} 
                onClick={() => setItineraryVisibility(prev => ({ ...prev, day2: !prev.day2 }))}
              />
              <span className="text-xs text-slate-400">Day 3</span>
              <ToggleSwitch 
                checked={itineraryVisibility.day3} 
                onClick={() => setItineraryVisibility(prev => ({ ...prev, day3: !prev.day3 }))}
              />
            </div>
          </div>
        </div>

        {/* Contact Sharing Option */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-2">
          <button className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <ContactIcon className="text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Optional: Share Contact</span>
            </div>
            <span className="text-xs text-slate-400">After agreement</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
              <PlusIcon />
            </button>
            <div className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <button 
              onClick={sendMessage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transition hover:from-red-600 hover:to-red-700"
            >
              <SendIcon />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            Unlock information visibility at your pace
          </p>
        </div>

        {/* Bottom Nav */}
        <nav className="border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
            <NavItem to="/home" label="Home" icon={<HomeIcon />} />
            <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
            <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
            <NavItem to="/chat" label="Chat" icon={<ChatIcon />} active />
            <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
          </div>
        </nav>

        {/* SOS Button - เด่นชัดขึ้น */}
        <button
          onClick={handleSOS}
          className="fixed bottom-24 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_8px_30px_rgba(239,68,68,0.5)] transition-all hover:scale-110 hover:bg-red-700 animate-pulse"
        >
          <span className="text-xs font-bold">SOS</span>
        </button>
      </div>
    </div>
  );
}

function UnlockButton({ label, unlocked, onClick }: { label: string; unlocked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={unlocked}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        unlocked
          ? "bg-green-100 text-green-600"
          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      {unlocked ? "🔓" : "🔒"}
      <span>{unlocked ? label : `Unlock ${label}`}</span>
    </button>
  );
}

function ToggleSwitch({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-red-500" : "bg-slate-300"}`}
    >
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function NavItem({ to, label, icon, active = false }: { to: string; label: string; icon: React.ReactNode; active?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
        active ? "text-red-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className={active ? "scale-110" : ""}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

// Icons
function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function SOSIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LocationShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 21c4-4 8-8 8-12a8 8 0 10-16 0c0 4 4 8 8 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 21a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a4.5 4.5 0 018.9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 19a3.7 3.7 0 017.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8h10l1 11H6L7 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V7a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
