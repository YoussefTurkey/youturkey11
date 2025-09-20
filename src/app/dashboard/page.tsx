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
import Link from "next/link";

type Work = {
  id?: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video" | "quiz";
  state: "article" | "project" | "Q&A-Hub";
  image: string;
  preview: string;
  slug: string;
  shortDescEn: string;
  shortDescAr: string;
  descEn: string;
  descAr: string;
  answerAr?: string;
  answerEn?: string;
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

export default function Dashboard() {
  const { language } = useLanguage();

  const emptyForm: Omit<Work, "id"> = {
    titleEn: "",
    titleAr: "",
    filter: "web",
    state: "article",
    image: "",
    preview: "",
    slug: "",
    shortDescEn: "",
    shortDescAr: "",
    descEn: "",
    descAr: "",
    answerAr: "",
    answerEn: "",
  };

  const [works, setWorks] = useState<Work[]>([]);
  const [form, setForm] = useState<Omit<Work, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionName, setCollectionName] = useState<
    "articles" | "projects" | "Q&A-Hub"
  >("articles");

  // Real-time listener (onSnapshot)
  useEffect(() => {
    const colRef = collection(db, collectionName);
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        })) as Work[];
        setWorks(items);
      },
      (err) => {
        console.error("onSnapshot error:", err);
      }
    );

    return () => unsub();
  }, [collectionName]);

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
        const projectRef = doc(db, collectionName, editId);
        await updateDoc(projectRef, formData);
        // clear edit state
        setEditId(null);
      } else {
        console.log("Adding new doc:", formData);
        await addDoc(collection(db, collectionName), formData);
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
  const handleEdit = (work: Work) => {
    const { id, ...rest } = work as any;
    setForm({
      titleEn: rest.titleEn ?? "",
      titleAr: rest.titleAr ?? "",
      filter: rest.filter ?? "web",
      state: rest.state ?? "article",
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
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      console.error("delete error:", err);
      alert("Delete error: " + (err as any)?.message);
    }
  };

  return (
    <div className="container mx-auto my-30 sm:my-10 px-5">
      <Titles>{language === "en" ? "Dashboard" : "لوحة التحكم"}</Titles>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5"
      >
        <Input
          type="text"
          placeholder={
            language === "en" ? "Title (EN)" : "العنوان (بالإنجليزية)"
          }
          value={form.titleEn}
          onChange={(e) =>
            setForm({ ...form, titleEn: (e.target as HTMLInputElement).value })
          }
        />
        <Input
          type="text"
          placeholder={language === "en" ? "Title (AR)" : "العنوان (بالعربية)"}
          value={form.titleAr}
          onChange={(e) =>
            setForm({ ...form, titleAr: (e.target as HTMLInputElement).value })
          }
        />

        <Input
          type="select"
          value={form.filter}
          onChange={(e) =>
            setForm({
              ...form,
              filter: (e.target as HTMLSelectElement).value as Work["filter"],
            })
          }
          options={[
            {
              value: "web",
              label: language === "en" ? "Web" : "موقع إلكتروني",
            },
            {
              value: "graphic",
              label: language === "en" ? "Graphic" : "تصميم جرافيكي",
            },
            { value: "post", label: language === "en" ? "Post" : "مقال" },
            {
              value: "video",
              label: language === "en" ? "Video" : "محتوى مرئي",
            },
            {
              value: "quiz",
              label: language === "en" ? "quiz" : "اختبار",
            },
          ]}
        />

        <Input
          type="select"
          value={form.state}
          onChange={(e) => {
            const newState = e.target.value as
              | "article"
              | "project"
              | "Q&A-Hub";
            setForm({ ...form, state: newState });

            if (newState === "article") {
              setCollectionName("articles");
            } else if (newState === "project") {
              setCollectionName("projects");
            } else if (newState === "Q&A-Hub") {
              setCollectionName("Q&A-Hub");
            }
          }}
          options={[
            {
              value: "article",
              label: language === "en" ? "Article" : "محتوى",
            },
            {
              value: "project",
              label: language === "en" ? "Project" : "مشروع",
            },
            {
              value: "Q&A-Hub",
              label: language === "en" ? "Q&A-Hub" : "مراكز الأسئلة",
            },
          ]}
        />

        <Input
          type="file"
          accept="image/*"
          placeholder={
            language === "en" ? "Insert Photo (.webp)" : "ارفق صورة (.webp)"
          }
          onChange={(e) => {
            const t = e.target as HTMLInputElement;
            setImageFile(t.files?.[0] || null);
          }}
        />

        {form.state === "Q&A-Hub" && (
          <>
            <Input
              type="textarea"
              placeholder={
                language === "en" ? "Answer (EN)" : "الإجابة (بالإنجليزي)"
              }
              value={form.answerEn}
              onChange={(e) =>
                setForm({
                  ...form,
                  answerEn: (e.target as HTMLInputElement).value,
                })
              }
            />

            <Input
              type="textarea"
              placeholder={
                language === "en" ? "Answer (AR)" : "الإجابة (بالعربية)"
              }
              value={form.answerAr}
              onChange={(e) =>
                setForm({
                  ...form,
                  answerAr: (e.target as HTMLInputElement).value,
                })
              }
            />
          </>
        )}

        <Input
          type="text"
          placeholder={language === "en" ? "Preview Link" : "لينك المعينة"}
          value={form.preview}
          onChange={(e) =>
            setForm({ ...form, preview: (e.target as HTMLInputElement).value })
          }
        />
        <Input
          type="text"
          placeholder={language === "en" ? "Slug" : "لينك الURL"}
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: (e.target as HTMLInputElement).value })
          }
        />
        <Input
          type="text"
          placeholder={
            language === "en" ? "Short Desc (EN)" : "وصف قصير (بالإنجليزي)"
          }
          value={form.shortDescEn}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescEn: (e.target as HTMLInputElement).value,
            })
          }
        />
        <Input
          type="text"
          placeholder={
            language === "en" ? "Short Desc (AR)" : "وصف قصير (بالعربية)"
          }
          value={form.shortDescAr}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescAr: (e.target as HTMLInputElement).value,
            })
          }
        />
        <Input
          type="textarea"
          placeholder={
            language === "en" ? "full Desc (EN)" : "محتوى الموضوع (بالإنجليزية)"
          }
          value={form.descEn}
          onChange={(e) =>
            setForm({
              ...form,
              descEn: (e.target as HTMLTextAreaElement).value,
            })
          }
        />
        <Input
          type="textarea"
          placeholder={
            language === "en" ? "full Desc (Ar)" : "محتوى الموضوع (بالعربية)"
          }
          value={form.descAr}
          onChange={(e) =>
            setForm({
              ...form,
              descAr: (e.target as HTMLTextAreaElement).value,
            })
          }
        />

        <Btns
          type="submit"
          style="col-span-2 py-3 xl:px-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center w-full mx-auto gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? language === "en"
              ? "Saving..."
              : "جارٍ الحفظ..."
            : editId
            ? language === "en"
              ? "Update Work"
              : "تعديل العمل"
            : language === "en"
            ? "Add Work"
            : "إضافة العمل"}
        </Btns>
      </form>

      {/* List */}
      <div className="grid gap-4 my-10">
        {works.length === 0 ? (
          language === "en" ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
                No data available
              </h3>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
                لا يوجد بيانات متاحة
              </h3>
            </div>
          )
        ) : (
          works.map((work) => (
            <div
              key={work.id}
              className="border border-[hsl(var(--third)/20%)] p-4 rounded flex justify-between items-center"
            >
              <Link
                href={`blogView/${work.slug}`}
                className="flex items-center gap-5"
              >
                {work.image && work.image.trim() !== "" && (
                  <Image
                    src={work.image}
                    alt={work.titleEn}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="rounded-full w-10 h-10"
                  />
                )}
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold">
                    {language === "en" ? work.titleEn : work.titleAr}
                  </h2>
                  <p className="text-sm text-gray-600">{work.filter}</p>
                </div>
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(work)}
                  className="px-3 py-1 border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-white cursor-pointer rounded-lg"
                >
                  {language === "en" ? "Edit" : "تعديل"}
                </button>
                <button
                  onClick={() => handleDelete(work.id!)}
                  className="px-3 py-1 bg-[hsl(var(--secondary))] text-white cursor-pointer rounded-lg"
                >
                  {language === "en" ? "Delete" : "حذف"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
