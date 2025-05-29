"use client";

import {ImageSegmentationPipelineOutput, RawImage} from "@huggingface/transformers";
import React, {ChangeEvent, useState} from "react";
import {Header} from "./components/Header";
import {useImageSegmentation} from "./useImageSegmentation";

enum State {
  Upload,
  Progress,
  Download,
}

export default function Home() {
  const [state, setState] = useState(State.Upload);
  const [uploadedImageName, setUploadedImageName] = useState<string | undefined>();
  const [downloadImageURL, setDownloadImageURL] = useState<string | undefined>();
  const [uploadedImageURL, setUploadedImageURL] = useState<string | undefined>();
  const [uploadedImageWidth, setUploadedImageWidth] = useState<undefined | number>();
  const [uploadedImageHeight, setUploadedImageHeight] = useState<undefined | number>();
  const [pixelData, setPixelData] = useState<undefined | ImageData>();
  const pipeline = useImageSegmentation("briaai/RMBG-1.4");

  const isState = (s: State) => s === state;

  const handleInputChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    setState(State.Progress);

    if (evt.target.files instanceof FileList && evt.target.files[0]) {
      const file = evt.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedImageURL(url);
      setUploadedImageName(file.name.substring(0, file.name.lastIndexOf(".")));
      const segment = await pipeline.start(url);
      renderFinalResult(segment, url);
    } else {
      throw new Error("Unexpected error: Input FilesList is null or empty");
    }
  };

  const renderFinalResult = async (segment: ImageSegmentationPipelineOutput, url: string) => {
    const image = await RawImage.fromURL(url);
    const mask = segment.mask;
    const draftCanvas = document.createElement("canvas");
    const draftCtx = draftCanvas.getContext("2d");
    draftCanvas.width = image.width;
    draftCanvas.height = image.height;
    setUploadedImageWidth(image.width);
    setUploadedImageHeight(image.height);

    if (draftCtx) {
      // Draw original image output to canvas
      draftCtx.drawImage(image.toCanvas(), 0, 0);
      // Update alpha channel
      const pixelData = draftCtx.getImageData(0, 0, image.width, image.height);
      for (let i = 0; i < mask.data.length; ++i) {
        pixelData.data[4 * i + 3] = mask.data[i] ?? 0; // Change ?? to something more appropriate
      }
      draftCtx.putImageData(pixelData, 0, 0);
      setDownloadImageURL(draftCanvas.toDataURL("image/png"));
      setPixelData(pixelData);
      setState(State.Download);
    }
  };

  const reset = () => {
    setUploadedImageName(undefined);
    setDownloadImageURL(undefined);
    setUploadedImageURL(undefined);
    setUploadedImageWidth(undefined);
    setUploadedImageHeight(undefined);
    setPixelData(undefined);
    setState(State.Upload);
  };

  const uploadExample = async (num: number) => {
    const url = `/example-${num}.jpg`;
    const name = `example-${num}`;
    setUploadedImageURL(url);
    setUploadedImageName(name);
    setState(State.Progress);
    const segment = await pipeline.start(url);
    renderFinalResult(segment, url);
  };

  return (
    <div className="flex justify-center items-start h-full pt-[12lvh]">
      <div className="max-w-2xl">
        <Header />

        {/* Image Thumbnail */}
        <div className="mt-5 mb-5 w-full h-[50lvh] ">
          {isState(State.Upload) && (
            <label className="group w-full h-full active:bg-gray-100 ease-linear duration-75 flex flex-col justify-center items-center hover:bg-gray-50 cursor-pointer border-3 border-dashed border-gray-300 rounded-xl">
              <div className="group-hover:bg-gray-200 duration-75 ease-linear mb-2 rounded-full bg-gray-100 bg-muted p-4">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                      stroke="oklch(55.1% .027 264.364)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <h2 className="leading-none mb-1 text-xl">Upload Images</h2>
              <p className="leading-none text-sm text-gray-500 mb-1">Supports: JPG, PNG, WebP</p>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleInputChange}
                hidden
              />
            </label>
          )}

          {isState(State.Progress) && (
            <div
              className="relative overflow-hidden w-full h-full flex flex-col justify-center items-center rounded-xl bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${uploadedImageURL})`,
              }}
            >
              <div className="absolute inset-0 from-10%  via-50% to-90% animate-shimmer-infinite bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          )}

          {isState(State.Download) && uploadedImageWidth && uploadedImageHeight && pixelData && (
            <img
              src={downloadImageURL}
              alt=""
              className="h-full mx-auto"
              style={{
                backgroundImage:
                  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==",
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center">
          {isState(State.Upload) && (
            <p className="">
              <a
                onClick={() => uploadExample(1)}
                className="cursor-pointer text-gray-600 hover:text-blue-500 underline mr-4"
              >
                Try Example 1
              </a>
              <a
                onClick={() => uploadExample(2)}
                className="cursor-pointer text-gray-600 hover:text-blue-500 underline"
              >
                Try Example 2
              </a>
            </p>
          )}

          {isState(State.Progress) &&
            pipeline.info?.status === "progress" &&
            pipeline.info.progress < 100 && (
              <div>
                <label className="text-xs font-mono">Downloading {pipeline.info.file}</label>
                <progress className="w-full" value={pipeline.info.progress} max="100" />
              </div>
            )}

          {isState(State.Progress) && pipeline.info?.status === "ready" && (
            <div className="text-center">
              <label className="text-xs font-mono">Analysing the image...</label>
            </div>
          )}

          {isState(State.Download) && (
            <div className="flex justify-center items-center">
              <a
                className="cursor-pointer text-gray-600 hover:text-blue-500 underline mr-4"
                onClick={() => reset()}
              >
                Try Different Image
              </a>
              <a
                className="bg-blue-600 py-1 px-3 text-white hover:bg-blue-500 active:bg-blue-600 rounded"
                href={downloadImageURL}
                download={`nobg_${uploadedImageName}.png`}
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
