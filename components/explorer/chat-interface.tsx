"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles, Plus, MessageSquare, Leaf, Building2, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Conversation {
  id: number
  title: string
  preview: string
  timestamp: Date
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    title: "Passive House Design",
    preview: "What are the key principles of passive house design?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 2,
    title: "Sustainable Materials",
    preview: "Best sustainable materials for tropical climates?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 3,
    title: "Net Zero Buildings",
    preview: "How to achieve net zero energy in commercial buildings?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
]

const suggestedPrompts = [
  {
    icon: Leaf,
    text: "What are the most sustainable building materials for cold climates?",
  },
  {
    icon: Building2,
    text: "How can I retrofit an existing building to be more energy efficient?",
  },
  {
    icon: Sun,
    text: "Explain passive solar design principles for residential architecture",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: `I understand you're asking about "${input}". As an AI assistant specialized in sustainable architecture, I can help you explore various aspects of green building design, materials, and best practices. 

For comprehensive guidance on sustainable architecture, I recommend considering:

1. **Climate-specific design**: Understanding your local climate is crucial for passive design strategies
2. **Material selection**: Choose materials with low embodied carbon and high durability
3. **Energy efficiency**: Implement passive strategies before active systems
4. **Water management**: Integrate rainwater harvesting and greywater systems

Would you like me to dive deeper into any of these areas?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col">
        <div className="p-4 border-b border-border">
          <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground mb-3">Recent Conversations</div>
            {mockConversations.map((conv) => (
              <Card
                key={conv.id}
                className="p-3 cursor-pointer hover:border-primary/50 transition-colors bg-background"
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1 mb-1">{conv.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{conv.preview}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">Powered by AI</p>
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Sustainability Expert
            </Badge>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Sustainability AI Assistant</h2>
              <p className="text-sm text-muted-foreground">Ask me anything about sustainable architecture</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-3">How can I help you today?</h1>
                <p className="text-muted-foreground">
                  I'm here to answer questions about sustainable architecture, green building materials, energy
                  efficiency, and more.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-muted-foreground mb-3">Suggested prompts</div>
                {suggestedPrompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 bg-card"
                    onClick={() => handlePromptClick(prompt.text)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <prompt.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed">{prompt.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-3 max-w-[80%]",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border",
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div
                      className={cn(
                        "text-xs mt-2",
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold">You</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-card border border-border rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                placeholder="Ask about sustainable architecture..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-background"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI can make mistakes. Verify important information with professional sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
