import { services } from '@/data/services'
import { Check, ArrowRight, Clock, Shield, Bot, Code, Smartphone, Palette, Server, Brain, Target, Globe, Paintbrush, Zap } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
              Services & Pricing
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Web Development & AI Solutions
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Professional web development services with transparent pricing and fast delivery. 
              From landing pages to custom AI applications.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
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
            </div>

            <Link 
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Categories - Icons */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Websites', icon: Globe, count: 'From £149' },
              { label: 'Web Apps', icon: Code, count: 'From £999' },
              { label: 'E-Commerce', icon: Zap, count: 'From £549' },
              { label: 'AI Solutions', icon: Bot, count: 'From £299' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-cyan-400 text-sm">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="h-full bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {service.icon === 'Target' && <Target className="w-6 h-6" />}
                    {service.icon === 'Globe' && <Globe className="w-6 h-6" />}
                    {service.icon === 'Paintbrush' && <Paintbrush className="w-6 h-6" />}
                    {service.icon === 'Code' && <Code className="w-6 h-6" />}
                    {service.icon === 'Server' && <Server className="w-6 h-6" />}
                    {service.icon === 'ShoppingCart' && <Zap className="w-6 h-6" />}
                    {service.icon === 'Bot' && <Bot className="w-6 h-6" />}
                    {service.icon === 'Zap' && <Zap className="w-6 h-6" />}
                    {service.icon === 'Brain' && <Brain className="w-6 h-6" />}
                    {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                    {service.icon === 'Palette' && <Palette className="w-6 h-6" />}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.timeline}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-white">£{service.startingPrice.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm ml-1">starting</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/quote?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              How It Works
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Simple, transparent process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discuss', description: 'Share your project requirements and goals' },
              { step: '2', title: 'Quote', description: 'Receive a detailed quote with timeline' },
              { step: '3', title: 'Build', description: 'Development with regular updates' },
              { step: '4', title: 'Launch', description: 'Deploy and ongoing support' }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
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
            Get a free quote today. No commitment, just a clear understanding of what we can build together.
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
              Contact Us
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-10 pt-10 border-t border-slate-800">
            <div className="text-center">
              <div className="text-xl font-bold text-white">Fast Delivery</div>
              <div className="text-sm text-slate-500">Most projects in days</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">Fixed Pricing</div>
              <div className="text-sm text-slate-500">No hidden costs</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">Free Revisions</div>
              <div className="text-sm text-slate-500">Until you're happy</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
