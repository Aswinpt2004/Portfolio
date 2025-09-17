"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User } from "lucide-react"
import { useState } from "react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Aswin's AI assistant. I'm trained on his resume, GitHub projects, and LinkedIn profile. Ask me anything about his experience, skills, or projects!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response (in real implementation, this would call your AI service)
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your question! This is a demo chatbot. In the full implementation, I would be trained on Aswin's resume, GitHub repositories, and LinkedIn profile to provide detailed answers about his experience, projects, and skills.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  return (
    <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Ask My AI Assistant</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chat with an AI trained on my resume, GitHub projects, and professional profile
          </p>
        </div>

        <Card className="glass border-primary/20">
          <CardHeader className="border-b border-primary/20">
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 text-primary mr-2" />
              Aswin's AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div className={`flex max-w-[80%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isBot
                            ? "bg-primary text-primary-foreground mr-2"
                            : "bg-secondary text-secondary-foreground ml-2"
                        }`}
                      >
                        {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t border-primary/20 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Aswin's experience, skills, or projects..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="glass"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
