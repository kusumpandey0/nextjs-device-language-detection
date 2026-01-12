//for using language and navigator which are present in browser to detect language and device respectively
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Device detection helper
// the .test method of regex in javascript is used to check if userAgent matches a specific pattern to find out the device
function detectDevice(userAgent: string) {
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  return "desktop";
}

export default function AppDownloadPage() {
  const [device, setDevice] = useState<"ios" | "android" | "desktop">("desktop");
//the device value is set on every page refresh
  useEffect(() => {
    setDevice(detectDevice(navigator.userAgent));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <section className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">

        <h1 className="text-2xl font-bold mb-2 text-black">
          Download Our App
        </h1>

        <p className="text-gray-600 mb-6">
          Get the best experience by installing our mobile app.
        </p>

        <div className="flex justify-center gap-4">
          {(device === "ios" || device === "desktop") && (
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/appstore.svg"
                alt="Download on the App Store"
                width={150}
                height={50}
                    className="transition-transform duration-300 ease-in-out hover:scale-110"

              />
            </a>
          )}

          {(device === "android" || device === "desktop") && (
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/playstore.svg"
                alt="Get it on Google Play"
                width={150}
                height={50}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </a>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Detected device: <strong>{device}</strong>
        </p>
      </section>
    </main>
  );
}
