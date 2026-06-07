import { lazy, Suspense } from "react";

const TechStackScene = lazy(() => import("./TechStackScene"));

const TechStack = () => {
  return (
    <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
      <TechStackScene />
    </Suspense>
  );
};

export default TechStack;
