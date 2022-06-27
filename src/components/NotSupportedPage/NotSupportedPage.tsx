import React from "react";
import { INotSupportedPageProps } from "./types";

export default function NotSupportedPage(props: INotSupportedPageProps) {
  const { onClick, children } = props;
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
                {children}
                <div className="divider" />
                <button
                  className="btn btn-wide btn-warning"
                  type="button"
                  onClick={onClick}
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
