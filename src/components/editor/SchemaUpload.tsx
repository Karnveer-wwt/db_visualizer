import { Upload } from "lucide-react";

interface Props {
  onUpload: (content: string, filename: string) => void;
}

export default function SchemaUpload({ onUpload }: Props) {
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const content = await file.text();
    onUpload(content, file.name);

    event.target.value = "";
  };

  return (
    <label className="upload-button">
      <Upload size={15} />
      Upload
      <input
        hidden
        type="file"
        accept=".prisma,.txt"
        onChange={handleChange}
      />
    </label>
  );
}