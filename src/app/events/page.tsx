import EventTabs from "@/components/EventTabs";

export default function EventsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black mb-4" style={{
            background: "linear-gradient(to right, #00f0ff, #ff2a85)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}>All Events</h1>
        <p className="text-gray-400">Browse and register for Colorido 2K26 events.</p>
      </div>
      <EventTabs />
    </div>
  );
}
