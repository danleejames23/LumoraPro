'use client'

import { useState, useEffect } from 'react'
import { Bot, X, MessageCircle, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer: "Most projects are completed within 7-30 days depending on complexity. I provide exact timelines with each quote."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! All projects include 30 days of free support, with optional maintenance packages available."
  },
  {
    question: "What technologies do you use?",
    answer: "I specialize in React, Next.js, Node.js, Python, and AI integration. Full tech stack available on request."
  },
  {
    question: "How does pricing work?",
    answer: "Fixed pricing based on project scope. No hidden fees, no surprises. Get a free quote to see exact costs."
  },
  {
    question: "Can you integrate AI into my project?",
    answer: "Absolutely! I specialize in AI integration including chatbots, automation, and intelligent features."
  }
]

export default function AIAssistantBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* AI Assistant Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 shadow-lg hover:bg-slate-700 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center"
        >
          <Bot className="w-6 h-6 text-cyan-400" />
        </button>
      </div>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-2xl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Assistant</h3>
                    <p className="text-sm text-slate-400">Quick answers to common questions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                      className="w-full text-left p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{faq.question}</span>
                        <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${selectedFaq === index ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    {selectedFaq === index && (
                      <div className="mt-2 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <p className="text-sm text-slate-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <Link 
                  href="/quote"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Directly
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
