'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, Send, CheckCircle, MessageCircle, Clock, ArrowRight, X, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.string().optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState('')
  const { customer } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
        setSelectedProjectType('')
        reset()
      } else {
        alert('Failed to submit inquiry. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    }
  }

  const projectTypes = [
    { id: 'website', label: 'Website' },
    { id: 'webapp', label: 'Web App' },
    { id: 'ai', label: 'AI Integration' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'other', label: 'Other' }
  ]

  if (isSubmitted) {
    return (
      <main className="pt-24 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Message Sent!</h1>
            <p className="text-slate-400 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-10 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              Get In Touch
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Let's Discuss Your Project
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Have a project in mind? Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <a 
              href="mailto:hello@lumora.dev"
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 transition-all text-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium mb-1">Email</h3>
              <p className="text-cyan-400 text-sm">hello@lumora.dev</p>
            </a>
            
            <a 
              href="https://wa.me/447359792577"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 transition-all text-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium mb-1">WhatsApp</h3>
              <p className="text-green-400 text-sm">+44 7359 792 577</p>
            </a>
            
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium mb-1">Response Time</h3>
              <p className="text-cyan-400 text-sm">Within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Send a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {projectTypes.map((type) => (
                    <label key={type.id} className="cursor-pointer">
                      <input
                        {...register('projectType')}
                        type="radio"
                        value={type.id}
                        className="sr-only"
                        onChange={(e) => setSelectedProjectType(e.target.value)}
                      />
                      <div className={`px-3 py-2 text-center text-sm rounded-lg border transition-all ${
                        selectedProjectType === type.id 
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                          : 'border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}>
                        {type.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject *</label>
                <input
                  {...register('subject')}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="What's your project about?"
                />
                {errors.subject && <p className="text-sm text-red-400 mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need a Quick Quote?
          </h2>
          <p className="text-slate-400 mb-6">
            Use our quote form for faster response with pricing estimates.
          </p>
          <Link 
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
          >
            Get Free Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Please login to access live chat support.
                </p>
                <Link 
                  href="/client"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login to Portal
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
