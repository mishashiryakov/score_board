import { type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
