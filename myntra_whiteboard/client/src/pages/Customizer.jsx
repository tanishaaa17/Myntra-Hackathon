import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import "./style.scss";
import state from "../store";
import { uploadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, DecalTypes, FilterTabs } from "../config/constants";
import { slideAnimation } from "../config/motion";
import downloadImg from "../assets/download.png";
import {
  ColorPicker,
  FilePicker,
  TextEditor,
  Tab,
  FilterOptions,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [tag, setTag] = useState(""); // State for the tag input

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // Show tab content according to active tab selection
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "texteditor":
        return <TextEditor />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          key="custom"
          className="absolute top-0 left-0 z-10"
          {...slideAnimation("left")}
        >
          <div className="flex items-center min-h-screen">
            <div className="editortabs-container tabs">
              {EditorTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={() => setActiveEditorTab(tab.name)}
                />
              ))}

              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}
          {activeFilterTab.logoShirt && <FilterOptions isLogo={true} />}
          {activeFilterTab.stylishShirt && <FilterOptions isLogo={false} />}
          <div className="upload-section">
            <Tab
              key="upload-btn"
              isFilterTab
              tab={{
                name: "Upload",
                icon: downloadImg,
              }}
              handleClick={() => {
                uploadCanvasToImage(tag); // Pass the tag to the upload function
                alert("Design added successfully");
              }}
            />
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter a tag"
              className="tag-input"
            />
          </div>
        </motion.div>

        <DisplayText />
      </>
    </AnimatePresence>
  );
};

const DisplayText = () => {
  const snap = useSnapshot(state);
  if (!snap.isTextVisible) return null;

  return (
    <div
      style={{
        fontSize: `${snap.fontSize * 0.5}rem`,
        color: snap.textColor,
        fontFamily: snap.fontFamily,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        whiteSpace: "nowrap",
      }}
    >
      {/* {snap.text} */}
    </div>
  );
};

export default Customizer;
