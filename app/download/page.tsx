//for using language and navigator which are present in browser to detect language and device respectively
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import translations from "../../lib/translation.json";

// Device detection helper
// the .test method of regex in javascript is used to check if userAgent matches a specific pattern to find out the device
function detectDevice(userAgent: string) {
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  return "desktop";
}

//Language detection helper
function detectLanguage(lang: string) {
  if (lang.startsWith("bn")) return "bengali";
  if (lang.startsWith("de")) return "german";
  return "english";
}

//dynamic UI of skeleton
const Skeleton = ({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) => (
  <div
    className={`skeleton rounded-xl ${className}`}
    style={{ width, height }}
  />
);

export default function Download() {
  const [device, setDevice] = useState<"ios" | "android" | "desktop">(
    "desktop"
  );
  const [language, setLanguage] = useState<"english" | "bengali" | "german">(
    "english"
  );
  const [loading, setLoading] = useState(true);
  //re-renders automatically when language changes
  const t = translations[language];
  useEffect(() => {
    const timer = setTimeout(() => {
      setDevice(detectDevice(navigator.userAgent));
      setLanguage(detectLanguage(navigator.language));
      setLoading(false);
    }, 2000); // 2 seconds

    // cleanup to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <section className="glass-card max-w-lg w-full rounded-3xl p-8 md:p-12 text-center fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          {t.title}
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          {loading ? (
            <>
              {(device === "ios" || device === "android") && (
                <Skeleton width={160} height={52} />
              )}

              {device === "desktop" && (
                <>
                  <Skeleton width={160} height={52} />
                  <Skeleton width={160} height={52} />
                </>
              )}
            </>
          ) : (
            <>
              {(device === "ios" || device === "desktop") && (
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block transition-transform duration-300 active:scale-95"
                >
                  <Image
                    src="/appstore.svg"
                    alt="Download on the App Store"
                    width={160}
                    height={52}
                    className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
                  />
                </a>
              )}

              {(device === "android" || device === "desktop") && (
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block transition-transform duration-300 active:scale-95"
                >
                  <Image
                    src="/playstore.svg"
                    alt="Get it on Google Play"
                    width={160}
                    height={52}
                    className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
                  />
                </a>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {t.detected}
            </p>
            <p className="text-sm font-medium">
              {device.charAt(0).toUpperCase() + device.slice(1)}
            </p>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {t.lang}
            </p>
            <p className="text-sm font-medium">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
