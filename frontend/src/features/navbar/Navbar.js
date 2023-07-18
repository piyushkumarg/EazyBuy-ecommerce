import React, { useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { IoIosSearch } from "react-icons/io";
import { selectUserInfo } from "../user/userSlice";

const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Home admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      // dispatch(fetchProductsBySearchQueryAsync(searchQuery));
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <>
      <div className="min-h-full ">
        <Disclosure
          as="nav"
          className="bg-gray-800  min-h-fit sticky top-0 z-50"
        >
          {({ open }) => (
            <>
              <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {userInfo?.role === "user" ? (
                        <Link to="/">
                          <img
                            className="h-8 w-8"
                            src="/ecommerce.png"
                            alt="Your Company"
                          />
                        </Link>
                      ) : (
                        <Link to="/admin">
                          <img
                            className="h-8 w-8"
                            src="/ecommerce.png"
                            alt="Your Company"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Search Input */}
                  <div className="group flex items-center">
                    <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-gray-600 rounded-l-3xl group-focus-within:border-gray-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                      <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                      </div>
                      <input
                        type="text"
                        className="bg-transparent border-0 text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] focus:ring-gray-500"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search for products, brand and more"
                        value={searchQuery}
                      />
                    </div>
                    <button
                      className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-gray-600 rounded-r-3xl bg-white/[0.1]"
                      onClick={() => searchQueryHandler("searchButton")}
                    >
                      <IoIosSearch className="text-white text-xl" />
                    </button>
                  </div>

                  <div className="hidden md:block ">
                    <div className="ml-5 flex items-center md:ml-6">
                      <div className="">
                        {navigation.map((item) =>
                          item[userInfo?.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                      <Link to="/my-cart" className="flex">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                        {items.length > 0 && (
                          <span className="  rounded-full mb-5 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                userInfo?.profileImage
                                  ? userInfo?.profileImage
                                  : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              }
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) =>
                    item[userInfo?.role] ? (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ) : null
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex justify-between items-center px-5">
                    <div className="inline-flex">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            userInfo?.profileImage
                              ? userInfo?.profileImage
                              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {/* this should come from userInfo */}
                          {userInfo?.name ? userInfo?.name : "New User"}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo?.email}
                        </div>
                      </div>
                    </div>
                    <Link to="/my-cart" className="flex ">
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white "
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      {items.length > 0 && (
                        <span className=" rounded-full mb-5 -ml-3 bg-gray-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-commerse
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
