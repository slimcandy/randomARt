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
                    className="btn btn-xs btn-wide"
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
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="card max-w-xs bg-base-100 shadow-xl">
            <figure className="max-h-80 overflow-hidden">
              <a href={randomObject.url} rel="ar" title="Open AR object">
                <img alt={randomObject.label} src={randomObject.previewImg} />
              </a>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{randomObject.label}</h2>
              <p>by {randomObject.username}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary btn-wide gap-2"
                >
                  Next <NextIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
