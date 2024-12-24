import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  slot: string;
}
function useEffectOnce(cb: any) {
  useEffect(cb, []);
}

function GoogleAds({ slot }: AdSenseProps) {
  const showAds: boolean = process.env.REACT_APP_SHOW_ADS as unknown as boolean;

  useEffectOnce(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });

  return showAds ? (
    <Box style={{ border: "1px solid white" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9458101921994165"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Box>
  ) : (
    <></>
  );
}

export default GoogleAds;
