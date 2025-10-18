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
      <div className="bg-[#0d121d] border border-white/10 backdrop-blur-md p-8 rounded-2xl">
        <h3 className="text-3xl md:text-5xl tracking-tight font-bold text-center mb-8 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7738E0] to-[#fff]">
            Let’s Ship Something 
          </span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-200 mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
                bg-white/10 
                border border-white/20 
                text-white 
                placeholder:text-gray-400 
                rounded-lg 
                focus:border-[#7738E0] 
                focus:ring-2 
                focus:ring-[#7738E0]/40 
                transition-all 
                duration-300
              "
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-200 mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="
                bg-white/10 
                border border-white/20 
                text-white 
                placeholder:text-gray-400 
                rounded-lg 
                focus:border-[#7738E0] 
                focus:ring-2 
                focus:ring-[#7738E0]/40 
                transition-all 
                duration-300
              "
              placeholder="john@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-gray-200 mb-2 block">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="
                bg-white/10 
                border border-white/20 
                text-white 
                placeholder:text-gray-400 
                rounded-lg 
                focus:border-[#7738E0] 
                focus:ring-2 
                focus:ring-[#7738E0]/40 
                transition-all 
                duration-300
              "
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit */}
          <Button
            disabled={loading}
            type="submit"
            className="
              w-full 
              bg-gradient-to-r from-[#7738E0] to-[#7738E0]/50 
              text-white 
              px-6 py-3 
              rounded-lg 
              font-semibold 
              hover:opacity-90 
              transition-all 
              duration-300 
              transform 
              hover:scale-105
              mt-8
            "
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.2,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
              });
            }}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
