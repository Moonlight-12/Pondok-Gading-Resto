"use client"

import { Calendar, Clock, Mail, Phone, User, Users } from "lucide-react"
import { useState } from "react"
import { sendReservationEmail } from "@/app/actions/email"
import { toast, Toaster } from "sonner"

export default function ReserveForm() {
  const [formData, setFormData] = useState({
    guests: "",
    name: "",
    date: "",
    email: "",
    time: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use a different approach for handling input changes
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.guests) {
      toast.error("Missing information", {
        description: "Please fill in all required fields.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Send the email using the server action
      const result = await sendReservationEmail(formData)

      if (result.success) {
        toast.success("Reservation submitted!", {
          description: "We've received your reservation request.",
        })

        // Reset the form
        setFormData({
          guests: "",
          name: "",
          date: "",
          email: "",
          time: "",
          phone: "",
        })
      } else {
        toast.error("Something went wrong", {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to submit your reservation. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-neutral-400 rounded-lg shadow-md text-black p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Reservation</h2>
      <Toaster position="top-center" />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-sm font-medium mb-1">
              Number of Guests <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 4"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
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
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
                required
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
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
                className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 0400 123 456"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3 mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Reserve Table"}
          </button>
        </div>
      </form>
    </div>
  )
}

