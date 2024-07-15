import { proxy } from "valtio";

const state = proxy({
  intro: false, // Change this to false
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./d2-removebg-preview.png",
  fullDecal: "./polka4.webp",
  logoPosition: [0, 0.04, 0.15],
  logoScale: 0.15,
  fullScale: 0.7,
  logoOptions: [
    "./d1-removebg-preview.png",
    "./d4-removebg-preview.png",
    "./d6-removebg-preview.png",
    "./d7-removebg-preview.png",
    "./d8-removebg-preview.png",
  ],
  fullOptions: [
    "./0113a-removebg-preview.png",
    "./chevron_crush-removebg-preview.png",
    "./download-removebg-preview.png",
    "./download__1_-removebg-preview.png",
    // "./threejs.png",
  ],
  text: "",
  fontSize: 16,
  textColor: "#000000",
  fontFamily: "Arial",
  isTextVisible: false,
  textPosition: { x: 0, y: 0, z: 0.15 },
});

export default state;