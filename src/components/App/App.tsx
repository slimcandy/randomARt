/* eslint-disable react/no-invalid-html-attribute */
import React, { useEffect, useRef, useState } from "react";
import { IARFileEntry, IArMessage, TUrlParams } from "../../types";
import ARLibrary from "../../sources/ar-objects.json";
import AppleARLibrary from "../../sources/apple-collection.json";

export const getNextObject = (library: IARFileEntry[]) => {
  const length = library.length - 1;
  const randomIndex = Math.floor(Math.random() * length);
  const randomObject: IARFileEntry = library[randomIndex];

  return randomObject;
};

export const stringifyMessage = function stringifyMessage(
  message?: IArMessage
) {
  if (!message) {
    return "";
  }
  return Object.keys(message)
    .map((key) => {
      if (message[key as TUrlParams].length > 0) {
        return `${key}=${encodeURI(message[key as TUrlParams])}`;
      }
      return "";
    })
    .join("&");
};

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
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="mockup-phone">
              <div className="camera" />
              <div className="display">
                <div className="artboard artboard-demo phone-1 p-2">
                  <h1 className="text-3xl font-bold">
                    Your device is not compatible with AR
                  </h1>
                  <p className="text-lg">
                    Please use a device with a camera that supports AR - Safari
                    for iOS 12 and above.
                  </p>
                  <div className="divider" />
                  <button
                    className="btn btn-wide btn-warning"
                    type="button"
                    onClick={handleOpenClick}
                  >
                    Open anyway
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!randomObject) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
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
