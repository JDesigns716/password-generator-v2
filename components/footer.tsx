import { SiteConfig } from "@/config/site";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" flex flex-col  items-center py-6 md:px-8 md:py-0">
      <p className="text-balance  text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built with ❤️ by{" "}
        <Link href={SiteConfig.links.x} target="_blank">
          JDesigns.
        </Link>
      </p>
      <p className="text-balance  text-center text-sm leading-loose text-muted-foreground md:text-left">
        The source code can is available on{" "}
        <Link href={SiteConfig.links.project}>GitHub. </Link>
        &copy; {new Date().getFullYear()} All Rights Reserved
      </p>
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"></p>
    </footer>
  );
};

export default Footer;
