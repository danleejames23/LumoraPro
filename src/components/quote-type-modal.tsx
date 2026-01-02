'use client'

import { X, Package, Zap, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface QuoteTypeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteTypeModal({ isOpen, onClose }: QuoteTypeModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">Choose Your Quote Type</h2>
          <p className="text-slate-400 mt-1">Select the best option for your project</p>
        </div>

        {/* Options */}
        <div className="p-6 grid md:grid-cols-2 gap-4">
          {/* Browse Services */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Browse Services</h3>
            <p className="text-sm text-slate-400 mb-4">Choose from our pre-defined packages with fixed pricing</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm text-slate-300">
                <Star className="w-3 h-3 text-cyan-400 mr-2" />
                Fixed pricing
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <Star className="w-3 h-3 text-cyan-400 mr-2" />
                Fast delivery
              </li>
            </ul>
            <Link 
              href="/services" 
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Browse Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Custom Quote */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Custom Quote</h3>
            <p className="text-sm text-slate-400 mb-4">Get a tailored quote for your unique project needs</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm text-slate-300">
                <Star className="w-3 h-3 text-purple-400 mr-2" />
                Custom solutions
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <Star className="w-3 h-3 text-purple-400 mr-2" />
                AI integration
              </li>
            </ul>
            <Link 
              href="/quote" 
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Request Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-400">
            Not sure? <Link href="/contact" onClick={onClose} className="text-cyan-400 hover:text-cyan-300">Contact us</Link> for help
          </p>
        </div>
      </div>
    </div>
  )
}
