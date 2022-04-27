import { format, parseISO } from "date-fns";

function PublishedAt({ time }) {
  return (
    <time dateTime={time}>
      <span>veröffentlicht am {format(parseISO(time), "dd.MM.yyyy")}</span>{" "}
      <span>{format(parseISO(time), "HH:mm")} Uhr</span>
    </time>
  );
}

export default PublishedAt;
