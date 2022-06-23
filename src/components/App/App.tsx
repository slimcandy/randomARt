/* eslint-disable react/no-invalid-html-attribute */
import React, { useEffect, useState } from "react";
import { IARFileEntry } from "../../types";
import ARLibrary from "../../ar-objects.json";
import NextIcon from "../../icons/next";

const getNextObject = (library: IARFileEntry[]) => {
  const length = library.length - 1;
  const randomIndex = Math.floor(Math.random() * length);
  const randomObject: IARFileEntry = library[randomIndex];

  return randomObject;
};

function App() {
  const [randomObject, setRandomObject] = useState<IARFileEntry>();
  const [isARReady, setIsARReady] = useState(false);

  const setNextObject = () => {
    const nextObject = getNextObject(ARLibrary);
    setRandomObject(nextObject);
  };

  const handleClick = () => setNextObject();
  const handleOpenClick = () => setIsARReady(true);

  // Check if AR is available
  useEffect(() => {
    const a = document.createElement("a");
    if (a.relList.supports("ar")) {
      setIsARReady(true);
    }
  }, []);

  // Set the first object
  useEffect(() => {
    setNextObject();
  }, []);

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
              href={randomObject.url}
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
            onClick={handleClick}
            type="button"
            className="btn btn-warning btn-wide gap-2"
          >
            Next AR
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
