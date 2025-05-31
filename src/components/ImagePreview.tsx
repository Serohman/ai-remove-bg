export namespace ImagePreview {
  export interface Props {
    url: string;
  }
}

export function ImagePreview({url}: ImagePreview.Props) {
  const transparencyPattern = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==`;
  return (
    <img
      src={url}
      alt=""
      className="flex-grow h-0 mx-auto object-contain"
      style={{
        backgroundImage: `url(${transparencyPattern})`,
      }}
    />
  );
}
