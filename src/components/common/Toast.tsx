import { Toaster, toast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1f2937',
          color: '#f9fafb',
          border: '1px solid #374151',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          icon: <CheckCircle className="text-positive" size={20} />,
          duration: 4000,
        },
        error: {
          icon: <AlertCircle className="text-negative" size={20} />,
          duration: 5000,
        },
        blank: {
          icon: <Info className="text-accent" size={20} />,
        }
      }}
    />
  );
};

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showInfo = (message: string) => {
  toast(message);
};
