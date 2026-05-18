import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";
import type { FooterData } from "./footer.types";
import { footerConfig } from "./footer.config";

function Footer() {
  const footerData: FooterData = footerConfig;

  return (
    <footer
      role="contentinfo"
      className="relative z-30 bg-[#FBF6EF] text-neutral-800 "
    >
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand / Description */}
          <div className="md:col-span-4">
            <FooterBrand
              brand={footerData.brand}
              socialLinks={footerData.socialLinks}
            />
          </div>

          {/* Navigation */}
          <div className="md:col-span-8">
            <FooterNav columns={footerData.columns} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-6 justify-items-center">
          <p className="text-base justify-items-center text-neutral-600">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
