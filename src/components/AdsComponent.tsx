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

function AdsComponent({ slot }: AdSenseProps) {
  useEffectOnce(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });

  return (
    <div style={{ border: "1px solid white" }}>
      Ads
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9458101921994165"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdsComponent;
