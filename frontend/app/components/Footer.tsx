export function Footer() {
  return (
    <footer className="border-t border-surface-container-highest bg-surface py-10 text-on-surface">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[48px] grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-[22px] font-bold text-primary">Reliant Commerce</p>
          <p className="mt-4 max-w-sm text-body-lg text-on-surface-variant">
            Built for modern businesses that need a scalable, conversion-focused storefront with premium visual polish.
          </p>
        </div>
        <div>
          <p className="font-semibold text-primary">Product</p>
          <ul className="mt-4 space-y-2 text-body-sm text-on-surface-variant">
            <li>Features</li>
            <li>Integrations</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-primary">Company</p>
          <ul className="mt-4 space-y-2 text-body-sm text-on-surface-variant">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
