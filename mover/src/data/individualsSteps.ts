import { StaticImageData } from "next/image";

import AppPic1 from "@/assets/images/more-info/app_pic1.jpg";
import AppPic2 from "@/assets/images/more-info/app_pic2.jpg";
import AppPic3 from "@/assets/images/more-info/app_pic3.jpg";

export interface Step {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const individualsSteps: Step[] = [
  {
    id: 1,
    title: "Enter Your Details",
    description:
      "Tell us when, where, and what you need help with, and get an upfront price.",
    image: AppPic1,
  },
  {
    id: 2,
    title: "Get Scheduled with Movers",
    description:
      "Get connected to Movers in minutes. You can message them in-app, and track your items as your 404Movers happens.",
    image: AppPic2,
  },
  {
    id: 3,
    title: "Tip & Review In-App",
    description:
      "After your 404Move is complete you can tip and review your Movers in-app.",
    image: AppPic3,
  },
];
export default individualsSteps;
