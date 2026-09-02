import WindowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";
import { memo } from "react";

const Image = memo(() => {
  const data = useWindowStore((s) => s.windows.imgfile?.data);

  if (!data) return <div className="flex-1 bg-white/50" />;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header" className="shrink-0">
        <WindowControls target="imgfile" />
        <h2 className="text-sm font-semibold text-center flex-1 text-gray-700 dark:text-gray-200 truncate px-2">
          {name}
        </h2>
        <span className="w-12 shrink-0" aria-hidden="true" />
      </div>

      <div className="flex-1 w-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center p-6 min-h-0 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-md select-none"
            decoding="async"
          />
        ) : null}
      </div>
    </>
  );
});

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;