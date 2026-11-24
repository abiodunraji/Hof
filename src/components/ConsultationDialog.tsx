import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { EnquiryForm } from './EnquiryForm';
import { useSiteConfig } from '../hooks/useSiteConfig';

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: 'interiors' | 'construction';
}

/**
 * "Book a Consultation". The form is the owner's Tally form for that brand, framed inside the
 * pop-up (the pop-up scrolls). Where no form exists (Construction, for now) it shows the phone and
 * the email instead: there is no form of our own anywhere.
 */
export function ConsultationDialog({ open, onOpenChange, serviceType = 'interiors' }: ConsultationDialogProps) {
  const config = useSiteConfig();
  const interiors = serviceType === 'interiors';
  const formId = interiors ? config.tallyInteriorsFormId : config.tallyConstructionFormId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={interiors ? 'magenta-gradient-text' : 'text-wood-dark'}>
            Book a Consultation
          </DialogTitle>
          <DialogDescription>
            {formId
              ? "Fill out the form below and we'll get back to you within 24 hours to schedule your consultation."
              : "Call or email us and we'll get back to you within 24 hours to schedule your consultation."}
          </DialogDescription>
        </DialogHeader>
        <EnquiryForm
          formId={formId}
          formTitle={interiors ? 'Client Onboarding Form' : 'Construction enquiry form'}
          noFormHeading="Call or email us to book a consultation"
        />
      </DialogContent>
    </Dialog>
  );
}
