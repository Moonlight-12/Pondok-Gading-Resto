"use client";

import { Calendar, Clock, Mail, Phone, User, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { sendReservationEmail } from "@/app/actions/reserve-email";
import { toast, Toaster } from "sonner";

export default function ReserveForm() {
  const [formData, setFormData] = useState({
    guests: "",
    name: "",
    date: "",
    email: "",
    time: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);

  // Reset submission count every hour
  useEffect(() => {
    const resetInterval = setInterval(() => {
      setSubmitCount(0);
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(resetInterval);
  }, []);

  // Countdown timer for blocked status
  useEffect(() => {
    if (isBlocked && blockTimer > 0) {
      const timer = setTimeout(() => {
        setBlockTimer(blockTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (blockTimer === 0 && isBlocked) {
      setIsBlocked(false);
    }
  }, [blockTimer, isBlocked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface SendReservationEmailResult {
    success: boolean;
    message?: string;
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [honeypot, setHoneypot] = useState("");
  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypot(e.target.value);
  };

  const handleSubmit = async (e: SubmitEvent) => {
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
    if (now - lastSubmitTime < 3000) {
      toast.error("Please slow down", {
        description: "You're submitting too quickly.",
      });
      return;
    }

    if (submitCount >= 5) {
      toast.error("Submission limit reached", {
        description:
          "You've reached the maximum number of submissions per hour.",
      });
      setIsBlocked(true);
      setBlockTimer(300);
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast.error("Missing information", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    const guestsNumber = parseInt(formData.guests);
    if (isNaN(guestsNumber) || guestsNumber < 1 || guestsNumber > 10) {
      toast.error("Invalid guest count", {
        description: "Please enter a number between 1 and 10 guests.",
      });
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Invalid date", {
        description: "Please select a date that is today or in the future.",
      });
      return;
    }

    const timeHour = parseInt(formData.time.split(":")[0]);
    const timeMinute = parseInt(formData.time.split(":")[1]);
    const timeInMinutes = timeHour * 60 + timeMinute;
    const openingTimeInMinutes = 10 * 60;
    const closingTimeInMinutes = 19 * 60 + 30;

    if (
      timeInMinutes < openingTimeInMinutes ||
      timeInMinutes > closingTimeInMinutes
    ) {
      toast.error("Invalid time", {
        description: "Our operating hours are 10:00 AM to 7:30 PM.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * 1000) + 500)
      );

      const result: SendReservationEmailResult = await sendReservationEmail(
        formData
      );

      if (result.success) {
        toast.success("Reservation submitted!", {
          description: "We've received your reservation request.",
        });

        setFormData({
          guests: "",
          name: "",
          date: "",
          email: "",
          time: "",
          phone: "",
        });

        setLastSubmitTime(Date.now());
        setSubmitCount((prev) => prev + 1);
      } else {
        toast.error("Something went wrong", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to submit your reservation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md text-neutral-500 p-8 max-w-4xl mx-auto">
      <Toaster position="top-center" />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="hidden">
          <input
            type="text"
            name="website"
            id="website"
            value={honeypot}
            onChange={handleHoneypotChange}
            autoComplete="off"
          />
        </div>

        {/* Column 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-md mb-1 font-bold">
              Number of Guests <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1-10 guests"
                required
              />
            </div>
            <p className="text-xs mt-1 text-gray-400">
              Maximum 10 guests per reservation
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-md mb-1 font-bold">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
                required
                minLength={2}
                maxLength={50}
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-md mb-1 font-bold">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                min={getTodayDate()}
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <p className="text-xs mt-1 text-gray-400">
              Select today or a future date
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-md mb-1 font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@mail.com"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address"
              />
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-md mb-1 font-bold">
              Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="time"
                type="time"
                min="10:00"
                max="19:30"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <p className="text-xs mt-1 text-gray-400">
              Available from 10:00 AM to 7:30 PM
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-md mb-1 font-bold">
              Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. +62-878-555-345"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3 mt-8 text-center">
          <button
            type="submit"
            className={`px-6 py-2 rounded transition ${
              isBlocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isSubmitting || isBlocked}
          >
            {isSubmitting
              ? "Submitting..."
              : isBlocked
              ? `Try again in ${blockTimer}s`
              : "Reserve Table"}
          </button>
        </div>
      </form>
    </div>
  );
}
