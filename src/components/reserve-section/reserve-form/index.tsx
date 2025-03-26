"use client"

import {
    Calendar,
    Clock,
    Mail,
    Phone,
    User,
    Users,
  } from 'lucide-react';
  import { useState } from 'react';
  
  export default function ReserveForm() {
    const [formData, setFormData] = useState({
      guests: '',
      name: '',
      date: '',
      email: '',
      time: '',
      phone: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };
  
    const InputWithIcon = ({ id, label, icon, type, placeholder, value, onChange }) => {
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium mb-1">
            {label}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
            <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              className="w-full pl-10 p-2 rounded bg-amber-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    };
  
    return (
      <div className="bg-neutral-400 rounded-lg shadow-md text-black p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div>
            <InputWithIcon
              id="guests"
              label="Number of Guests"
              icon={<Users className="h-5 w-5 text-gray-400" />}
              type="number"
              placeholder="e.g. 4"
              value={formData.guests}
              onChange={handleChange}
            />
            
            <InputWithIcon
              id="name"
              label="Name"
              icon={<User className="h-5 w-5 text-gray-400" />}
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
  
          {/* Column 2 */}
          <div>
            <InputWithIcon
              id="date"
              label="Date"
              icon={<Calendar className="h-5 w-5 text-gray-400" />}
              type="date"
              placeholder="dd/mm/yyyy"
              value={formData.date}
              onChange={handleChange}
            />
            
            <InputWithIcon
              id="email"
              label="Email"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
  
          {/* Column 3 */}
          <div>
            <InputWithIcon
              id="time"
              label="Time"
              icon={<Clock className="h-5 w-5 text-gray-400" />}
              type="time"
              placeholder="--:-- --"
              value={formData.time}
              onChange={handleChange}
            />
            
            <InputWithIcon
              id="phone"
              label="Phone"
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              type="tel"
              placeholder="e.g. 0400 123 456"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </form>
  
        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Reserve Table
          </button>
        </div>
      </div>
    );
  }