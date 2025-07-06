'use client';

import { Phone, MessageCircle } from 'lucide-react';

interface ContactActionsProps {
  phone: string;
  name?: string;
}

export function ContactActions({ phone, name }: ContactActionsProps) {
  const handleCall = () => {
    if (!phone) {
      console.error('Phone number is required');
      return;
    }
    
    try {
      console.log('Calling:', phone);
      const phoneNumber = phone.replace(/[^0-9+]/g, '');
      window.location.href = `tel:${phoneNumber}`;
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  const handleWhatsApp = () => {
    if (!phone) {
      console.error('Phone number is required');
      return;
    }
    
    try {
      console.log('Opening WhatsApp for:', phone);
      const phoneNumber = phone.replace(/[^0-9+]/g, '');
      const firstName = name?.trim().split(' ')[0] || 'there';
      const message = `Hi ${encodeURIComponent(firstName)},`;
      
      window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        '_blank',
        'noopener,noreferrer'
      );
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCall}
        className="flex items-center gap-1 text-green-700 hover:text-green-800 hover:underline font-medium text-base"
      >
        <Phone className="h-4 w-4" />
        {phone}
      </button>
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </button>
    </div>
  );
}
