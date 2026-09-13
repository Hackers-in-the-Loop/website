import dimensions from "@/content/lab-photos.json";

type Props = {
  name: keyof typeof dimensions;
  alt: string;
  caption?: string;
  priority?: boolean;
};

export function LabPhoto({ name, alt, caption, priority = false }: Props) {
  const size = dimensions[name];
  return (
    <figure className={`lab-photo${priority ? " lab-photo--hero" : ""}`}>
      {/* Already optimized into responsive WebP files; no runtime image service. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/lab/${name}-1280.webp`}
        srcSet={`/lab/${name}-640.webp 640w, /lab/${name}-1280.webp 1280w`}
        sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1408px) 46vw, 620px"
        width={size.width} height={size.height} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}
        decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
