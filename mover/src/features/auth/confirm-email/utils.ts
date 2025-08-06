export const MAX_CODE_LENGTH = 6;
export const RESEND_TIMER_IN_SECONDS = 5 * 60;

export const getExpiryTimeStamp = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + RESEND_TIMER_IN_SECONDS);
  return time;
};

export const formatNumber = (num: number) =>
  num.toLocaleString("en-US", { minimumIntegerDigits: 2 });
