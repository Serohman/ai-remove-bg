import {ImageSegmentationPipelineOptions, ProgressInfo, pipeline} from "@huggingface/transformers";
import {useCallback, useState} from "react";

export function useImageSegmentation(modelName: string) {
  const [info, setInfo] = useState<ProgressInfo | undefined>();

  const start = useCallback(
    async (url: string, options?: ImageSegmentationPipelineOptions) => {
      const segmentor = await pipeline("image-segmentation", modelName, {
        progress_callback: (progress: ProgressInfo) => setInfo(progress),
      });
      const result = await segmentor(url, options);

      if (result[0]) {
        return result[0];
      }

      throw new Error("Unexpected Error: No segmentation result");
    },
    [modelName]
  );

  return {start, info};
}
