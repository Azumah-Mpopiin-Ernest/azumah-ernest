export default function About({ profile }) {
  return (
    <section
      id="about"
      className="border-y border-line bg-panel/40"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[280px_1fr] md:py-24">
        <div>
          {profile.photoUrl && (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              width="280"
              height="280"
              className="aspect-square w-40 rounded-2xl border border-line bg-panel-2 object-cover md:w-56"
              loading="lazy"
            />
          )}
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            About me
          </h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-dim">
            {profile.about}
          </p>

          {profile.skills?.length > 0 && (
            <>
              <h3 className="mt-14 font-display text-xl font-bold">
                What I work with
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {profile.skills.map((group) => (
                  <div key={group.group}>
                    <h4 className="text-sm font-semibold text-signal">
                      {group.group}
                    </h4>
                    <dl className="mt-3 space-y-3">
                      {group.items?.map((s) => (
                        <div key={s.name}>
                          <dt className="font-medium text-fg">{s.name}</dt>
                          {s.note && (
                            <dd className="text-sm text-faint">{s.note}</dd>
                          )}
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
