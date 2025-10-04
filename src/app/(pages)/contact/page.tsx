import Contact from "./Contact";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { package?: string };
}) {
  return <Contact packageName={searchParams.package} />;
}
