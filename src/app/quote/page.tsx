'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getPackageById } from '@/data/service-packages'
import { services as fallbackServices } from '@/data/services'
import { formatCurrency } from '@/lib/utils'
import { CheckCircle, Clock, ArrowRight, Zap, Star, Shield, Calculator, Sparkles, Users, MessageSquare, Send, Target, Globe, Paintbrush, Code, Server, Bot, Smartphone, Palette, Brain } from 'lucide-react'
import QuoteConfirmationModal from '@/components/quote-confirmation-modal'
import { useAuth } from '@/contexts/auth-context'

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  company: z.string().optional(),
  projectName: z.string().min(2, 'Project name must be at least 2 characters').optional(),
  description: z.string().min(50, 'Please provide a detailed description of your requirements (minimum 50 characters)').optional(),
  rushDelivery: z.enum(['standard', 'priority', 'express']).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export default function QuotePage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('package')
  const serviceId = searchParams.get('service')
  const selectedPackage = packageId ? getPackageById(packageId) : null
  const [selectedService, setSelectedService] = useState<any>(null)
  const { customer, isLoading } = useAuth()

  // Fetch service details if serviceId is provided
  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        try {
          const response = await fetch('/api/services')
          const data = await response.json()
          let service = null
          
          if (data.success && data.services) {
            service = data.services.find((s: any) => s.id === serviceId)
          }
          
          // Fallback to static services if not found in database
          if (!service) {
            service = fallbackServices.find(s => s.id === serviceId)
          }
          
          setSelectedService(service)
        } catch (error) {
          console.error('Error fetching service, using fallback:', error)
          // Use fallback services
          const service = fallbackServices.find(s => s.id === serviceId)
          setSelectedService(service)
        }
      }
      fetchService()
    }
  }, [serviceId])
  
  const [rushDelivery, setRushDelivery] = useState<'standard' | 'priority' | 'express'>('standard')
  const [finalCost, setFinalCost] = useState(0)
  const [finalTimeline, setFinalTimeline] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [quoteResult, setQuoteResult] = useState<{
    quote: any
    customer: any
    tempPassword: string
  } | null>(null)

  const rushDeliveryOptions = {
    standard: { 
      label: 'Standard Delivery', 
      cost: 0, 
      description: 'Normal delivery timeline',
      icon: '📅',
      timeReduction: 0
    },
    priority: { 
      label: 'Priority Delivery', 
      cost: 49, 
      description: '25% faster delivery',
      icon: '⚡',
      timeReduction: 0.25
    },
    express: { 
      label: 'Express Delivery', 
      cost: 99, 
      description: '50% faster delivery',
      icon: '🚀',
      timeReduction: 0.5
    },
  }

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      rushDelivery: 'standard',
    }
  })

  // Package/Service pre-selection effect
  useEffect(() => {
    if (selectedPackage) {
      // Calculate final cost with rush delivery
      const rushCost = rushDeliveryOptions[rushDelivery].cost
      setFinalCost(selectedPackage.price + rushCost)
      
      // Calculate timeline with rush delivery reduction
      const timelineParts = selectedPackage.deliveryTime.split('-')
      const minDays = parseInt(timelineParts[0]) || 1
      const maxDays = parseInt(timelineParts[1]) || minDays + 2
      
      const timeReduction = rushDeliveryOptions[rushDelivery].timeReduction
      const reducedMin = Math.max(1, Math.ceil(minDays * (1 - timeReduction)))
      const reducedMax = Math.max(reducedMin + 1, Math.ceil(maxDays * (1 - timeReduction)))
      
      setFinalTimeline(`${reducedMin}-${reducedMax} days`)
      
      // Pre-fill description with package info
      setValue('description', `I'm interested in the ${selectedPackage.name} package. ${selectedPackage.description}\n\nAdditional requirements:`)
    } else if (selectedService) {
      // Calculate final cost with rush delivery for service
      const rushCost = rushDeliveryOptions[rushDelivery].cost
      setFinalCost(selectedService.startingPrice + rushCost)
      
      // Calculate timeline with rush delivery reduction for service
      const timelineParts = selectedService.timeline.split('-')
      const minDays = parseInt(timelineParts[0]) || 1
      const maxDays = parseInt(timelineParts[1]) || minDays + 2
      
      const timeReduction = rushDeliveryOptions[rushDelivery].timeReduction
      const reducedMin = Math.max(1, Math.ceil(minDays * (1 - timeReduction)))
      const reducedMax = Math.max(reducedMin + 1, Math.ceil(maxDays * (1 - timeReduction)))
      
      setFinalTimeline(`${reducedMin}-${reducedMax} days`)
      
      // Pre-fill description with service info
      setValue('description', `I'm interested in the ${selectedService.title} service. ${selectedService.description}\n\nAdditional requirements:`)
    } else {
      // Reset for custom quotes
      setFinalCost(0)
      setFinalTimeline('5-15 days') // Default timeline for custom quotes
    }
  }, [selectedPackage, selectedService, rushDelivery, setValue])

  const handleRushDeliveryChange = (option: 'standard' | 'priority' | 'express') => {
    setRushDelivery(option)
    setValue('rushDelivery', option)
  }

  // Function to calculate custom quote cost in real-time
  const calculateCustomQuote = (description: string) => {
    if (selectedPackage || selectedService) return finalCost // Use package/service calculation if selected
    
    if (!description) return 0
    
    const wordCount = description.split(' ').length
    
    // Base cost calculation
    let baseCost = 299
    
    // Add cost based on complexity indicators
    if (description.toLowerCase().includes('complex') || description.toLowerCase().includes('advanced')) {
      baseCost += 200
    }
    if (description.toLowerCase().includes('api') || description.toLowerCase().includes('database')) {
      baseCost += 150
    }
    if (description.toLowerCase().includes('design') || description.toLowerCase().includes('ui')) {
      baseCost += 100
    }
    if (description.toLowerCase().includes('mobile') || description.toLowerCase().includes('responsive')) {
      baseCost += 100
    }
    
    // Add cost based on description length
    if (wordCount > 100) baseCost += 100
    if (wordCount > 200) baseCost += 200
    
    // Add rush delivery cost
    const rushCost = rushDeliveryOptions[rushDelivery].cost
    return baseCost + rushCost
  }

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const { createQuoteAndAccount, sendWelcomeEmail, sendAdminNotification } = await import('@/lib/quote-client')
      
      // Calculate custom quote cost if no package selected
      let calculatedCost = finalCost
      let calculatedTimeline = finalTimeline
      
      // For package or service quotes, use the displayed finalCost and finalTimeline
      if (selectedPackage || selectedService) {
        calculatedCost = finalCost
        calculatedTimeline = finalTimeline
        console.log('📦 Package/Service Quote:', {
          packageName: selectedPackage?.name || selectedService?.title,
          displayedCost: finalCost,
          submittedCost: calculatedCost,
          rushDelivery: data.rushDelivery
        })
      } else if (data.description) {
        // Only run custom calculation for non-package quotes
        const descriptionLength = data.description.length
        const wordCount = data.description.split(' ').length
        
        // Base cost calculation (you can adjust these values)
        let baseCost = 299 // Starting price for custom quotes
        
        // Add cost based on complexity indicators
        if (data.description.toLowerCase().includes('complex') || data.description.toLowerCase().includes('advanced')) {
          baseCost += 200
        }
        if (data.description.toLowerCase().includes('api') || data.description.toLowerCase().includes('database')) {
          baseCost += 150
        }
        if (data.description.toLowerCase().includes('design') || data.description.toLowerCase().includes('ui')) {
          baseCost += 100
        }
        if (data.description.toLowerCase().includes('mobile') || data.description.toLowerCase().includes('responsive')) {
          baseCost += 100
        }
        
        // Add cost based on description length (complexity indicator)
        if (wordCount > 100) baseCost += 100
        if (wordCount > 200) baseCost += 200
        
        // Add rush delivery cost
        const rushCost = rushDeliveryOptions[rushDelivery].cost
        calculatedCost = baseCost + rushCost
        
        // Calculate timeline based on complexity
        let baseTimeline = 10 // Base days for custom quotes
        if (data.description.toLowerCase().includes('complex') || data.description.toLowerCase().includes('advanced')) {
          baseTimeline += 5
        }
        if (data.description.toLowerCase().includes('api') || data.description.toLowerCase().includes('database')) {
          baseTimeline += 3
        }
        
        // Apply rush delivery reduction
        const timeReduction = rushDeliveryOptions[rushDelivery].timeReduction
        const finalDays = Math.max(3, Math.ceil(baseTimeline * (1 - timeReduction)))
        calculatedTimeline = `${finalDays}-${finalDays + 5} days`
        
        // Update the displayed cost for custom quotes
        setFinalCost(calculatedCost)
        setFinalTimeline(calculatedTimeline)
        console.log('🔧 Custom Quote Calculation:', {
          baseCost: baseCost,
          rushCost: rushDeliveryOptions[rushDelivery].cost,
          finalCalculatedCost: calculatedCost,
          wordCount: wordCount
        })
      }
      
      // Prepare quote data
      console.log('📦 Quote form package debug:', {
        hasSelectedPackage: !!selectedPackage,
        selectedPackage: selectedPackage,
        hasSelectedService: !!selectedService,
        selectedService: selectedService,
        finalCost: finalCost,
        calculatedCost: calculatedCost,
        willSubmitPackage: !!(selectedPackage || selectedService)
      })
      
      // Check if this is just a registration (no project details provided)
      const isRegistrationOnly = !data.projectName && !data.description && !selectedPackage && !selectedService
      
      const quoteData = {
        name: customer?.name || data.name || '',
        email: customer?.email || data.email || '',
        company: customer?.company || data.company || '',
        projectName: data.projectName || (isRegistrationOnly ? 'Account Registration' : ''),
        description: data.description || (isRegistrationOnly ? 'User registered for account access' : ''),
        estimatedCost: isRegistrationOnly ? 0 : calculatedCost,
        estimatedTimeline: isRegistrationOnly ? 'TBD' : calculatedTimeline,
        rushDelivery: data.rushDelivery,
        password: customer ? undefined : data.password, // Only include password for new users
        customerId: customer?.id, // Include customer ID if logged in
        // Include package information if selected (convert service to package format)
        selectedPackage: selectedPackage ? {
          id: selectedPackage.id,
          name: selectedPackage.name,
          price: selectedPackage.price,
          features: selectedPackage.features,
          deliveryTime: selectedPackage.deliveryTime,
          category: selectedPackage.category,
          complexity: selectedPackage.complexity
        } : selectedService ? {
          id: selectedService.id,
          name: selectedService.title,
          price: selectedService.startingPrice,
          features: selectedService.features || [],
          deliveryTime: selectedService.timeline,
          category: selectedService.category,
          complexity: 'standard'
        } : null
      }
      
      console.log('🚀 Submitting quote data:', quoteData)
      
      // Create quote and customer account (if needed)
      const result = await createQuoteAndAccount(quoteData)
      
      // Send notifications
      if (!customer) {
        sendWelcomeEmail(result.customer, result.tempPassword, result.quote)
      }
      sendAdminNotification(result.quote, result.customer)
      
      // Show confirmation modal
      setQuoteResult({
        quote: result.quote,
        customer: result.customer,
        tempPassword: result.tempPassword
      })
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Error submitting quote:', error)
      // Handle error - show error message to user
    }
  }

  if (isSubmitted && quoteResult) {
    return (
      <>
        <main className="pt-16">
          <section className="py-20 relative overflow-hidden opacity-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Processing Your </span>
                <span className="gradient-text">Quote Request</span>
              </h1>
            </div>
          </section>
        </main>
        
        <QuoteConfirmationModal
          isOpen={isSubmitted}
          onClose={() => {
            setIsSubmitted(false)
            setQuoteResult(null)
            // If user is logged in, redirect to dashboard
            if (customer) {
              window.location.href = '/client/dashboard'
            }
          }}
          quoteData={{
            id: quoteResult?.quote?.id || '',
            name: quoteResult?.quote?.name || '',
            email: quoteResult?.quote?.email || '',
            company: quoteResult?.quote?.company,
            estimatedCost: quoteResult?.quote?.estimatedCost || 0,
            estimatedTimeline: quoteResult?.quote?.estimatedTimeline || '',
            description: quoteResult?.quote?.description || ''
          }}
          tempPassword={quoteResult?.tempPassword || ''}
          isLoggedIn={!!customer}
        />
      </>
    )
  }

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="py-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{selectedPackage ? 'Package Quote' : selectedService ? 'Service Quote' : 'Project Quote'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Project Quote</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            {selectedPackage 
              ? `Complete your ${selectedPackage.name} package request.`
              : selectedService
              ? `Complete your ${selectedService.title} service request.`
              : 'Tell us about your project and get a quote.'
            }
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Package/Service Selection Banner */}
        {(selectedPackage || selectedService) && (
          <div className="mb-6 p-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {selectedPackage ? (
                    <span className="text-xl">{selectedPackage.icon}</span>
                  ) : (
                    <>
                      {selectedService?.icon === 'Target' && <Target className="w-6 h-6" />}
                      {selectedService?.icon === 'Globe' && <Globe className="w-6 h-6" />}
                      {selectedService?.icon === 'Code' && <Code className="w-6 h-6" />}
                      {selectedService?.icon === 'Bot' && <Bot className="w-6 h-6" />}
                      {!['Target', 'Globe', 'Code', 'Bot'].includes(selectedService?.icon || '') && <Star className="w-6 h-6" />}
                    </>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {selectedPackage?.name || selectedService?.title} Selected
                  </h3>
                  <p className="text-sm text-slate-400">
                    {selectedPackage?.deliveryTime || selectedService?.timeline}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-bold text-cyan-400">£{finalCost.toLocaleString()}</div>
                <div className="text-xs text-slate-500">
                  {selectedPackage ? 'Package price' : `Starting from £${selectedService?.startingPrice}`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features List (if package/service selected) */}
        {(selectedPackage || selectedService) && (
          <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
            <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Included Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(selectedPackage?.features || selectedService?.features || []).slice(0, 6).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
            {(selectedPackage?.features || selectedService?.features || []).length > 6 && (
              <p className="text-xs text-slate-500 mt-2">
                +{(selectedPackage?.features || selectedService?.features || []).length - 6} more features included
              </p>
            )}
          </div>
        )}

        {/* Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Contact Information */}
            {!isLoading && !customer && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                    <Input
                      {...register('name')}
                      placeholder="Your full name"
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                    />
                    {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                    />
                    {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
                    <Input
                      {...register('company')}
                      placeholder="Your company name"
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password *</label>
                    <Input
                      {...register('password')}
                      type="password"
                      placeholder="Create account password"
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                    />
                    {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Speed */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Delivery Speed
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(rushDeliveryOptions).map(([key, option]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleRushDeliveryChange(key as 'standard' | 'priority' | 'express')}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      rushDelivery === key
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium text-white text-sm">{option.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{option.description}</div>
                    <div className={`text-sm font-bold mt-2 ${rushDelivery === key ? 'text-cyan-400' : 'text-slate-300'}`}>
                      {option.cost === 0 ? 'Included' : `+£${option.cost}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Project Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Name</label>
                <Input
                  {...register('projectName')}
                  placeholder="e.g., Company Website Redesign"
                  className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Description</label>
                <Textarea
                  {...register('description')}
                  rows={5}
                  className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500 resize-none"
                  placeholder="Describe your project requirements..."
                />
              </div>
            </div>

            {/* Quote Summary */}
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400">Quote Summary</span>
                <Calculator className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">{selectedPackage ? 'Package' : selectedService ? 'Service' : 'Base'} Price</span>
                  <span className="text-white">£{(selectedPackage?.price || selectedService?.startingPrice || 299).toLocaleString()}</span>
                </div>
                {rushDeliveryOptions[rushDelivery].cost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rush Delivery</span>
                    <span className="text-white">+£{rushDeliveryOptions[rushDelivery].cost}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-700">
                  <span className="font-medium text-white">Total</span>
                  <span className="text-xl font-bold text-cyan-400">
                    £{(selectedPackage ? finalCost : selectedService ? finalCost : calculateCustomQuote(watch('description') || '')).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{finalTimeline || '5-15 days'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>No hidden fees</span>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold">
              <Send className="w-4 h-4 mr-2" />
              Submit Quote Request
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
