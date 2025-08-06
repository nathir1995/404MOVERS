import AppPic1 from "@/assets/images/more-info/app_pic1.jpg";
import AppPic2 from "@/assets/images/more-info/app_pic2.jpg";
import AppPic3 from "@/assets/images/more-info/app_pic3.jpg";

import { Step } from "./individualsSteps";

const moversSteps: Step[] = [
  {
    id: 1,
    title: "Signup & Work with us",
    description:
      "Open the Mover tab to view details, signup, get the confirmation and upload your documents.",
    image: AppPic1,
  },
  {
    id: 2,
    title: "Get Notified & View Details",
    description:
      "Open the Mover app to view details, items and general locations.",
    image: AppPic2,
  },
  {
    id: 3,
    title: "Request & Get Scheduled",
    description:
      "Request 404Movers to build your schedule. Connect with your customer to provide a great experience.",
    image: AppPic3,
  },
  {
    id: 4,
    title: "Do the 404move & Get Paid",
    description:
      "Swipe to start. Do the 404move. Swipe to stop. Get paid. It’s that easy.",
    image: AppPic2,
  },
];
export default moversSteps;
