import {RawImage} from "@huggingface/transformers";
import {Image} from "../types/image";

export namespace FooterWithExamples {
  export interface Props {
    onExampleClick: (image: Image) => void;
  }
}

export function FooterWithExamples({onExampleClick}: FooterWithExamples.Props) {
  const handleExampleClick = async (num: number) => {
    const url = `example-${num}.jpg`;
    const name = `example-${num}`;
    const raw = await RawImage.fromURL(url);
    onExampleClick({url, name, raw});
  };

  return (
    <p className="text-center">
      <a
        onClick={() => handleExampleClick(1)}
        className="cursor-pointer text-gray-600 hover:text-blue-500 underline mr-4"
      >
        Example 1
      </a>
      <a
        onClick={() => handleExampleClick(2)}
        className="cursor-pointer text-gray-600 hover:text-blue-500 underline"
      >
        Example 2
      </a>
    </p>
  );
}
