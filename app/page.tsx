"use client";

import dynamic from "next/dynamic";

const ExistenceExperience = dynamic(() => import("@/components/existence/ExistenceExperience"), {
  ssr: false,
});

export default function Home() {
  return <ExistenceExperience />;
}
