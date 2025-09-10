"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import Titles from "../components/ui/Titles";
import Input from "../components/ui/Input";
import { useLanguage } from "@/app/lang/LanguageProvider";
import Btns from "../components/ui/Btns";

type Project = {
  id?: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video";
  state: "content" | "project";
  image: string;
  preview: string;
  slug: string;
  shortDescEn: string;
  shortDescAr: string;
  descEn: string;
  descAr: string;
};

// Utility Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("❌ Failed to upload image");

  const data = await res.json();
  return data.secure_url;
}

export default function ProjectsDashboard() {
  const { language } = useLanguage();

  const emptyForm: Omit<Project, "id"> = {
    titleEn: "",
    titleAr: "",
    filter: "web",
    state: "content",
    image: "",
    preview: "",
    slug: "",
    shortDescEn: "",
    shortDescAr: "",
    descEn: "",
    descAr: "",
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time listener (onSnapshot)
  useEffect(() => {
    const colRef = collection(db, "projects");
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Project[];
        setProjects(items);
      },
      (err) => {
        console.error("onSnapshot error:", err);
      }
    );

    return () => unsub();
  }, []);

  // --- Add or Update ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // upload image if picked
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // prepare data to send (exclude any id)
      const { /*id,*/ ...formData } = { ...form, image: imageUrl } as any;

      if (editId) {
        console.log("Updating doc id:", editId, "with:", formData);
        const projectRef = doc(db, "projects", editId);
        await updateDoc(projectRef, formData);
        // clear edit state
        setEditId(null);
      } else {
        console.log("Adding new doc:", formData);
        await addDoc(collection(db, "projects"), formData);
      }

      // reset form
      setForm(emptyForm);
      setImageFile(null);
    } catch (err: any) {
      console.error("submit error:", err);
      alert("Error: " + (err?.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit: exclude id from form state (store id in editId only)
  const handleEdit = (project: Project) => {
    const { id, ...rest } = project as any;
    setForm({
      titleEn: rest.titleEn ?? "",
      titleAr: rest.titleAr ?? "",
      filter: rest.filter ?? "web",
      state: rest.state ?? "content",
      image: rest.image ?? "",
      preview: rest.preview ?? "",
      slug: rest.slug ?? "",
      shortDescEn: rest.shortDescEn ?? "",
      shortDescAr: rest.shortDescAr ?? "",
      descEn: rest.descEn ?? "",
      descAr: rest.descAr ?? "",
    });
    setEditId(id || null);
    // reset imageFile because we didn't pick a new file yet
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === "en" ? "Sure to delete?" : "متأكد تحذف؟")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.error("delete error:", err);
      alert("Delete error: " + (err as any)?.message);
    }
  };

  return (
    <div className="container mx-auto my-30 sm:my-10 px-5">
      <Titles>{language === "en" ? "Dashboard" : "لوحة التحكم"}</Titles>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <Input
          type="text"
          placeholder={language === "en" ? "Title (EN)" : "العنوان (بالإنجليزية)"}
          value={form.titleEn}
          onChange={(e) => setForm({ ...form, titleEn: (e.target as HTMLInputElement).value })}
        />
        <Input
          type="text"
          placeholder={language === "en" ? "Title (AR)" : "العنوان (بالعربية)"}
          value={form.titleAr}
          onChange={(e) => setForm({ ...form, titleAr: (e.target as HTMLInputElement).value })}
        />

        <Input
          type="select"
          value={form.filter}
          onChange={(e) => setForm({ ...form, filter: (e.target as HTMLSelectElement).value as Project["filter"] })}
          options={[
            { value: "web", label: language === "en" ? "Web" : "موقع إلكتروني" },
            { value: "graphic", label: language === "en" ? "Graphic" : "تصميم جرافيكي" },
            { value: "post", label: language === "en" ? "Post" : "مقال" },
            { value: "video", label: language === "en" ? "Video" : "محتوى مرئي" },
          ]}
        />

        <Input
          type="select"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: (e.target as HTMLSelectElement).value as Project["state"] })}
          options={[
            { value: "content", label: language === "en" ? "Content" : "محتوى" },
            { value: "project", label: language === "en" ? "Project" : "مشروع" },
          ]}
        />

        <Input
          type="file"
          accept="image/*"
          placeholder={language === "en" ? "Insert Photo (.webp)" : "ارفق صورة (.webp)"}
          onChange={(e) => {
            const t = e.target as HTMLInputElement;
            setImageFile(t.files?.[0] || null);
          }}
        />

        <Input type="text" placeholder={language === "en" ? "Preview Link" : "لينك المعينة"} value={form.preview} onChange={(e) => setForm({ ...form, preview: (e.target as HTMLInputElement).value })} />
        <Input type="text" placeholder={language === "en" ? "Slug" : "لينك الURL"} value={form.slug} onChange={(e) => setForm({ ...form, slug: (e.target as HTMLInputElement).value })} />
        <Input type="text" placeholder={language === "en" ? "Short Desc (EN)" : "وصف قصير (بالإنجليزي)"} value={form.shortDescEn} onChange={(e) => setForm({ ...form, shortDescEn: (e.target as HTMLInputElement).value })} />
        <Input type="text" placeholder={language === "en" ? "Short Desc (AR)" : "وصف قصير (بالعربية)"} value={form.shortDescAr} onChange={(e) => setForm({ ...form, shortDescAr: (e.target as HTMLInputElement).value })} />
        <Input type="textarea" placeholder={language === "en" ? "full Desc (EN)" : "محتوى الموضوع (بالإنجليزية)"} value={form.descEn} onChange={(e) => setForm({ ...form, descEn: (e.target as HTMLTextAreaElement).value })} />
        <Input type="textarea" placeholder={language === "en" ? "full Desc (Ar)" : "محتوى الموضوع (بالعربية)"} value={form.descAr} onChange={(e) => setForm({ ...form, descAr: (e.target as HTMLTextAreaElement).value })} />

        <Btns type="submit" style="col-span-2 py-3 xl:px-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center w-full mx-auto gap-2" disabled={isSubmitting}>
          {isSubmitting ? (language === "en" ? "Saving..." : "جارٍ الحفظ...") : editId ? (language === "en" ? "Update Blog" : "تعديل المحتوى") : (language === "en" ? "Add Blog" : "إضافة المحتوى")}
        </Btns>
      </form>

      {/* List */}
      <div className="grid gap-4 my-10">
        {projects.map((project) => (
          <div key={project.id} className="border border-[hsl(var(--third)/20%)] p-4 rounded flex justify-between items-center">
            <div className="flex items-center gap-5">
              {project.image && project.image.trim() !== "" && (
                <Image src={project.image} alt={project.titleEn} width={400} height={300} loading="lazy" className="rounded-full w-10 h-10" />
              )}
              <div className="flex flex-col gap-3">
                <h2 className="font-bold">{language === 'en' ? project.titleEn : project.titleAr}</h2>
                <p className="text-sm text-gray-600">{project.filter}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="px-3 py-1 border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-white cursor-pointer rounded-lg">
                {language === "en" ? "Edit" : "تعديل"}
              </button>
              <button onClick={() => handleDelete(project.id!)} className="px-3 py-1 bg-[hsl(var(--secondary))] text-white cursor-pointer rounded-lg">
                {language === "en" ? "Delete" : "حذف"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
