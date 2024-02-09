import { useFormStatus } from "react-dom";

export default function Button() {

  const { pending } = useFormStatus();

  return (
    <button className="bg-green-500 rounded px-4 py-2 text-white font-semibold">
      {pending ? "Adding todo..." : "Add"}
    </button>
  );
}
