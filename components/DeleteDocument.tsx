"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, starttransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = () => {
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    starttransition(async () => {
      const { success } = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.error("Room deleted successfully!");
      } else {
        toast.error("Failed to delete room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant='destructive'>
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          <DialogDescription>
            This will delete the document and all its contents, removing all
            users from the document.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              CLose
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDocument;
