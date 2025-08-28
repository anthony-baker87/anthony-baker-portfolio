export function isMobile(userAgent) {
  if (!userAgent) return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    userAgent
  );
}
