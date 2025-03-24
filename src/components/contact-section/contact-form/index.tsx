"use client"

import { useRef } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
    const formRef = useRef(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        emailjs.sendForm(
            "your_service_id",     
            "your_template_id",    
            formRef.current!,
            "your_user_id"        
        )
        .then(() => {
            alert("Message sent successfully!");
        }, (error) => {
            alert("Failed to send message: " + error.text);
        });
    };

    return (
        <div className="relative z-20 p-6 bg-white rounded-lg shadow-md text-black">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" name="first_name" required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" name="last_name" required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="tel" name="mobile" required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea name="message" rows={4} className="w-full border p-2 rounded"></textarea>
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Send Email
                </button>
            </form>
        </div>
    );
}
