import React, { useEffect } from "react";
import InstallIcon from "../../icons/install";
import ShareIcon from "../../icons/share";

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function Footer() {
  const [bipEvent, setBipEvent] = React.useState<IBeforeInstallPromptEvent>();
  const [showWarning, setShowWarning] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setBipEvent(event as IBeforeInstallPromptEvent);
    });
  }, []);

  const clickHandler = () => {
    if (bipEvent) {
      bipEvent.prompt();
      setShowWarning(false);
      setBipEvent(undefined);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        {showWarning && (
          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                To install the app look for Add to Homescreen in your
                browser&apos;s <ShareIcon /> share menu.
              </span>
            </div>
          </div>
        )}
        <button type="button" className="btn gap-2" onClick={clickHandler}>
          <InstallIcon /> Install app
        </button>
      </div>
    </footer>
  );
}
export default Footer;
