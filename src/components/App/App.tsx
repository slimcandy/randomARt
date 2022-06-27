/* eslint-disable react/no-invalid-html-attribute */
import React, { useEffect, useRef, useState } from "react";
import { IARFileEntry, IArMessage } from "./types";
import ARLibrary from "../../sources/ar-objects.json";
import AppleARLibrary from "../../sources/apple-collection.json";
import { getNextObject, stringifyMessage } from "./utils";
import NotSupportedPage from "../NotSupportedPage/NotSupportedPage";
import LoadingPage from "../LoadingPage/LoadingPage";

function App() {
  const [randomObject, setRandomObject] = useState<IARFileEntry>();
  const [isARReady, setIsARReady] = useState(false);
  const [arMessage, setArMessage] = useState<IArMessage>();

  const arLink = useRef<HTMLAnchorElement>(null);

  const setNextObject = function setNextObject(
    library: "usdzshare" | "apple" = "apple"
  ) {
    const source: IARFileEntry[] =
      library === "usdzshare" ? ARLibrary : AppleARLibrary;

    const nextObject = getNextObject(source);
    setRandomObject(nextObject);

    const nextArMessage: IArMessage = {
      checkoutTitle: nextObject.label,
      checkoutSubtitle: nextObject.username,
      callToAction: "Next ARt",
    };
    setArMessage(nextArMessage);
  };

  const handlePrimaryClick = () => setNextObject("apple");
  const handleSecondaryClick = () => setNextObject("usdzshare");
  const handleOpenClick = () => setIsARReady(true);

  const innerTapHandler = function innerTapHandler(event: any) {
    if (event.data === "_apple_ar_quicklook_button_tapped") {
      handlePrimaryClick();
    }
  };

  useEffect(() => {
    // Check if AR is available
    const a = document.createElement("a");
    if (a.relList.supports("ar")) {
      setIsARReady(true);
    }

    // Set the first object
    setNextObject();
  }, []);

  // Define the AR inner tap handler
  useEffect(() => {
    if (arLink.current) {
      arLink.current.addEventListener("message", innerTapHandler, false);
    }
    return () => {
      if (arLink.current) {
        arLink.current.removeEventListener("message", innerTapHandler);
      }
    };
  }, [arLink]);

  if (!isARReady) {
    return <NotSupportedPage onClick={handleOpenClick} />;
  }

  if (!randomObject) {
    return <LoadingPage />;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row text-center lg:text-start">
        <div className="avatar">
          <div className="w-48 lg:w-72 rounded-full ring ring-orange-300 hover:ring-orange-500 focus:ring-orange-500 active:ring-orange-500 ring-offset-base-100 ring-offset-2">
            <a
              ref={arLink}
              href={`${randomObject.url}#${stringifyMessage(arMessage)}`}
              rel="ar"
              title={`Open ${randomObject.label}`}
            >
              <img
                src={randomObject.previewImg}
                alt={`${randomObject.label} by ${randomObject.username}`}
              />
            </a>
          </div>
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">Tap on image to open AR</h1>
          <p className="py-2 lg:py-6 text-xs">
            {randomObject.username}:{" "}
            <span className="font-bold">{randomObject.label}</span>
          </p>
          <button
            onClick={handlePrimaryClick}
            type="button"
            className="btn btn-warning"
          >
            Next AR
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={handleSecondaryClick}
          >
            try experimental
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
