"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Star,
  Users,
  Shield,
  BarChart3,
  BookOpen,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Play,
  Download,
  Smartphone,
} from "lucide-react"

export default function MarketingPage() {
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [paymentMethod, setPaymentMethod] = useState("mpesa")

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Student Management",
      description: "Complete student records, enrollment, and tracking system",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Academic Management",
      description: "Grades, assessments, curriculum, and academic reporting",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Financial Management",
      description: "Fee collection, invoicing, and financial analytics",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Reports",
      description: "Comprehensive insights and data visualization",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Backup",
      description: "Data protection, automated backups, and security",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Access",
      description: "Mobile-friendly interface for all user types",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "KSh 15,000",
      period: "/month",
      description: "Perfect for small schools up to 200 students",
      features: [
        "Up to 200 students",
        "Basic student management",
        "Fee collection",
        "Basic reports",
        "Email support",
        "Mobile access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "KSh 35,000",
      period: "/month",
      description: "Ideal for medium schools up to 800 students",
      features: [
        "Up to 800 students",
        "Complete student management",
        "Advanced fee management",
        "Analytics dashboard",
        "Transport management",
        "Library management",
        "Priority support",
        "Mobile app access",
        "Data backup",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "KSh 65,000",
      period: "/month",
      description: "For large schools with unlimited students",
      features: [
        "Unlimited students",
        "All features included",
        "Custom integrations",
        "Advanced analytics",
        "Multi-campus support",
        "24/7 phone support",
        "Custom training",
        "Dedicated account manager",
        "Custom branding",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Dr. Mary Wanjiku",
      role: "Principal, Nairobi Academy",
      content:
        "EDUBORA has transformed how we manage our school. The system is intuitive and has saved us countless hours.",
      rating: 5,
    },
    {
      name: "John Kamau",
      role: "Administrator, Mombasa Primary",
      content:
        "The financial management features have streamlined our fee collection process. Parents love the mobile payment options.",
      rating: 5,
    },
    {
      name: "Grace Akinyi",
      role: "Teacher, Kisumu Girls School",
      content: "Managing grades and assignments has never been easier. The system helps me focus more on teaching.",
      rating: 4,
    },
  ]

  const handlePayment = (plan) => {
    // Simulate payment processing
    alert(`Processing payment for ${plan.name} plan via ${paymentMethod}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EDUBORA</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline">Login</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Complete School Management
            <span className="text-blue-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your school operations with our comprehensive management system. From student records to
            financial management, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              <Download className="mr-2 h-5 w-5" />
              Free Trial
            </Button>
          </div>
          <div className="mt-12">
            <img
              src="/placeholder.svg?height=600&width=1000"
              alt="EDUBORA Dashboard"
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Manage Your School</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform covers all aspects of school management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible pricing to fit schools of all sizes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow ${plan.popular ? "ring-2 ring-blue-600" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">
                    {plan.price}
                    <span className="text-lg text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePayment(plan)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Payment Options</h2>
            <p className="text-lg text-gray-600">Pay securely using your preferred method</p>
          </div>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
              <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
            </TabsList>
            <TabsContent value="mpesa" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    Pay with M-Pesa
                  </CardTitle>
                  <CardDescription>Secure mobile money payment via Safaricom M-Pesa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="254712345678" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Pay with M-Pesa</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="card" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Pay with Card
                  </CardTitle>
                  <CardDescription>Secure payment with Visa, Mastercard, or other cards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiry</label>
                      <Input placeholder="MM/YY" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <Input placeholder="123" className="w-24" />
                  </div>
                  <Button className="w-full">Pay Securely</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by schools across Kenya</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to transform your school management? Contact us for a personalized demo.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span>+254 712 345 678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span>info@edubora.co.ke</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Request a Demo</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="john@school.co.ke" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">School Name</label>
                  <Input placeholder="Your School Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Students</label>
                  <Input placeholder="e.g., 500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Tell us about your requirements..." />
                </div>
                <Button className="w-full">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">EDUBORA</span>
              </div>
              <p className="text-gray-400">Empowering schools with comprehensive management solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EDUBORA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
