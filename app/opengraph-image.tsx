import { getGeistRegular, getGeistSemiBold } from "@/assets/fonts";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "WhatsApp Link Generator";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const [geistRegular, geistSemiBold] = await Promise.all([
    getGeistRegular(),
    getGeistSemiBold(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            backgroundImage:
              "linear-gradient(to right, #f0fdf4 1px, #ffffff 1px), linear-gradient(to bottom, #f0fdf4 1px, #ffffff 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontSize: "2rem",
            lineHeight: 1,
            background: "#00A63E",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: 9999,
          }}
        >
          {`wa.ritiksharma.me`}
        </div>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            position: "absolute",
            bottom: 100,
            left: 60,
            width: "80%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontSize: "4.75rem",
                lineHeight: 1,
                fontWeight: 600,
                color: "#00A63E",
              }}
            >
              WhatsApp Link Generator
            </span>
          </div>

          <span
            style={{
              fontSize: "2.5rem",
              lineHeight: "3rem",
              marginTop: "1rem",
            }}
          >
            Create shareable WhatsApp links with pre-filled messages
          </span>
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          style: "normal",
          weight: 400,
        },
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
