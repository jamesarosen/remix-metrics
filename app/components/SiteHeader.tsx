export default function SiteHeader(props: any) {
  return (
    <header {...props}>
      <h1 className="flex items-center text-4xl">
        <svg
          className="w-8 h-8 mr-2 inline"
          version="1.1"
          viewBox="200 0 280 580"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Sine Wave icon</title>
          {/*}
            Sine Wave icon by Zach Bogart from The Noun Project
            https://thenounproject.com/icon/sine-4900361/
          */}
          <path
            d="m599.05 291.81 2.9531-11.809h-252c31.5 126 63 252 126 252 61.027 0 92.496-118.24 123.05-240.19zm-249.05-11.809c-31.5-126-63-252-126-252s-94.5 126-126 252z"
            fillRule="evenodd"
            fill="currentColor"
          />
        </svg>
        Remix-Metrics
      </h1>
    </header>
  );
}
