'use client';

import { Phone, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactActionButtonsProps {
  phone: string;
  name?: string;
  email?: string;
  variant?: 'default' | 'outline';
  className?: string;
}

export function ContactActionButtons({ 
  phone, 
  name, 
  email,
  variant = 'outline',
  className = ''
}: ContactActionButtonsProps) {
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

  const handleEmail = () => {
    if (!email) {
      console.error('Email is required');
      return;
    }
    
    try {
      window.location.href = `mailto:${email}`;
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {phone && (
        <>
          <Button 
            variant={variant} 
            className="w-full justify-start"
            onClick={handleCall}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call {name ? name.split(' ')[0] : ''}
          </Button>
          <Button 
            variant={variant} 
            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </>
      )}
      
      {email && (
        <Button 
          variant={variant} 
          className="w-full justify-start"
          onClick={handleEmail}
        >
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
      )}
    </div>
  );
}
