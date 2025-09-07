"use client";
// Importing Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Importing React Hooks
import React, { useEffect } from "react";
// Importing React-Icons
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // ✅ يقفل بالمفتاح Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // ✅ يقفل عند الكليك برا
          />

          {/* المحتوى */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()} // ✅ يمنع إغلاق المودال عند الضغط على المحتوى
            >
              {/* زرار إغلاق */}
              <button
                onClick={onClose}
                className="cursor-pointer absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
              >
                <IoClose size={40} />
              </button>

              {/* المحتوى اللي هيتعرض جوا المودال */}
              <div className="p-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
