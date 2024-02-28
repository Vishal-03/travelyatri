"use client";

import { useRouter } from "next/navigation";

const ErrorBoundary = () => {
  const router = useRouter();
  return (
    <>
      <main className="h-screen grid place-items-center w-full">
        <div className="bg-red-500 bg-opacity-10 w-96 rounded-md p-4">
          <h1 className="text-red-500 text-2xl font-medium  text-center">
            An Error occurred!
          </h1>
          <p className="text-red-500 text-lg  text-center">
            Something want wrong!. Try again.
          </p>
          <p className="text-gray-500 text-lg text-center">
            Back to
            <button
              onClick={() => router.back()}
              className="text-rose-500 underline ml-2"
            >
              safety!
            </button>
          </p>
        </div>
      </main>
    </>
  );
};

export default ErrorBoundary;
