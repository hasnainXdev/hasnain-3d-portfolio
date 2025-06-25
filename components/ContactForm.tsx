
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ContactForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const codeSymbolRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Animate the 3D code symbol
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

    // Animate form entrance
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
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
        {/* 3D Code Symbol */}
        <div className="flex justify-center mb-8">
          <div 
            ref={codeSymbolRef}
            className="text-6xl font-mono text-white relative"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(59,130,246,0.3)',
              transform: 'perspective(1000px) rotateX(15deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            &lt;/&gt;
            <div 
              className="absolute inset-0 text-blue-400 opacity-50"
              style={{
                transform: 'translateZ(-10px)',
                filter: 'blur(2px)'
              }}
            >
              &lt;/&gt;
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center mb-6">Let's Connect</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
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
              required
              rows={5}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
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
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;