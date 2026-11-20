const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <p>
        © {new Date().getFullYear()} Hasnain. All rights reserved.
      </p>
      <p>Built by Muhammad Hasnain · <span className="font-mono">build 7f3a1c9</span></p>
    </div>
  </footer>
);

export default Footer;
