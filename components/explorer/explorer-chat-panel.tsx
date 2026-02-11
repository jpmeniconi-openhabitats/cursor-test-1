"use client"

import { useState } from "react"
import { ArrowLeft, Send, Maximize2, CornerDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

interface Chat {
  id: number
  title: string
  lastActive: string
  messages: Message[]
  participantCount: number
}

const mockChats: Chat[] = [
  {
    id: 1,
    title: "Sustainable Housing Chile",
    lastActive: "2h ago",
    participantCount: 2,
    messages: [
      { id: 1, role: "user", content: "What are the best sustainable housing practices for Chile's climate?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Chile's diverse climate zones require different approaches. For central Chile with its Mediterranean climate, I recommend:\n\n1. **Passive solar design** - Orient buildings to maximize winter sun exposure while minimizing summer heat gain\n2. **Thermal mass** - Use adobe or concrete to regulate temperatures and reduce energy consumption\n3. **Natural ventilation** - Design for cooling summer breezes and cross-ventilation strategies\n4. **Seismic considerations** - Integrate sustainability with earthquake resilience using flexible materials\n5. **Water management** - Implement rainwater harvesting given Chile's water scarcity issues\n\nWould you like me to elaborate on any of these strategies?",
      },
      { id: 3, role: "user", content: "Can you give me examples of projects that use passive solar design in Chile?" },
      {
        id: 4,
        role: "assistant",
        content:
          "Here are some excellent examples visible in our database:\n\n**Earthship Biotecture Community** (Taos, New Mexico - similar climate principles)\n- Uses **rammed earth walls** for thermal mass\n- Large south-facing windows for winter heating\n- Achieved 85% CO₂ reduction\n- Perfect model for Chilean high-altitude communities\n\n**Local Chilean initiatives:**\n- The **Elemental Housing Project** in Iquique incorporates passive solar principles\n- **Casa GG** in Santiago uses thermal mass and natural ventilation\n\nI can highlight these on the map if you're interested in specific regions.",
      },
      { id: 5, role: "user", content: "That's great! What about renewable energy integration?" },
      {
        id: 6,
        role: "assistant",
        content:
          "Chile has exceptional renewable energy potential, especially solar! Here's what I recommend:\n\n**Solar Integration Strategy:**\n- **Northern regions** have over 300 sunny days/year - perfect for PV systems\n- Combine **solar thermal** for water heating with **photovoltaic** for electricity\n- **Rooftop integration** maintains architectural harmony\n- Battery storage systems (increasingly affordable) ensure year-round reliability\n\n**Wind Energy:**\n- **Patagonia region** has world-class wind resources\n- **Coastal areas** benefit from consistent sea breezes\n\n**Hybrid Approach:**\n1. Passive solar for heating/cooling (reduces demand)\n2. Active solar for water and electricity\n3. Wind backup for winter months\n4. Grid connection or battery storage for reliability\n\nThis combination can achieve 90%+ energy independence! Should we explore specific technologies?",
      },
    ],
  },
  {
    id: 2,
    title: "Solar Integration Research",
    lastActive: "1d ago",
    participantCount: 1,
    messages: [
      { id: 1, role: "user", content: "What are the latest trends in solar panel integration for buildings?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Great question! The latest trends in building-integrated photovoltaics (BIPV) are exciting:\n\n**1. Solar Roof Tiles**\n- Companies like Tesla and GAF Energy offer tiles that look like regular roofing\n- Seamless aesthetic integration\n- 15-25 year warranties becoming standard\n\n**2. Solar Facades**\n- Vertical solar panels on building walls\n- Especially effective in northern latitudes\n- Can generate 50-70% of horizontal panel output\n\n**3. Transparent Solar Windows**\n- Still emerging technology\n- 10-15% efficiency (improving rapidly)\n- Perfect for commercial buildings\n\n**4. Solar Canopies**\n- Parking structures and outdoor spaces\n- Dual purpose: shade + energy\n\nWould you like me to show you projects using these technologies?",
      },
      { id: 3, role: "user", content: "Yes, show me some examples of solar facades" },
      {
        id: 4,
        role: "assistant",
        content:
          "Here are some standout solar facade projects in our database:\n\n**The Edge** (Amsterdam, Netherlands)\n- One of the most sustainable buildings worldwide\n- **98% CO₂ reduction** achieved\n- Solar panels integrated into southern facade\n- Smart building systems optimize energy use\n\n**Copenhagen International School**\n- 12,000 solar panels covering facade\n- Generates 300 MWh annually\n- Panels change color based on viewing angle\n\n**Powerhouse Brattørkaia** (Norway)\n- Energy-positive office building\n- Facade and roof solar combined\n- Produces more energy than it consumes\n\nI've highlighted these on the map for you. Click on any marker to see more details!",
      },
    ],
  },
  {
    id: 3,
    title: "Bamboo Construction Methods",
    lastActive: "3d ago",
    participantCount: 1,
    messages: [
      { id: 1, role: "user", content: "I'm interested in bamboo as a building material. Is it really sustainable?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Bamboo is one of the most sustainable building materials available. Here's why:\n\n**Environmental Benefits:**\n- **Rapid growth**: Some species grow 1 meter per day!\n- **Carbon sequestration**: Absorbs 35% more CO₂ than trees\n- **Renewable**: Harvested every 3-5 years vs 20-50 for trees\n- **No deforestation**: Regenerates from existing root system\n\n**Structural Properties:**\n- Tensile strength comparable to steel\n- Flexible yet strong - excellent for earthquake zones\n- Lightweight reduces foundation requirements\n\n**Considerations:**\n- Requires proper treatment to prevent insects/rot\n- Not all bamboo species suitable for construction\n- Local availability varies by region\n\nWould you like to see bamboo projects in our database?",
      },
      { id: 3, role: "user", content: "Yes, show me the best bamboo projects" },
      {
        id: 4,
        role: "assistant",
        content:
          "Here are some remarkable bamboo projects:\n\n**Green School Bali** (Indonesia)\n- Iconic bamboo campus spanning 8 hectares\n- All structures built from locally-sourced bamboo\n- Demonstrates bamboo's architectural versatility\n- Withstands tropical climate and earthquakes\n\n**Sharma Springs** (Bali)\n- 6-story bamboo mansion\n- Uses treated Dendrocalamus asper bamboo\n- Features bamboo spiral staircase\n\n**Panyaden School** (Thailand)\n- Award-winning bamboo sports hall\n- Spans 17 meters without columns\n- Showcases bamboo's structural capability\n\nThese projects prove bamboo can be both beautiful and functional. Want me to filter the map to show all bamboo projects?",
      },
    ],
  },
  {
    id: 4,
    title: "Net Zero Office Buildings",
    lastActive: "5d ago",
    participantCount: 5,
    messages: [
      { id: 1, role: "user", content: "What makes an office building truly net zero?" },
      {
        id: 2,
        role: "assistant",
        content:
          "A true **net zero** office building produces as much energy as it consumes over a year. Here are the key components:\n\n**Energy Efficiency First:**\n- High-performance building envelope (insulation, windows)\n- LED lighting with occupancy sensors\n- Efficient HVAC systems (heat pumps, ERV)\n- Smart building management systems\n\n**Renewable Energy Generation:**\n- Rooftop and facade solar PV\n- On-site wind where feasible\n- Geothermal heating/cooling\n\n**Additional Strategies:**\n- Daylighting to reduce artificial lighting\n- Natural ventilation when possible\n- Electric vehicle charging (for Scope 3)\n- Green roofs for insulation\n\n**Verification:**\n- Third-party certification (LEED Zero, ILFI)\n- Annual energy monitoring\n- Carbon offset programs for remaining emissions\n\nShall I show you some certified net zero offices?",
      },
      { id: 3, role: "user", content: "What's the most impressive net zero office you have data on?" },
      {
        id: 4,
        role: "assistant",
        content:
          "The most impressive is definitely **The Edge** in Amsterdam:\n\n**Key Stats:**\n- **BREEAM score**: 98.36% (highest ever recorded)\n- **Energy**: Produces more than it consumes\n- **CO₂ reduction**: 98% compared to typical offices\n\n**Innovative Features:**\n- 28,000 sensors monitoring everything\n- Smartphone app assigns desks based on schedule\n- Solar panels on south facade\n- Aquifer thermal energy storage\n- Rainwater collection for toilets/irrigation\n- LED panels powered by ethernet cables\n\n**Results:**\n- 70% less electricity than comparable buildings\n- Occupant satisfaction scores above 90%\n- Rental premium of 15-20%\n\nThis building proves that sustainability and profitability go hand in hand. Want me to highlight it on the map?",
      },
    ],
  },
  {
    id: 5,
    title: "Urban Farming Integration",
    lastActive: "1w ago",
    participantCount: 1,
    messages: [
      { id: 1, role: "user", content: "How are buildings integrating urban farming?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Urban farming integration is becoming increasingly sophisticated! Here are the main approaches:\n\n**Rooftop Farms:**\n- Most common approach\n- Can produce 20+ kg vegetables/m² annually\n- Provides insulation and reduces heat island effect\n\n**Vertical Farms:**\n- Indoor growing with LED lights\n- 95% less water than traditional farming\n- Year-round production regardless of climate\n\n**Facade Gardens:**\n- Living walls with edible plants\n- Improves air quality and building aesthetics\n- Herbs and small vegetables work best\n\n**Aquaponics Systems:**\n- Combined fish + vegetable production\n- Fish waste fertilizes plants\n- 90% water recirculation\n\n**Basement/Underground:**\n- Mushroom cultivation\n- Microgreens production\n- Utilizes unused space\n\nWant to see buildings with integrated farming systems?",
      },
      { id: 3, role: "user", content: "Show me the Bosco Verticale project" },
      {
        id: 4,
        role: "assistant",
        content:
          "**Bosco Verticale** (Vertical Forest) in Milan is iconic!\n\n**Project Overview:**\n- Two residential towers (111m and 76m)\n- Designed by Stefano Boeri Architects\n- Completed in 2014\n- **92% CO₂ reduction** achieved\n\n**Living Elements:**\n- 900 trees (480 large, 300 medium, 120 small)\n- 5,000 shrubs\n- 11,000 perennial plants\n- Equivalent to 20,000m² of forest\n\n**Environmental Benefits:**\n- Absorbs 30 tons CO₂ annually\n- Produces 19 tons oxygen\n- Creates microhabitats for birds/insects\n- Filters dust particles\n- Reduces noise pollution\n\n**Practical Considerations:**\n- Flying gardeners maintain vegetation\n- Irrigation system uses greywater\n- Plants selected to withstand high winds\n\nThis project has inspired similar buildings worldwide. I've highlighted it on the map!",
      },
    ],
  },
  {
    id: 6,
    title: "Passive House Design",
    lastActive: "3h ago",
    participantCount: 2,
    messages: [
      { id: 1, role: "user", content: "What are the key principles of Passive House design?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Passive House (Passivhaus) is a rigorous standard for energy efficiency. The five key principles are:\n\n1. **Superior insulation** - Minimize heat loss through walls, roof, and floor\n2. **High-performance windows** - Triple-glazed with insulated frames\n3. **Airtight construction** - Prevent uncontrolled air leakage\n4. **Thermal bridge-free design** - Eliminate cold spots in the building envelope\n5. **Heat recovery ventilation** - Recover up to 90% of heat from exhaust air\n\nThese principles can reduce heating/cooling needs by up to 90% compared to conventional buildings!",
      },
    ],
  },
  {
    id: 8,
    title: "Rammed Earth Construction",
    lastActive: "12h ago",
    participantCount: 4,
    messages: [
      { id: 1, role: "user", content: "Tell me about rammed earth as a building material" },
      {
        id: 2,
        role: "assistant",
        content:
          "Rammed earth is an ancient technique experiencing modern revival:\n\n**Properties:**\n- Excellent thermal mass for temperature regulation\n- Non-toxic and recyclable\n- Fire-resistant and termite-proof\n- Beautiful natural aesthetic\n\n**Modern Applications:**\n- Residential homes in arid climates\n- Commercial buildings with exposed walls\n- Combined with modern insulation for cold climates\n\n**Considerations:**\n- Requires skilled labor\n- Thick walls reduce floor space\n- Not suitable for high-moisture environments\n\nI can show you stunning rammed earth projects in our database!",
      },
    ],
  },
  {
    id: 10,
    title: "Carbon-Negative Materials",
    lastActive: "4d ago",
    participantCount: 3,
    messages: [
      { id: 1, role: "user", content: "What building materials are actually carbon-negative?" },
      {
        id: 2,
        role: "assistant",
        content:
          "Several materials can sequester more carbon than they emit during production:\n\n**1. Mass Timber (CLT)**\n- Stores ~1 ton CO₂ per cubic meter\n- Replaces carbon-intensive concrete/steel\n- Renewable when forests managed sustainably\n\n**2. Hempcrete**\n- Sequesters 110 kg CO₂ per m³\n- Excellent insulator (R-2.5 per inch)\n- Pest-resistant and non-toxic\n\n**3. Mycelium Composites**\n- Grows from agricultural waste\n- Biodegradable at end of life\n- Emerging technology with huge potential\n\n**4. Bio-based Insulation**\n- Sheep wool, cork, cellulose\n- Low embodied energy\n- Natural and recyclable\n\n**5. Bamboo**\n- Rapid carbon absorption\n- Stronger than many hardwoods\n\nWant to explore projects using these materials?",
      },
    ],
  },
]

// Function to render text with markdown bold
const renderMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

interface ExplorerChatPanelProps {
  className?: string
}

export function ExplorerChatPanel({ className }: ExplorerChatPanelProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chatFilter, setChatFilter] = useState<"all" | "group">("all")

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleBack = () => {
    setSelectedChat(null)
    setIsFullscreen(false)
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      // In a real app, this would send the message
      setInputValue("")
    }
  }

  // Fullscreen chat overlay
  if (isFullscreen && selectedChat) {
    return (
      <>
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" onClick={() => setIsFullscreen(false)} />
        <div className="fixed inset-4 md:inset-10 bg-black/95 border border-white/10 rounded-2xl z-[201] flex flex-col overflow-hidden">
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
              <div>
                <h2 className="text-white font-semibold">{selectedChat.title}</h2>
                <p className="text-xs text-white/50">with OpenHabitats AI</p>
              </div>
            </div>
            <button onClick={() => setIsFullscreen(false)} className="text-white/50 hover:text-white text-sm">
              Exit fullscreen
            </button>
          </div>

          {/* Fullscreen Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 flex-shrink-0">
                      <Image
                        src="/openhabitats-logo.png"
                        alt="OpenHabitats"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user" ? "bg-[#008080] text-white" : "bg-white/10 text-white/90"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{renderMarkdown(message.content)}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#008080] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      JP
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Fullscreen Input */}
          <div className="p-4 border-t border-white/10">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#008080]"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: "#008080" }}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Chat conversation view
  if (selectedChat) {
    return (
      <div className={`h-full flex flex-col overflow-hidden ${className}`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/10 flex-shrink-0 h-[60px]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h3 className="text-sm font-medium text-white">{selectedChat.title}</h3>
              <p className="text-[10px] text-white/50">with OpenHabitats AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsFullscreen(true)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages with calculated height */}
        <div className="h-[calc(100%-116px)] overflow-y-auto overflow-x-hidden custom-scrollbar p-3">
          <div className="space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image
                      src="/openhabitats-logo.png"
                      alt="OpenHabitats"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    message.role === "user" ? "bg-[#008080] text-white" : "bg-white/5 text-white/90"
                  }`}
                >
                  <p className="text-xs whitespace-pre-wrap leading-relaxed">{renderMarkdown(message.content)}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    JP
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 p-3 border-t border-white/10 bg-black h-[56px]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#008080] transition-colors"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="w-8 h-8 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#008080" }}
            >
              <Send className="w-3 h-3 text-white" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Chat list view
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setChatFilter("all")}
            className={`text-sm font-semibold transition-colors ${
              chatFilter === "all" ? "text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            All Chats
          </button>
          <button
            onClick={() => setChatFilter("group")}
            className={`text-sm font-semibold transition-colors ${
              chatFilter === "group" ? "text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            Group Chats
          </button>
        </div>
        <Button size="sm" className="h-7 bg-[#008080] hover:bg-[#006666] text-white px-3 text-xs rounded-full">
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {mockChats
            .filter((chat) => chatFilter === "all" || chat.participantCount > 1)
            .map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className="py-5 px-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors border border-white/5 hover:border-white/10 relative"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-medium text-white">{chat.title}</h3>
                </div>

                <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
                  <CornerDownRight className="w-3 h-3" />
                  <span>{chat.lastActive}</span>
                </div>

                {/* Participant avatars */}
                {chat.id === 1 && (
                  <div className="absolute bottom-2 right-2 flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-10">
                      JP
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black">
                      MK
                    </div>
                  </div>
                )}

                {chat.id === 4 && (
                  <div className="absolute bottom-2 right-2 flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[14]">
                      AM
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[13]">
                      LC
                    </div>
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[12]">
                      RK
                    </div>
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[11]">
                      SB
                    </div>
                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-10">
                      TM
                    </div>
                  </div>
                )}

                {chat.id === 6 && (
                  <div className="absolute bottom-2 right-2 flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-10">
                      AW
                    </div>
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black">
                      BR
                    </div>
                  </div>
                )}

                {chat.id === 8 && (
                  <div className="absolute bottom-2 right-2 flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[13]">
                      DK
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[12]">
                      EF
                    </div>
                    <div className="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[11]">
                      GH
                    </div>
                    <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-10">
                      IJ
                    </div>
                  </div>
                )}

                {chat.id === 10 && (
                  <div className="absolute bottom-2 right-2 flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[12]">
                      NP
                    </div>
                    <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-[11]">
                      QR
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-black z-10">
                      ST
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}
