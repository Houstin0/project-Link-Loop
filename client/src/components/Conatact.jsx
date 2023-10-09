import React from "react";

function Contact(){
    return (
        <>
          <div className="bg-white dark:bg-black-900">
            
            <form action="#" class="mb-6 mt-10 p-20  bg-gray dark:bg-gray-900 ">
            <p class="text-2xl text-gray-900 dark:text-white">Contact Us</p>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div class="mb-6">
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                    <input type="text" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let us know how we can help you" required/>
                </div>
                <div class="mb-6">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" class="text-white bg-violet-700 hover:bg-violet-800 w-full focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-violet-600 dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800 block">Send message</button>
            </form>
            <p class="mb-2 pl-5 text-sm text-white-500 dark:text-white-400">
                <a href="#" class="hover:underline">linkloop@company.com</a>
            </p>
            <p class=" pl-5 text-sm text-gray-500 dark:text-gray-400">
                <a href="#" class="hover:underline">+254 727041155</a>
            </p>
            </div>
        </>
    )
}
export default Contact
