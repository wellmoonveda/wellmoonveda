import MudraCard from "./MudraCard";

export default function MudraGrid({ mudras }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {mudras.map((mudra: any) => (
        <MudraCard key={mudra.id} mudra={mudra} />
      ))}
    </div>
  );
}
