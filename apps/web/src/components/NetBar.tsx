import Github from "./icons/Github";
import Twitter from "./icons/Twitter";

export const NetBar = () => {
  return (
    <div className="inline-flex items-center justify-center w-full h-full bg-container-bg thin-scroll">
      <div className="z-40 h-full flex flex-row w-full items-center justify-center gap-2 bg-container-bg text-text-default border border-container-border relative  sm:p-2">
        <a
          href="https://github.com/jogeshwar01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-sm flex-1 h-full cursor-pointer border border-gray-600 rounded-l-sm hover:bg-container-bg-hover"
        >
          <Github className="mr-2" />
          <span>Github</span>
        </a>

        <a
          href="https://x.com/jogeshwar01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-sm flex-1 h-full cursor-pointer border border-gray-600 rounded-r-sm hover:bg-container-bg-hover"
        >
          <Twitter className="mr-2" />
          <span>Twitter</span>
        </a>
      </div>
    </div>
  );
};
