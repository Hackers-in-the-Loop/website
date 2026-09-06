export function LoopDiagram() {
  return (
    <figure className="loop-diagram" aria-labelledby="loop-caption">
      <div className="loop-diagram__top">
        <span className="metadata">HITL / Field notes 001</span>
        <span className="loop-diagram__symbol" aria-hidden="true">
          ↳
        </span>
      </div>
      <p className="loop-diagram__title">
        People belong
        <br />
        in the architecture.
      </p>
      <ol className="loop-diagram__steps">
        <li>
          <span className="loop-diagram__index">01</span>
          <div>
            <strong>Set the intent</strong>
            <span>A person defines the task and its limits.</span>
          </div>
        </li>
        <li>
          <span className="loop-diagram__index">02</span>
          <div>
            <strong>Make the work visible</strong>
            <span>Tools, state, and decisions leave a trace.</span>
          </div>
        </li>
        <li className="loop-diagram__human">
          <span className="loop-diagram__index" aria-hidden="true">
            ●
          </span>
          <div>
            <strong>Keep a hand in the loop</strong>
            <span>Inspect. Interrupt. Change direction.</span>
          </div>
        </li>
        <li>
          <span className="loop-diagram__index">03</span>
          <div>
            <strong>Learn from what happened</strong>
            <span>Improve the system. Share the mechanism.</span>
          </div>
        </li>
      </ol>
      <figcaption id="loop-caption">
        Human direction, at every layer.
      </figcaption>
    </figure>
  );
}
