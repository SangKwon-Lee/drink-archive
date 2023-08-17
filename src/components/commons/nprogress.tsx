'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Progress() {
  return (
    <>
      <ProgressBar height="5px" color="#FDB22D" options={{ showSpinner: true }} shallowRouting />
    </>
  );
}
