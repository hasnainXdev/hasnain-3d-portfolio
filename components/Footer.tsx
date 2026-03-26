const Footer = () => (
    <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()}{" "}
                <span className="font-display font-semibold text-foreground">
                    Hasnain<span className="text-gradient">.</span>
                </span>
                . All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground hover:text-gray-400 transition-all ease-in duration-[1.2] cursor-pointer">
                Built with ❤️ by Muhammad Hasnain
            </p>
        </div>
    </footer>
);

export default Footer;