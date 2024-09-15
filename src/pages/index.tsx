import ButtonRow from '../components/ButtonRow';

export default function main(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 divide-y">
      <ButtonRow title="Larm"></ButtonRow>
      <ButtonRow title="Avgång hamn"></ButtonRow>
      <ButtonRow title="Framme objekt"></ButtonRow>
      <ButtonRow title="Klar objekt"></ButtonRow>
      <ButtonRow title="Åter hamn"></ButtonRow>
    </div>
  );
}
