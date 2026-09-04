import { CommunityLink } from "@/components/community-link";

type JoinBandProps = {
  title?: string;
};

export function JoinBand({
  title = "Bring something worth building.",
}: JoinBandProps) {
  return (
    <section className="join-band" aria-label="Join the community">
      <div className="site-shell join-band__inner">
        <h2>{title}</h2>
        <CommunityLink className="button button--primary" />
      </div>
    </section>
  );
}
