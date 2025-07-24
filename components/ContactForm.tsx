"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Button } from './ui/button';

const ContactForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const codeSymbolRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (codeSymbolRef.current) {
      gsap.to(codeSymbolRef.current, {
        rotationY: 360,
        duration: 8,
        repeat: -1,
        ease: "none"
      });

      gsap.to(codeSymbolRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!formData.name || !formData.email || !formData.message) {
      toast.info("All fieilds are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      }

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to send message.");
      }
    } catch (error) {
      toast.warning("Error sending message.");
    }finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div ref={formRef} className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg p-8 rounded-2xl border border-gray-700">
        <div className="flex justify-center mb-8">
        </div>

        <h3 className="text-3xl font-bold text-center mb-6">Want a website ?<br /> Contact me</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <Button
          disabled={loading}
            type="submit"
            className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "0 0px 0px rgba(255,255,255,0)",
                duration: 0.3
              });
            }}
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
