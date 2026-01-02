export interface ServicePackage {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  deliveryTime: string
  popular?: boolean
  category: 'website' | 'ecommerce' | 'webapp' | 'mobile' | 'ai' | 'custom'
  complexity: 'basic' | 'standard' | 'premium'
  icon: string
  color: string
}

export const servicePackages: ServicePackage[] = [
  // Website Packages
  {
    id: 'basic-landing',
    name: 'Landing Page',
    description: 'Perfect for startups and small businesses',
    price: 149,
    originalPrice: 249,
    features: [
      'Single page responsive design',
      'Contact form integration',
      'Mobile optimized',
      'Basic SEO setup',
      'Social media links',
      '2 revision rounds'
    ],
    deliveryTime: '1-2 days',
    category: 'website',
    complexity: 'basic',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Multi-page website for established businesses',
    price: 349,
    originalPrice: 499,
    features: [
      'Up to 5 pages',
      'Custom responsive design',
      'Contact forms & maps',
      'SEO optimization',
      'Analytics setup',
      'Content management',
      '3 revision rounds'
    ],
    deliveryTime: '3-5 days',
    popular: true,
    category: 'website',
    complexity: 'standard',
    icon: '🏢',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'premium-website',
    name: 'Premium Website',
    description: 'Advanced website with custom features',
    price: 599,
    originalPrice: 799,
    features: [
      'Up to 10 pages',
      'Custom animations',
      'Advanced SEO',
      'Performance optimization',
      'Security features',
      'Blog system',
      'Admin dashboard',
      'Unlimited revisions'
    ],
    deliveryTime: '5-7 days',
    category: 'website',
    complexity: 'premium',
    icon: '✨',
    color: 'from-amber-500 to-orange-500'
  },

  // E-commerce Packages
  {
    id: 'starter-shop',
    name: 'Starter Shop',
    description: 'Get your products online quickly',
    price: 299,
    originalPrice: 449,
    features: [
      'Up to 25 products',
      'Stripe/PayPal integration',
      'Basic inventory',
      'Order notifications',
      'Mobile responsive',
      '2 revision rounds'
    ],
    deliveryTime: '3-5 days',
    category: 'ecommerce',
    complexity: 'basic',
    icon: '🛍️',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'business-shop',
    name: 'Business Shop',
    description: 'Full-featured online store for growing businesses',
    price: 549,
    originalPrice: 749,
    features: [
      'Up to 100 products',
      'Multi-payment options',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Discount codes',
      'Analytics dashboard',
      '3 revision rounds'
    ],
    deliveryTime: '5-7 days',
    popular: true,
    category: 'ecommerce',
    complexity: 'standard',
    icon: '🛒',
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 'advanced-ecommerce',
    name: 'Advanced E-commerce',
    description: 'Enterprise-level online store',
    price: 899,
    originalPrice: 1199,
    features: [
      'Unlimited products',
      'Multi-payment gateways',
      'Advanced inventory',
      'Discount & coupon system',
      'Email marketing integration',
      'Advanced analytics',
      'Multi-currency support',
      'Admin dashboard',
      'Unlimited revisions'
    ],
    deliveryTime: '7-10 days',
    category: 'ecommerce',
    complexity: 'premium',
    icon: '🏪',
    color: 'from-indigo-500 to-purple-500'
  },

  // Web App Packages
  {
    id: 'basic-webapp',
    name: 'Basic Web App',
    description: 'Simple web application with core features',
    price: 499,
    originalPrice: 699,
    features: [
      'User authentication',
      'Database integration',
      'Basic dashboard',
      'Responsive design',
      'Cloud deployment',
      '3 revision rounds'
    ],
    deliveryTime: '5-7 days',
    category: 'webapp',
    complexity: 'standard',
    icon: '💻',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'custom-webapp',
    name: 'Custom Web App',
    description: 'Tailored web application for your business',
    price: 999,
    originalPrice: 1299,
    features: [
      'Custom functionality',
      'User authentication & roles',
      'Database integration',
      'API development',
      'Admin panel',
      'Real-time features',
      'Cloud deployment',
      '30 days support'
    ],
    deliveryTime: '7-14 days',
    popular: true,
    category: 'webapp',
    complexity: 'premium',
    icon: '⚙️',
    color: 'from-red-500 to-pink-500'
  },

  // Mobile App Packages
  {
    id: 'mobile-app-basic',
    name: 'Mobile App Basic',
    description: 'Cross-platform mobile app with essential features',
    price: 799,
    originalPrice: 999,
    features: [
      'iOS & Android (React Native)',
      'Up to 5 screens',
      'User authentication',
      'Push notifications',
      'Basic backend',
      'App store submission guide',
      '30 days support'
    ],
    deliveryTime: '7-10 days',
    category: 'mobile',
    complexity: 'standard',
    icon: '📱',
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 'mobile-app-premium',
    name: 'Mobile App Premium',
    description: 'Full-featured iOS and Android application',
    price: 1499,
    originalPrice: 1999,
    features: [
      'iOS & Android apps',
      'Unlimited screens',
      'Push notifications',
      'Offline functionality',
      'App store submission',
      'Backend integration',
      'Analytics tracking',
      'Admin dashboard',
      '60 days support'
    ],
    deliveryTime: '14-21 days',
    popular: true,
    category: 'mobile',
    complexity: 'premium',
    icon: '📲',
    color: 'from-violet-500 to-purple-500'
  },

  // AI Services Packages
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Intelligent chatbot for customer support & engagement',
    price: 299,
    originalPrice: 449,
    features: [
      'Custom AI training on your data',
      'Natural language processing',
      'Website integration',
      'Lead capture forms',
      'Conversation analytics',
      'Easy customization',
      '30 days support'
    ],
    deliveryTime: '2-4 days',
    popular: true,
    category: 'ai',
    complexity: 'standard',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'ai-app-integration',
    name: 'AI Integration',
    description: 'Add AI capabilities to your existing applications',
    price: 449,
    originalPrice: 599,
    features: [
      'GPT/Claude API integration',
      'Custom AI workflows',
      'Content generation',
      'Document processing',
      'API development',
      'Documentation',
      '30 days support'
    ],
    deliveryTime: '3-5 days',
    category: 'ai',
    complexity: 'standard',
    icon: '🧠',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    description: 'Automate business processes with AI',
    price: 699,
    originalPrice: 899,
    features: [
      'Custom AI agent development',
      'Process automation',
      'Data extraction & analysis',
      'Scheduled operations',
      'Integration with existing systems',
      'Performance monitoring',
      '60 days support'
    ],
    deliveryTime: '5-7 days',
    category: 'ai',
    complexity: 'premium',
    icon: '⚡',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'custom-ai-solution',
    name: 'Custom AI Solution',
    description: 'Bespoke AI application tailored to your needs',
    price: 1299,
    originalPrice: 1699,
    features: [
      'Full AI application development',
      'Custom model training',
      'Advanced analytics',
      'Scalable cloud deployment',
      'Admin dashboard',
      'API documentation',
      '90 days support'
    ],
    deliveryTime: '10-14 days',
    category: 'ai',
    complexity: 'premium',
    icon: '🚀',
    color: 'from-orange-500 to-red-500'
  },

  // Quick Services
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    description: 'Refresh your existing website',
    price: 249,
    originalPrice: 399,
    features: [
      'Modern design update',
      'Mobile optimization',
      'Speed improvements',
      'SEO enhancements',
      'Content migration',
      '2 revision rounds'
    ],
    deliveryTime: '2-4 days',
    category: 'website',
    complexity: 'standard',
    icon: '🎨',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'maintenance-package',
    name: 'Website Maintenance',
    description: 'Monthly website maintenance and updates',
    price: 79,
    features: [
      'Security updates',
      'Content updates (up to 5/month)',
      'Performance monitoring',
      'Backup management',
      'Priority support',
      'Monthly reports'
    ],
    deliveryTime: 'Monthly',
    category: 'custom',
    complexity: 'basic',
    icon: '🔧',
    color: 'from-gray-500 to-slate-500'
  },
  {
    id: 'seo-package',
    name: 'SEO Optimization',
    description: 'Boost your search engine rankings',
    price: 199,
    originalPrice: 299,
    features: [
      'Technical SEO audit',
      'On-page optimization',
      'Meta tags & descriptions',
      'Site speed optimization',
      'Google Search Console setup',
      'SEO report'
    ],
    deliveryTime: '2-3 days',
    category: 'custom',
    complexity: 'basic',
    icon: '🔍',
    color: 'from-green-500 to-teal-500'
  }
]

export const getPackagesByCategory = (category: ServicePackage['category']) => {
  return servicePackages.filter(pkg => pkg.category === category)
}

export const getPackageById = (id: string) => {
  return servicePackages.find(pkg => pkg.id === id)
}

export const getPopularPackages = () => {
  return servicePackages.filter(pkg => pkg.popular)
}
