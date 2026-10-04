/** A static decorative wash keeps scrolling inexpensive on phones. */
export function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <div className="aurora" />
      <div className="grid-lines" />
    </div>
  );
}
