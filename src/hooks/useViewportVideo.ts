import { useEffect, useRef } from "react";

type ManagedVideo = {
  id: string;
  element: HTMLVideoElement;
};

const videos = new Map<string, ManagedVideo>();
let activeVideoId: string | null = null;

const pauseAndMute = (video: HTMLVideoElement) => {
  video.pause();
  video.muted = true;
  video.volume = 0;
};

const pauseAllExcept = (id: string) => {
  videos.forEach((managed, key) => {
    if (key !== id) {
      pauseAndMute(managed.element);
    }
  });
};

const requestPlay = async (id: string) => {
  const managed = videos.get(id);
  if (!managed) return;

  pauseAllExcept(id);

  const { element } = managed;
  element.muted = false;
  element.volume = 1;

  try {
    await element.play();
    activeVideoId = id;
  } catch {
    // Browser autoplay policy can block unmuted playback until user interaction.
    element.muted = true;
    element.volume = 0;
    try {
      await element.play();
      activeVideoId = id;
    } catch {
      activeVideoId = null;
    }
  }
};

const requestPause = (id: string) => {
  const managed = videos.get(id);
  if (!managed) return;

  pauseAndMute(managed.element);
  if (activeVideoId === id) {
    activeVideoId = null;
  }
};

export const activateVideoWithSound = async (id: string) => {
  await requestPlay(id);
};

interface UseViewportVideoOptions {
  id: string;
  threshold?: number;
  rootMargin?: string;
}

export const useViewportVideo = ({
  id,
  threshold = 0.55,
  rootMargin = "0px",
}: UseViewportVideoOptions) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    videos.set(id, { id, element });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== element) return;

          if (entry.isIntersecting) {
            void requestPlay(id);
            return;
          }

          requestPause(id);
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      requestPause(id);
      videos.delete(id);
    };
  }, [id, rootMargin, threshold]);

  return videoRef;
};
