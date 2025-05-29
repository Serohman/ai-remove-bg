"use client";

import {ImageSegmentationPipelineOutput, RawImage} from "@huggingface/transformers";
import React, {ChangeEvent, useState} from "react";
import {Header} from "./components/Header";
import ImageUpload, {ImageUploadProps} from "./components/ImageUpload";
import {ImageMetadata} from "./types/image";
import {useImageSegmentation} from "./useImageSegmentation";

enum State {
  Upload,
  Progress,
  Download,
}

export default function Home() {
  const [inputImage, setInputImage] = useState<ImageMetadata>({});
  const [outputImage, setOutputImage] = useState<ImageMetadata>({});

  const [state, setState] = useState(State.Upload);
  const pipeline = useImageSegmentation("briaai/RMBG-1.4");

  const isState = (s: State) => s === state;

  const handleInputChange: ImageUploadProps["onInputChange"] = async (imageMetadata) => {
    setState(State.Progress);
    setInputImage(imageMetadata);
    const segment = await pipeline.start(imageMetadata.url);
    renderFinalResult(segment, imageMetadata.url);
  };

  const renderFinalResult = async (segment: ImageSegmentationPipelineOutput, url: string) => {
    const image = await RawImage.fromURL(url);
    const mask = segment.mask;
    const draftCanvas = document.createElement("canvas");
    const draftCtx = draftCanvas.getContext("2d");
    draftCanvas.width = image.width;
    draftCanvas.height = image.height;

    if (draftCtx) {
      // Draw original image output to canvas
      draftCtx.drawImage(image.toCanvas(), 0, 0);
      // Update alpha channel
      const pixelData = draftCtx.getImageData(0, 0, image.width, image.height);
      for (let i = 0; i < mask.data.length; ++i) {
        pixelData.data[4 * i + 3] = mask.data[i] ?? 0; // Change ?? to something more appropriate
      }
      draftCtx.putImageData(pixelData, 0, 0);
      setOutputImage({url: draftCanvas.toDataURL("image/png")});
      setState(State.Download);
    }
  };

  const reset = () => {
    setInputImage({});
    setOutputImage({});
    setState(State.Upload);
  };

  const uploadExample = async (num: number) => {
    const url = `/example-${num}.jpg`;
    const name = `example-${num}`;
    const {width, height, data} = await RawImage.fromURL(url);
    const imageMetadata = {
      pixels: new ImageData(data as Uint8ClampedArray, width, height),
      url,
      name,
      width,
      height,
    };
    setInputImage(imageMetadata);
    setState(State.Progress);
    const segment = await pipeline.start(url);
    renderFinalResult(segment, imageMetadata.url);
  };

  return (
    <div className="flex justify-center items-start h-full pt-[12lvh]">
      <div className="max-w-2xl">
        <Header />

        {/* Image Thumbnail */}
        <div className="mt-5 mb-5 w-full h-[50lvh] ">
          {isState(State.Upload) && <ImageUpload onInputChange={handleInputChange} />}

          {isState(State.Progress) && (
            <div
              className="relative overflow-hidden w-full h-full flex flex-col justify-center items-center rounded-xl bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${inputImage.url})`,
              }}
            >
              <div className="absolute inset-0 from-10%  via-50% to-90% animate-shimmer-infinite bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          )}

          {isState(State.Download) && inputImage.width && inputImage.height && outputImage.url && (
            <img
              src={outputImage.url}
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
                href={outputImage.url}
                download={`nobg_${inputImage.name}.png`}
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
