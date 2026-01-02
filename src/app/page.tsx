import Link from 'next/link'
import { services } from '@/data/services'
import { Check, ArrowRight, Clock, Shield, Users, Award, Target, Globe, Paintbrush, Code, Server, Bot, Smartphone, Palette, Brain, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
              Web Development & AI Solutions
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Web Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Built for Results
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              From landing pages to custom AI applications. Fixed pricing, fast delivery, 
              and quality guaranteed on every project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/quote"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
              >
                View Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Fixed Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Free Revisions</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build Section - Icons instead of images */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Websites', icon: Globe, desc: 'From £149' },
              { label: 'Web Apps', icon: Code, desc: 'From £999' },
              { label: 'E-Commerce', icon: Zap, desc: 'From £549' },
              { label: 'AI Solutions', icon: Bot, desc: 'From £299' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-cyan-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Popular Services
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Quality web development with transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="h-full bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {service.icon === 'Target' && <Target className="w-5 h-5" />}
                    {service.icon === 'Globe' && <Globe className="w-5 h-5" />}
                    {service.icon === 'Paintbrush' && <Paintbrush className="w-5 h-5" />}
                    {service.icon === 'Code' && <Code className="w-5 h-5" />}
                    {service.icon === 'Server' && <Server className="w-5 h-5" />}
                    {service.icon === 'Bot' && <Bot className="w-5 h-5" />}
                    {service.icon === 'Smartphone' && <Smartphone className="w-5 h-5" />}
                    {service.icon === 'Palette' && <Palette className="w-5 h-5" />}
                    {service.icon === 'ShoppingCart' && <Zap className="w-5 h-5" />}
                    {service.icon === 'Zap' && <Zap className="w-5 h-5" />}
                    {service.icon === 'Brain' && <Brain className="w-5 h-5" />}
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.timeline}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-baseline mb-4">
                  <span className="text-xl font-bold text-white">£{service.startingPrice.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm ml-1">starting</span>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/quote?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/services"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Why Work With Me
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Professional development with a focus on results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Fixed Pricing',
                description: 'No hidden costs. Clear quotes upfront.'
              },
              {
                icon: Clock,
                title: 'Fast Delivery',
                description: 'Most projects delivered in days, not weeks.'
              },
              {
                icon: Award,
                title: 'Quality Code',
                description: 'Clean, modern, and well-documented.'
              },
              {
                icon: Users,
                title: 'Ongoing Support',
                description: 'Help when you need it, included free.'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get a free quote today. No commitment required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
