

const Vision = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pb-10">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="hidden w-3/4 min-h-screen bg-gray-100 dark:bg-gray-800 lg:block"></div>

        <div className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Our <span className="text-blue-500">Vision</span>
          </h1>

          <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
            <img
              className="object-cover object-center w-full lg:w-[32rem] rounded-lg h-96"
              src="https://i.postimg.cc/cLp8Tj6F/man1.webp"
              alt=""
            />

            <div className="mt-8 lg:px-10 lg:mt-0">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:w-72">
                A Message from Our CEO
              </h1>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
                "Hello, I'm John Smith, the Founder & CEO of AdventureAlly. Our
                mission is to equip you with the highest quality camping gear
                and accessories to ensure that your outdoor experiences are
                safe, enjoyable, and unforgettable. We understand the importance
                of reliable equipment when you're out in nature, and we are
                dedicated to offering products that meet the highest standards
                of durability and performance. Thank you for being a part of our
                journey. Together, let's embrace the adventure that awaits us."
              </p>

              <h3 className="mt-6 text-lg font-medium text-blue-500">
                John Smith
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;