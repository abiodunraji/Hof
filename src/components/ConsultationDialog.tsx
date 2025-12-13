import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { Calendar, Building2, User, Phone, Mail, Briefcase } from 'lucide-react';

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: 'interiors' | 'construction';
}

export function ConsultationDialog({ open, onOpenChange, serviceType = 'interiors' }: ConsultationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phoneNumber: '',
    serviceNeeded: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const prewrittenMessage = serviceType === 'interiors' 
    ? "Hello! I'm interested in your interior design services. I would love to discuss how we can transform my space into something beautiful and functional."
    : "Hello! I'm interested in your construction services. I would like to discuss my upcoming project and get a professional quote.";

  const validateNigerianPhone = (phone: string) => {
    // Remove any spaces or dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');
    // Should be 10 digits after +234
    return /^\d{10}$/.test(cleanPhone);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validateNigerianPhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Nigerian phone number';
    }

    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = 'Please select a service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success - submit the form
    console.log('Form submitted:', {
      ...formData,
      phoneNumber: `+234${formData.phoneNumber}`,
      message: formData.message || prewrittenMessage,
    });

    toast.success('Consultation request submitted!', {
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form and close dialog
    setFormData({
      name: '',
      company: '',
      email: '',
      phoneNumber: '',
      serviceNeeded: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const interiorServices = [
    'Residential Interior Design',
    'Commercial Interior Design',
    'Space Planning & Layout',
    'Color Consultation',
    'Furniture Selection',
    'Complete Home Makeover',
    'Single Room Design',
    'Other',
  ];

  const constructionServices = [
    'New Construction',
    'Home Renovation',
    'Commercial Building',
    'Remodeling',
    'Extension/Addition',
    'Structural Repairs',
    'Custom Build',
    'Other',
  ];

  const services = serviceType === 'interiors' ? interiorServices : constructionServices;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={serviceType === 'interiors' ? 'magenta-gradient-text' : 'text-wood-dark'}>
            Book a Consultation
          </DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24 hours to schedule your consultation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-2 bg-muted rounded-md border border-input text-sm">
                    +234
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      // Limit to 10 digits
                      if (value.length <= 10) {
                        handleChange('phoneNumber', value);
                      }
                    }}
                    placeholder="8012345678"
                    maxLength={10}
                    className={errors.phoneNumber ? 'border-destructive' : ''}
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber}</p>}
                <p className="text-xs text-muted-foreground">Enter 10 digits (e.g., 8012345678)</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Project Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="service" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Service Needed <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.serviceNeeded}
                onValueChange={(value) => handleChange('serviceNeeded', value)}
              >
                <SelectTrigger className={errors.serviceNeeded ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceNeeded && <p className="text-xs text-destructive">{errors.serviceNeeded}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (Optional)</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleChange('budget', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under ₦1,000,000</SelectItem>
                    <SelectItem value="1m-3m">₦1,000,000 - ₦3,000,000</SelectItem>
                    <SelectItem value="3m-5m">₦3,000,000 - ₦5,000,000</SelectItem>
                    <SelectItem value="5m-10m">₦5,000,000 - ₦10,000,000</SelectItem>
                    <SelectItem value="over-10m">Over ₦10,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Timeline (Optional)
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => handleChange('timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When do you want to start?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6months+">6+ months</SelectItem>
                    <SelectItem value="planning">Just planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="message">
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder={prewrittenMessage}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Feel free to add any specific details about your project
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={
                serviceType === 'interiors'
                  ? 'flex-1 bg-gradient-to-r from-primary to-magenta-dark hover:from-primary/90 hover:to-magenta-dark/90'
                  : 'flex-1 bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-primary/90 hover:to-wood-dark/90 text-white'
              }
            >
              Submit Consultation Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
