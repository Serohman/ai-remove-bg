"use client";

import {ImageSegmentationPipeline, RawImage, pipeline} from "@huggingface/transformers";
import {useEffect, useState} from "react";

export default function Home() {
  const [imageURL, setImageURL] = useState<undefined | string>();
  const [segmenter, setSegmenter] = useState<undefined | ImageSegmentationPipeline>();

  const loadModel = async () => {
    const segmenter = await pipeline("image-segmentation", "briaai/RMBG-1.4", {
      dtype: "q8",
    });
    setSegmenter(() => segmenter);
    console.log("Model Ready.");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (!files || !files[0]) {
      setImageURL(() => undefined);
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);

    setImageURL(() => url);
    handleRemoval(url);
  };

  const handleRemoval = async (url: string) => {
    if (segmenter && url) {
      const result = await segmenter(url);

      if (result[0]?.mask && url) {
        const image = await RawImage.fromURL(url);
        const mask = result[0].mask;

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Draw original image output to canvas
          ctx.drawImage(image.toCanvas(), 0, 0);

          // Update alpha channel
          const pixelData = ctx.getImageData(0, 0, image.width, image.height);
          console.log("Mask: ");
          console.log(mask);
          console.log("Original: ");
          console.log(pixelData);

          console.log(pixelData.data);

          for (let i = 0; i < mask.data.length; ++i) {
            pixelData.data[4 * i + 3] = mask.data[i] ?? 0; // Change ?? to something more appropriate
          }
          ctx.putImageData(pixelData, 0, 0);
          document.body.appendChild(canvas);
        } else {
          console.error("Undefined context", ctx);
        }
      } else {
        console.log(!!result[0]?.mask);
        console.log(!!imageURL);
      }
    } else {
      console.error(segmenter);
      console.error(url);
      throw new Error("HandleRemoval");
    }
  };

  return (
    <div className="flex grow justify-center items-center">
      {!imageURL && <input type="file" onChange={handleInputChange} />}
    </div>
  );
}
