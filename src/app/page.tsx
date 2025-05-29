"use client";

import React, {useState} from "react";
import {FooterWithDownloaod} from "./components/FooterWithDownload";
import {FooterWithExamples} from "./components/FooterWithExamples";
import {FooterWithProgress} from "./components/FooterWithProgress";
import {Header} from "./components/Header";
import {ImagePreview} from "./components/ImagePreview";
import {ImageProcessing} from "./components/ImageProcessing";
import {ImageUpload} from "./components/ImageUpload";
import {Image} from "./types/image";
import {useImageSegmentation} from "./useImageSegmentation";
import {applyAlphaMask} from "./utils/image";

export default function Home() {
  const [sourceImage, setSourceImage] = useState<Image | undefined>();
  const [outputImage, setOutputImage] = useState<Omit<Image, "raw"> | undefined>(); // Omitting raw data because it's not needed
  const pipeline = useImageSegmentation("briaai/RMBG-1.4");
  const progressInfo = pipeline.info;
  const isScreenUpload = !sourceImage;
  const isScreenProcessing = sourceImage && progressInfo;
  const isScreenDownload = outputImage;

  const handleSourceChange = (image: Image) => {
    setSourceImage(image);
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

    // Create and render the output image data object
    createOutputImage(
      sourceImage.name,
      new ImageData(
        processedPixelData as Uint8ClampedArray,
        sourceImage.raw.width,
        sourceImage.raw.height
      )
    );
  };

  const createOutputImage = async (name: string, data: ImageData) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = data.width;
    canvas.height = data.height;
    if (ctx) {
      ctx.putImageData(data, 0, 0);
      setOutputImage({
        url: canvas.toDataURL("image/png"),
        name,
      });
    } else {
      throw new Error("Unexpected error. Failed to create output image.");
    }
  };

  const reset = () => {
    setSourceImage(undefined);
    setOutputImage(undefined);
  };

  return (
    <div className="flex h-full flex-col p-4 max-w-5xl mx-auto md:py-6">
      <Header />
      <main className="flex-grow flex flex-col m-4">
        {isScreenUpload && <ImageUpload onInputChange={handleSourceChange} />}
        {isScreenProcessing && <ImageProcessing url={sourceImage.url} />}
        {isScreenDownload && <ImagePreview url={outputImage.url} />}
      </main>
      <footer className="h-10">
        {isScreenUpload && <FooterWithExamples onExampleClick={handleSourceChange} />}
        {isScreenProcessing && <FooterWithProgress info={progressInfo} />}
        {isScreenDownload && (
          <FooterWithDownloaod downloadLink={outputImage} onResetClick={reset} />
        )}
      </footer>
    </div>
  );
}
