"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();

  return (
    <div className='flex h-[72px] items-center justify-between p-5'>
      {user && <h1 className='text-2xl'>{user.firstName}</h1>}

      <Breadcrumbs />

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Header;
