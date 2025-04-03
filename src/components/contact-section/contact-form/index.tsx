"use client";

import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/contact-email";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const [honeypot, setHoneypot] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  
  useEffect(() => {
  
    const storedCount = localStorage.getItem('contactSubmitCount');
    const storedTime = localStorage.getItem('contactLastSubmitTime');
    const storedBlocked = localStorage.getItem('contactIsBlocked');
    const storedBlockTimer = localStorage.getItem('contactBlockTimer');
    
    if (storedCount) setSubmitCount(parseInt(storedCount));
    if (storedTime) setLastSubmitTime(parseInt(storedTime));
    if (storedBlocked) setIsBlocked(storedBlocked === 'true');
    if (storedBlockTimer) setBlockTimer(parseInt(storedBlockTimer));
    
    const resetInterval = setInterval(() => {
      const lastSubmit = parseInt(localStorage.getItem('contactLastSubmitTime') || '0');
      const now = Date.now();
      
      
      if (now - lastSubmit > 60 * 60 * 1000) {
        setSubmitCount(0);
        localStorage.setItem('contactSubmitCount', '0');
      }
    }, 60 * 1000);
    
    return () => clearInterval(resetInterval);
  }, []);
  
  
  useEffect(() => {
    if (isBlocked && blockTimer > 0) {
      const timer = setTimeout(() => {
        const newTime = blockTimer - 1;
        setBlockTimer(newTime);
        localStorage.setItem('contactBlockTimer', newTime.toString());
        
        if (newTime === 0) {
          setIsBlocked(false);
          localStorage.setItem('contactIsBlocked', 'false');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [blockTimer, isBlocked]);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('contactSubmitCount', submitCount.toString());
    localStorage.setItem('contactLastSubmitTime', lastSubmitTime.toString());
    localStorage.setItem('contactIsBlocked', isBlocked.toString());
    localStorage.setItem('contactBlockTimer', blockTimer.toString());
  }, [submitCount, lastSubmitTime, isBlocked, blockTimer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypot(e.target.value);
  };

  interface SendContactResult {
    success: boolean;
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if the form is blocked from submissions
    if (isBlocked) {
      toast.error("Too many attempts", {
        description: `Please try again in ${blockTimer} seconds.`,
      });
      return;
    }
    
    
    if (honeypot) {
    
      console.log("Honeypot triggered");
      setIsBlocked(true);
      setBlockTimer(60);
      return;
    }
    
    
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      toast.error("Please slow down", {
        description: "You're submitting too quickly.",
      });
      return;
    }
    
    
    if (submitCount >= 3) { 
      toast.error("Submission limit reached", {
        description: "You've reached the maximum number of submissions per hour.",
      });
      setIsBlocked(true);
      setBlockTimer(600);
      return;
    }

    
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Missing information", {
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format", {
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    
    if (formData.message.length < 10) {
      toast.error("Message too short", {
        description: "Please provide a more detailed message.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      
      await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000) + 500));
      
      const result: SendContactResult = await sendContactEmail(
        formData
      );

      if (result.success) {
        toast.success("Message Submitted!", {
          description: "We've received your feedback. Thank you!",
        });

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
        
        
        setLastSubmitTime(Date.now());
        setSubmitCount(prev => prev + 1);
      } else {
        toast.error("Something went wrong", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to submit your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-20 p-6 bg-white rounded-lg shadow-md text-black">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website"
            id="website"
            value={honeypot}
            onChange={handleHoneypotChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="phone">Mobile Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            value={formData.message}
            required
            placeholder="Your message here..."
            rows={4}
            minLength={10}
            maxLength={1000}
            className="w-full border p-2 rounded"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length}/1000 characters
          </p>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting || isBlocked}
            className={`px-4 py-2 rounded transition ${
              isBlocked || isSubmitting
                ? "bg-indigo-400 cursor-not-allowed text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isSubmitting 
              ? "Sending..." 
              : isBlocked 
                ? `Try again in ${blockTimer}s` 
                : "Send Email"
            }
          </button>
          
          {submitCount > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              You have used {submitCount}/3 submissions this hour.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}