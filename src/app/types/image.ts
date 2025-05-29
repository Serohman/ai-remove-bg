import {RawImage} from "@huggingface/transformers";

export interface Image {
  raw: RawImage;
  name: string;
  url: string;
}
