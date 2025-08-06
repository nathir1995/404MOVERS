import { IconType } from "react-icons";

import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export interface SocialMediaItem {
  link: string;
  Icon: IconType;
}

const socialMedia: SocialMediaItem[] = [
  {
    link: "https://www.facebook.com/404moversca",
    Icon: FaFacebook,
  },
  {
    link: "https://www.instagram.com/404movers.ca",
    Icon: FaInstagram,
  },
  {
    link: "https://twitter.com/Movers404",
    Icon: FaTwitter,
  },
  {
    link: "https://www.linkedin.com/company/404-movers",
    Icon: FaLinkedin,
  },
];

export default socialMedia;
