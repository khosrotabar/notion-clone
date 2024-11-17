"use client";

import * as Y from "yjs";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language =
  | "english"
  | "spanish"
  | "portugues"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portugues",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();

        setSummary(translated_text);
        toast.success("Translated Summaray successfully!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant='outline'>
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a Language and AI will translate a summary of document in the
            selected language.
          </DialogDescription>

          <hr className='mt-5' />
        </DialogHeader>

        {summary && (
          <div className='flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100'>
            <div className='flex'>
              <BotIcon className='w-10 flex-shrink-0' />
              <p className='font-bold'>
                GPT {isPending ? "is thinking..." : "Says:"}
              </p>
            </div>
            {isPending ? (
              <p className='font-bold'>Thinking...</p>
            ) : (
              <Markdown className='font-bold'>{summary}</Markdown>
            )}
          </div>
        )}

        <form className='flex gap-2' onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a Language' />
            </SelectTrigger>

            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type='submit' disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument;