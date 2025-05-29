"use client";

import {RawImage} from "@huggingface/transformers";
import React, {useState} from "react";
import {Header} from "./components/Header";
import {ImagePreview} from "./components/ImagePreview";
import {ImageProcessing} from "./components/ImageProcessing";
import ImageUpload, {ImageUploadProps} from "./components/ImageUpload";
import {Image} from "./types/image";
import {useImageSegmentation} from "./useImageSegmentation";
import {applyAlphaMask} from "./utils/image";

enum State {
  Upload,
  Process,
  Finished,
}

export default function Home() {
  const [inputImage, setInputImage] = useState<Partial<Image>>({});
  const [outputImage, setOutputImage] = useState<Partial<Image>>({});

  const [state, setState] = useState(State.Upload);
  const pipeline = useImageSegmentation("briaai/RMBG-1.4");

  const isState = (s: State) => s === state;

  const handleInputChange: ImageUploadProps["onInputChange"] = async (image) => {
    setState(State.Process);
    setInputImage(image);
    handleImageProcessing(image);
  };

  const handleImageProcessing = async (sourceImage: Image) => {
    // Get the output/result from the segmentation pipeline
    const segmentationOutput = await pipeline.start(sourceImage.url);

    // Extract the original image's pixel data
    const sourcePixelData = sourceImage.raw.data;

    // Extract the mask data from the segmentation output
    const maskPixelData = segmentationOutput.mask.data;

    // Apply the mask to the original image
    const processedPixelData = applyAlphaMask(sourcePixelData, maskPixelData);

    // Create and renderthe output image data object
    createFinalResult(
      new ImageData(
        processedPixelData as Uint8ClampedArray,
        sourceImage.raw.width,
        sourceImage.raw.height
      )
    );
  };

  const createFinalResult = async (data: ImageData) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = data.width;
    canvas.height = data.height;
    if (ctx) {
      ctx.putImageData(data, 0, 0);
      setOutputImage({url: canvas.toDataURL("image/png")});
      setState(State.Finished);
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
    const raw = await RawImage.fromURL(url);
    const exampleImage: Image = {
      url,
      name,
      raw,
    };
    setState(State.Process);
    setInputImage(exampleImage);
    handleImageProcessing(exampleImage);
  };

  return (
    <div className="flex justify-center items-start h-full pt-[12lvh]">
      <div className="max-w-2xl">
        <Header />

        {/* Image Thumbnail */}
        <div className="mt-5 mb-5 w-full h-[50lvh] ">
          {isState(State.Upload) && <ImageUpload onInputChange={handleInputChange} />}
          {isState(State.Process) && <ImageProcessing url={inputImage.url || ""} />}
          {isState(State.Finished) && <ImagePreview url={outputImage.url || ""} />}
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

          {isState(State.Process) &&
            pipeline.info?.status === "progress" &&
            pipeline.info.progress < 100 && (
              <div>
                <label className="text-xs font-mono">Downloading {pipeline.info.file}</label>
                <progress className="w-full" value={pipeline.info.progress} max="100" />
              </div>
            )}

          {isState(State.Process) && pipeline.info?.status === "ready" && (
            <div className="text-center">
              <label className="text-xs font-mono">Analysing the image...</label>
            </div>
          )}

          {isState(State.Finished) && (
            <div className="flex justify-center items-center">
              <a
                className="cursor-pointer text-gray-600 hover:text-blue-500 underline mr-4"
                onClick={() => reset()}
              >
                Reset
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
