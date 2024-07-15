import React from "react";
import { useSnapshot } from "valtio";
import { Text } from "@react-three/drei";
import state from "../store";
// import "./fonts.css";

const CanvasComponent = () => {
  const snap = useSnapshot(state);

  if (!snap.isTextVisible) return null;

  return (
    <Text
    position={[snap.textPosition.x*0.1, snap.textPosition.y*0.2, snap.textPosition.z]}
      rotation={[0, 0, 0]}
      fontSize={snap.fontSize * 0.005}
      color={snap.textColor}
      maxWidth={0.3}
      lineHeight={1}
      letterSpacing={0.02}
      // font={snap.fontFamily}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
    >
      {snap.text}
    </Text>
  );
};

export default CanvasComponent;