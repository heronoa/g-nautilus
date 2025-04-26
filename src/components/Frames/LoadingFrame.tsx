export const LoadingFrame = () => {
  return (
    <main className="flex flex-col justify-center md:items-start items-center mx-auto px-4 py-8 md:grid grid-cols-3 gap-4 w-full lg:max-w-5xl animate-pulse">
      <section className="w-full max-w-xs space-y-4">
        <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto md:mx-0" />
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-300 rounded" />
      </section>

      <section className="col-span-2 w-full max-w-3xl space-y-4">
        <div className="flex gap-4">
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>

        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-200 rounded shadow-sm space-y-2"
          >
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-2/4 bg-gray-300 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
          </div>
        ))}
      </section>
    </main>
  );
};
