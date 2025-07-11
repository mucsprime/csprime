"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "@/components/LoadingSpinner";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "I'm your Maynooth CS Assistant. Ask me anything about Computer Science modules!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || response.statusText);
      }

      const data = await response.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.answer || "I couldn't find an answer to that question.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      console.error("API Error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, something went wrong: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-gray-50">
      <header className="w-full bg-blue-600 text-white p-4 text-center shadow-md">
        <h1 className="text-xl font-bold">Maynooth CS Module Assistant</h1>
      </header>

      <div className="flex flex-col p-4 max-w-4xl w-full h-full">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg shadow-inner p-4">
          {messages
            .filter((m) => m.role !== "system")
            .map((message, i) => (
              <div
                key={i}
                className={`flex mb-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg markdown ${
                    message.role === "user"
                      ? "bg-blue-100 rounded-br-none"
                      : "bg-green-100 rounded-bl-none"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}{" "}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Thinking about your question...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask about CS modules like CS201, CS211..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Ask"}
          </button>
        </form>

        <div className="mt-2 text-center text-sm text-gray-500">
          Ask about modules, professors, or course content at Maynooth
          University
        </div>
      </div>
    </div>
  );
}
