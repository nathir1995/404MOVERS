import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

import NathirIMG from "@/assets/images/team/nathir.png";
import AnasIMG from "@/assets/images/team/anas.jpg";
import CezarIMG from "@/assets/images/team/cezar.jpg";
import JohnnyIMG from "@/assets/images/team/johnny.jpg";

import { FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface SocialMedia {
  link: string;
  Icon: IconType;
}

export interface TeamMember {
  first_name: string;
  last_name: string;
  role: string;
  image: StaticImageData;

  social_media: SocialMedia[];
}

const teamMembers: TeamMember[] = [
  {
    first_name: "Nathir",
    last_name: "Haimoun",
    role: "Founder and CEO",
    image: NathirIMG,

    social_media: [
      {
        link: "https://www.linkedin.com/in/nathir-haimoun-269b4667/",
        Icon: FaLinkedin,
      },
      {
        link: "https://www.facebook.com/nathir.ha/",
        Icon: FaFacebook,
      },
      {
        link: "mailto:nhaimoun@maaloumatix.ca",
        Icon: MdEmail,
      },
    ],
  },
  {
    first_name: "Anas",
    last_name: "Qannas",
    role: "Mobile Developer",
    image: AnasIMG,

    social_media: [
      { link: "https://www.facebook.com/anaskannass1", Icon: FaFacebook },
      { link: "https://wa.me/201030459870", Icon: FaWhatsapp },
    ],
  },
  {
    first_name: "Cezar",
    last_name: "Terzian",
    role: "Front-End Developer",
    image: CezarIMG,

    social_media: [
      {
        link: "https://www.linkedin.com/in/cezar-terzian/",
        Icon: FaLinkedin,
      },
      {
        link: "https://wa.me/963941946447",
        Icon: FaWhatsapp,
      },
      {
        link: "mailto:terzian.cezar@outlook.sa",
        Icon: MdEmail,
      },
    ],
  },
  {
    first_name: "Johnny",
    last_name: "Shahin",
    role: "Back-End Developer",
    image: JohnnyIMG,

    social_media: [
      {
        link: "https://www.linkedin.com/in/johnnyshahin/",
        Icon: FaLinkedin,
      },
      {
        link: "https://wa.me/9647511787959",
        Icon: FaWhatsapp,
      },
      {
        link: "mailto:jony.shahin@gmail.com",
        Icon: MdEmail,
      },
    ],
  },
];
export default teamMembers;
