export function ImagePreview({url}: {url: string}) {
  const transparencyPattern = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==`;
  return (
    <img
      src={url}
      alt=""
      className="h-full mx-auto"
      style={{
        backgroundImage: `url(${transparencyPattern})`,
      }}
    />
  );
}
