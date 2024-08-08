import Link from "next/link";

import { SiteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

const MainNav = () => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="w-6 h-6" />
        <span className="inline-block font-bold">{SiteConfig.name}</span>
      </Link>
    </div>
  );
};

export default MainNav;
