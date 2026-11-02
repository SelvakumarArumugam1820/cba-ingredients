import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "966556585552";
const WHATSAPP_MESSAGE = "Hello CBA Ingredients, I'd like to enquire about your products.";

/** The recognizable WhatsApp glyph — no lucide equivalent, so inlined as SVG. */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.02 2C6.496 2 2.02 6.477 2.02 12.002c0 1.925.536 3.726 1.467 5.26L2 22l4.863-1.463a9.943 9.943 0 0 0 5.157 1.426h.004c5.524 0 10-4.478 10-10.001C22.024 6.437 17.544 2 12.02 2zm0 18.26h-.003a8.267 8.267 0 0 1-4.21-1.152l-.302-.18-3.128.94.94-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.397c0-4.57 3.72-8.287 8.293-8.287a8.23 8.23 0 0 1 5.861 2.43 8.24 8.24 0 0 1 2.425 5.858c0 4.57-3.72 8.158-8.412 8.158z" />
    </svg>
  );
}

/** Persistent floating WhatsApp entry point, shown on every page. */
export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={lang === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
    >
      <WhatsAppIcon />
    </a>
  );
}
