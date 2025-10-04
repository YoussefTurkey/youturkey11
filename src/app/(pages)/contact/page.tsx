import Contact from "./Contact";

type SearchParams = { [key: string]: string | string[] | undefined };

interface ContactPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const packageName =
    typeof resolvedSearchParams?.package === "string" 
      ? resolvedSearchParams.package 
      : undefined;

  return <Contact packageName={packageName} />;
}