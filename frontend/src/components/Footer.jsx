import { Link } from "react-router-dom";

/* ── Logo Mark ── */
function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon points="18,2 34,32 2,32" fill="none" stroke="#C8902A" strokeWidth="1.5" />
      <polygon points="18,11 28,32 8,32" fill="rgba(200,144,42,.12)" />
      <circle cx="18" cy="18" r="2.5" fill="#C8902A" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 px-[5vw] py-9 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <LogoMark size={22} />
        <span className="font-fraunces text-sm font-bold tracking-[2px] text-cream/35">
          GOLDENHORDE
        </span>
      </div>
      <div className="font-mono-gh text-[8px] tracking-[2.5px] text-cream/18">
        © 2025 GOLDENHORDE STUDIO
      </div>
      <div className="flex gap-5 flex-wrap">
        {["Privacy", "Instagram", "LinkedIn", "Behance"].map((l) => (
          <a
            key={l}
            href="#"
            className="font-mono-gh text-[8px] tracking-[2.5px] text-cream/20 no-underline transition-colors duration-200 hover:text-gold-l"
          >
            {l.toUpperCase()}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ── US Logo ── */
// function USLogo() {
//   return (
//     <div className="w-24 h-24 relative flex items-center justify-center">
//       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//         <text x="4" y="78" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="72" fill="#1a6fa8" letterSpacing="-4">U</text>
//         <text x="38" y="78" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="72" fill="#888" letterSpacing="-4">S</text>
//         <line x1="62" y1="10" x2="38" y2="86" stroke="white" strokeWidth="3.5" />
//       </svg>
//     </div>
//   );
// }

// const quickLinks = ["Home", "About Us", "Our Products", "Our Services", "Our Client", "Contact Us"];

// const products = [
//   "Mechanical Supplies",
//   "Electrical Supplies",
//   "I.T Supplies",
//   "Fabrical Container & Structure",
//   "Office Supplies",
//   "Coustomized Machine Parts",
//   "Safety & Security",
//   "Furniture Supplies",
//   "Chemical Supplies",
// ];

// const services = [
//   "Interior Design & Implementation",
//   "Civil Work",
//   "False Ceiling & Wooden Flooring",
//   "Electrical & Pluming Services",
//   "Fiber Glass Work",
//   "Heating Ventilation Air Conditioning",
// ];

// const WhatsAppIcon = () => (
//   <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//     <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.523 5.851L.057 23.7a.75.75 0 0 0 .917.943l6.063-1.476A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.697-.5-5.25-1.377l-.374-.213-3.875.943.96-3.77-.23-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//   </svg>
// );

// const PhoneIcon = () => (
//   <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//   </svg>
// );

// const MobileIcon = () => (
//   <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//     <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
//   </svg>
// );

// const EmailIcon = () => (
//   <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//     <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//   </svg>
// );

// const LocationIcon = () => (
//   <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
//   </svg>
// );

// export default function Footer() {
//   return (
//     <footer className="bg-black text-white">
//       {/* Main Footer Grid */}
//       <div className="px-[5vw] pt-14 pb-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-start">

//           {/* ── Brand Column ── */}
//           <div className="lg:col-span-1">
//             <USLogo />
//             <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-[220px]">
//               Uzmanis Supplies delivers trusted supply, import, and clearing solutions with a focus on reliability,
//               compliance, and timely execution, supporting businesses across diverse industries.
//             </p>
//             <div className="flex gap-3 mt-5">
//               {[WhatsAppIcon, InstagramIcon, FacebookIcon].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-400 transition-colors duration-200 shrink-0"
//                 >
//                   <Icon />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* ── Quick Links ── */}
//           <div>
//             <h3 className="text-yellow-400 font-bold text-[15px] mb-5 tracking-wide">
//               Quick Links
//             </h3>
//             <ul className="space-y-2.5">
//               {quickLinks.map((link) => (
//                 <li key={link}>
//                   <a
//                     href="#"
//                     className="text-gray-300 text-sm underline hover:text-yellow-400 transition-colors duration-200"
//                   >
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Products ── */}
//           <div>
//             <h3 className="text-yellow-400 font-bold text-[15px] mb-5 tracking-wide">
//               Products
//             </h3>
//             <ul className="space-y-2.5">
//               {products.map((p) => (
//                 <li key={p}>
//                   <a
//                     href="#"
//                     className="text-gray-300 text-sm underline hover:text-yellow-400 transition-colors duration-200"
//                   >
//                     {p}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Our Services ── */}
//           <div>
//             <h3 className="text-yellow-400 font-bold text-[15px] mb-5 tracking-wide">
//               Our Services
//             </h3>
//             <ul className="space-y-2.5">
//               {services.map((s) => (
//                 <li key={s}>
//                   <a
//                     href="#"
//                     className="text-gray-300 text-sm underline hover:text-yellow-400 transition-colors duration-200"
//                   >
//                     {s}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Contact US ── */}
//           <div>
//             <h3 className="text-yellow-400 font-bold text-[15px] mb-5 tracking-wide">
//               Contact US
//             </h3>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <span className="mt-0.5 shrink-0"><PhoneIcon /></span>
//                 <span className="text-gray-300 text-sm">0345-2577-277</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-0.5 shrink-0"><MobileIcon /></span>
//                 <span className="text-gray-300 text-sm">0333-3553-474</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-0.5 shrink-0"><EmailIcon /></span>
//                 <span className="text-gray-300 text-sm break-all">info@uzmaniessupplies.com</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-0.5 shrink-0"><LocationIcon /></span>
//                 <span className="text-gray-300 text-sm leading-relaxed">
//                   A-58, Ashraf Homes, North Nazimabad, Block E, Karachi.
//                 </span>
//               </li>
//             </ul>
//           </div>

//         </div>
//       </div>

//       {/* ── Bottom Bar ── */}
//       <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
//         Copyright © 2026 Uzmanis Supplies | Powered by{" "}
//         <a
//           href="#"
//           className="text-blue-400 hover:text-blue-300 transition-colors duration-200 no-underline"
//         >
//           Astra WordPress Theme
//         </a>
//       </div>
//     </footer>
//   );
// }