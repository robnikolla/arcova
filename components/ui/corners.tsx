export function Corners() {
  const s: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    border: "1px solid var(--line-2)",
  };
  return (
    <>
      <span style={{ ...s, top: 10, left: 10, borderRight: 0, borderBottom: 0 }} />
      <span style={{ ...s, top: 10, right: 10, borderLeft: 0, borderBottom: 0 }} />
      <span style={{ ...s, bottom: 10, left: 10, borderRight: 0, borderTop: 0 }} />
      <span style={{ ...s, bottom: 10, right: 10, borderLeft: 0, borderTop: 0 }} />
    </>
  );
}
