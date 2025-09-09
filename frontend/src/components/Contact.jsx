import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data?.email || 'albeejohnwwe@gmail.com',
      href: `mailto:${data?.email || 'albeejohnwwe@gmail.com'}`,
      color: 'blue'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data?.phone || '+91 8943785705',
      href: `tel:${data?.phone || '+918943785705'}`,
      color: 'green'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data?.location || 'Kollam, Kerala',
      href: '#',
      color: 'purple'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: data?.social?.linkedin || '#', label: 'LinkedIn', color: 'blue' },
    { icon: Github, href: data?.social?.github || '#', label: 'GitHub', color: 'gray' },
    { icon: Twitter, href: data?.social?.twitter || '#', label: 'Twitter', color: 'cyan' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="contact" className="py-20 bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on exciting data science projects or discuss opportunities in analytics and machine learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, innovative projects, or just having a chat about technology and data science. Feel free to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <a 
                      href={method.href}
                      className="flex items-center gap-4"
                      onClick={method.label === 'Location' ? (e) => e.preventDefault() : undefined}
                    >
                      <div className={`p-3 rounded-lg ${getColorClasses(method.color)} group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{method.label}</h4>
                        <p className="text-gray-300">{method.value}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 rounded-lg ${getColorClasses(social.color)} hover:scale-110 transition-all duration-300 border`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="text-white font-medium">Currently Available</h4>
                    <p className="text-gray-300 text-sm">Open to new opportunities and exciting projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-700/30 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400 focus:border-blue-400"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;