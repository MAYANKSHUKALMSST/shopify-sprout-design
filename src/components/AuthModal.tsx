
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SignInForm, SignUpForm } from './AuthForms';

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  
  if (!isOpen) return null;

  const handleGuestLogin = () => {
    onAuthenticated();
    onClose();
  };

  const handleSuccess = () => {
    onAuthenticated();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true" 
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {mode === 'signin' ? (
            <SignInForm 
              onSuccess={handleSuccess} 
              onGuestLogin={handleGuestLogin}
            />
          ) : (
            <SignUpForm onSuccess={handleSuccess} />
          )}
          
          <div className="mt-6 text-center text-sm">
            {mode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-black font-medium hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('signin')}
                  className="text-black font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
