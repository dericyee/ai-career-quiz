import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AI Career Quiz — What career are you actually built for?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #08080b 0%, #15151b 60%, #1e1b3a 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#a1a1aa",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#34d399",
            }}
          />
          Sigmaschool · Career Compass
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            What career are you{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#818cf8,#c084fc,#f472b6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              actually
            </span>{" "}
            built for?
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 880 }}>
            A 2-minute quiz. Your archetype, your income projection, your
            30-day plan.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Builder", "Automator", "Analyst", "Creator", "Grower"].map(
            (t, i) => (
              <div
                key={t}
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#e4e4e7",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 99,
                  padding: "10px 22px",
                  background:
                    i === 0 ? "rgba(129,140,248,0.18)" : "rgba(255,255,255,0.03)",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
