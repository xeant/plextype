import React from "react";
import DefaultLayout from 'src/layouts/plextype/Layout'

export default async function PageLayout({
                                           children,
                                           bottom,
                                         }: {
  children: React.ReactNode;
  bottom: React.ReactNode;
}) {


  return (
    <DefaultLayout>{children} {bottom}</DefaultLayout>
  );
}