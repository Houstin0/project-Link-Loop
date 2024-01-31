function Footer() {
  return (
    <footer className="bg-purple-700 rounded-lg shadow dark:bg-purple-700 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl text-gray-100 font-semibold whitespace-nowrap dark:text-gray-900">
              Link Loop
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-100 sm:mb-0 dark:text-gray-900">
            <li>
              <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-100 sm:text-center dark:text-gray-900">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Link Loop™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
