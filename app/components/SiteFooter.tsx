export default function SiteFooter(props: any) {
  return (
    <footer {...props}>
      App by{" "}
      <a href="https://jamesarosen.com" target="_blank" rel="noreferrer">
        James A Rosen
      </a>
      .
      <br />
      <a
        href="https://thenounproject.com/icon/sine-4900361/"
        target="_blank"
        rel="noreferrer"
      >
        Sine icon
      </a>{" "}
      by Zach Bogart from The Noun Project
    </footer>
  );
}
