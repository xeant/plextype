// src/components/providers/GoogleMapsProvider.tsx
"use client";

import { LoadScript } from "@react-google-maps/api";

const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

export default function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
      language="ko"
    >
      {children}
    </LoadScript>
  );
}
