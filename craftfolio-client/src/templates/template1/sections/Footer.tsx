import { useSelector } from "react-redux";
import { data } from "../data/data";
import { iconMap } from "../utils/iconMap";
import { getResolvedLink } from "../utils/resolveLinks";
import type { RootState } from "../../../redux/store";

export function Footer({ device }: { device?: 'desktop' | 'tablet' | 'mobile' }) {
    const thisData = useSelector((state: RootState) => state.data.data) ?? data;

  if (!thisData?.sections?.footer) return null;

  const { footer, profile } = data;

  return (
    <footer className={`${device === 'mobile' ? 'py-8' : 'py-12'} bg-white border-t border-gray-100 flex flex-col items-center`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
        {/* Top Section */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4 tracking-tight">{profile.logoText}</h2>
          <p className="text-[#6B7280] text-base mb-8 text-center">
            {footer.description}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
            {footer.links.map((link, index) => {
              const social = getResolvedLink(link.linkKey);
              const Icon = iconMap[link.icon];

              return (
                <a 
                  key={index} 
                  href={social.url} 
                  target={social.url.startsWith('http') ? "_blank" : "_self"}
                  rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                  className="flex items-center gap-2 text-[#6B7280] hover:text-[#4CAF7D] transition-colors font-medium text-sm group"
                >
                  {Icon && <Icon size={18} className="group-hover:-translate-y-1 transition-transform" />}
                  <span>{link.label}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-100 h-px bg-linear-to-r from-transparent via-[#E5E7EB] to-transparent"></div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-[#6B7280] text-sm font-medium">
            © {new Date().getFullYear()} {profile.name} • Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
