import Contact from "./Contact";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function ContactPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const packageName =
    typeof searchParams?.package === "string" ? searchParams.package : undefined;

  return <Contact packageName={packageName} />;
}
