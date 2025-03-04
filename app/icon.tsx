import { getGeistSemiBold } from "@/assets/fonts";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon() {
  const geistSemiBold = await getGeistSemiBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00A63E", // WhatsApp green color from OG image
          borderRadius: "8px", // Slightly rounded corners
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 20 }}>W</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
