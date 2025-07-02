export const CompletedRecordings = ({ url }: { url: string }) => (
  <div className="bg-white rounded-lg border p-4 py-5">
    <video src={url} controls className="w-full rounded-lg" />
  </div>
);
