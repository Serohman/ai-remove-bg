export function Header() {
  return (
    <header>
      {/* Header */}
      <h1 className="leading-none mb-2 text-3xl text-center">
        Background Removal w/ 🤗 Transformers.js
      </h1>
      <p className="leading-none text-center max-w-xl">
        Free, private and fast background remover that runs locally in your browser, powered by the{" "}
        <a
          className="text-gray-600 underline hover:text-blue-500"
          href="https://huggingface.co/briaai/RMBG-1.4"
          target="_blank"
        >
          RMBG V1.4
        </a>{" "}
        model from{" "}
        <a
          className="text-gray-600 underline hover:text-blue-500"
          href="https://bria.ai/"
          target="_blank"
        >
          BRIA AI
        </a>
      </p>
    </header>
  );
}
