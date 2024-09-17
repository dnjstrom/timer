import ButtonRow from '@/components/ButtonRow';

export function Page({ id }: { id: number }) {
  return (
    <div className="flex flex-col divide-y">
      <ButtonRow id={`larm-${id}`} title="Larm"></ButtonRow>
      <ButtonRow id={`departure-${id}`} title="Avgång hamn"></ButtonRow>
      <ButtonRow id={`arrival-${id}`} title="Framme objekt"></ButtonRow>
      <ButtonRow id={`finished-${id}`} title="Klar objekt"></ButtonRow>
      <ButtonRow id={`return-${id}`} title="Åter hamn"></ButtonRow>
    </div>
  );
}
