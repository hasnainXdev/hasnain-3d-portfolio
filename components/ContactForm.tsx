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

    if (!formData.name || !formData.email || !formData.message) {
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
    } finally {
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
      <div className="bg-gradient-to-bl from-neutral-800 to-neutral-950 backdrop-blur-lg p-8 rounded-2xl">
        <div className="flex justify-center mb-8">
        </div>
        <h3 className="text-5xl font-bold text-center mb-6">
          <span className="bg-clip-text text-transparent border-b-[5px] pb-[1px] border-b-[#7738E0] bg-gradient-to-br from-white/60 via-white/90 to-white/60">
            Want a website...
          </span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
    bg-white/70 
    border border-[#7738E0] 
    text-black/80 
    cursor-none 
    placeholder:font-semibold 
    placeholder-gray-900 
    focus:border-[#7738E0] 
    focus:ring-2 
    focus:ring-[#2E1E58] 
    focus:outline-none
  "
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
              className="bg-white/80 border-gray-600 text-black/80 cursor-none placeholder:font-semibold placeholder-gray-900"
              placeholder="john@example.com"
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
              className="bg-white/80 border-gray-600 text-black/80 cursor-none placeholder:font-semibold placeholder-gray-900"
              placeholder="Tell me about your project..."
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-[#7738E0] to-[#2E1E58] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "0 10px 30px rgba(119,56,224,0.4)",
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "0 0px 0px rgba(119,56,224,0)",
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
