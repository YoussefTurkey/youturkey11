import Contact from "./Contact";

export default function ContactPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return (
    <Contact
      packageName={
        typeof searchParams?.package === "string"
          ? searchParams.package
          : undefined
      }
    />
  );
}
