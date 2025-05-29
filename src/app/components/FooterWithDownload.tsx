export namespace FooterWithDownloaod {
  export interface Props {
    downloadLink: {
      name: string;
      url: string;
    };
    onResetClick: () => void;
  }
}

export function FooterWithDownloaod({downloadLink, onResetClick}: FooterWithDownloaod.Props) {
  return (
    <>
      <div className="flex justify-center items-center">
        <a
          className="cursor-pointer text-gray-600 hover:text-blue-500 underline mr-4"
          onClick={() => onResetClick()}
        >
          Reset Upload
        </a>
        <a
          className="bg-blue-600 py-1 px-3 text-white hover:bg-blue-500 active:bg-blue-600 rounded"
          href={downloadLink.url}
          download={`nobg_${downloadLink.name}.png`}
        >
          Download Image
        </a>
      </div>
    </>
  );
}
