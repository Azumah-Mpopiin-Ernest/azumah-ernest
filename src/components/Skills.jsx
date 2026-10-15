export default function Skills({ skills }) {
  if (!skills?.length) return null;
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <div key={group.group}>
          <h3 className="text-sm font-semibold text-signal">{group.group}</h3>
          <dl className="mt-3 space-y-3">
            {group.items?.map((s) => (
              <div key={s.name}>
                <dt className="font-medium text-fg">{s.name}</dt>
                {s.note && <dd className="text-sm text-faint">{s.note}</dd>}
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
