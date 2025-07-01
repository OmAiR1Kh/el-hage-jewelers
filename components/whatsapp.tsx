import { FaWhatsapp } from "react-icons/fa6";

const WhatsAppIcon = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors">
      <a
        href="https://wa.me/96171444454"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="w-8 h-8" color="white" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;
