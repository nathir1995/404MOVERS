import FULL_LOGO from "assets/img/logo/brand_logo.png";
import { useAuth } from "store/auth/useAuth";

const useCompanyLogo = () => {
  const { user } = useAuth();
  const imageSrc = user?.company?.media?.[0]?.original_url || FULL_LOGO;
  return imageSrc;
};

export default useCompanyLogo;
