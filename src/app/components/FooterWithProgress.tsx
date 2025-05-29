import {ProgressInfo} from "@huggingface/transformers";

export namespace FooterWithProgress {
  export interface Props {
    info: ProgressInfo;
  }
}

export function FooterWithProgress({info}: FooterWithProgress.Props) {
  console.log(info);
  console.log(info.status === "progress" && info.progress < 100);
  return (
    <>
      {/* Downloading */}
      {info.status === "progress" && info.progress < 100 && (
        <div>
          <label className="text-xs font-mono">Downloading {info.file}</label>
          <progress className="w-full" value={info.progress} max="100" />
        </div>
      )}

      {/* Analysing */}
      {info.status === "ready" && (
        <div className="text-center">
          <label className="text-xs font-mono">Analysing the image...</label>
        </div>
      )}
    </>
  );
}
