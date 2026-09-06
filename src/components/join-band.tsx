import { CommunityLink } from "@/components/community-link";

type JoinBandProps = {
  title?: string;
};

export function JoinBand({
  title = "Bring your unfinished work.",
}: JoinBandProps) {
  return (
    <section className="join-band" aria-label="Join the community">
      <div className="site-shell join-band__inner">
        <div>
          <p className="eyebrow">There is a place for your curiosity</p>
          <h2>{title}</h2>
          <p className="join-band__copy">
            Code, questions, diagrams, and experiments. Start where you are.
          </p>
        </div>
        <CommunityLink className="button button--primary" />
      </div>
    </section>
  );
}
