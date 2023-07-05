import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDownIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { ITEMS_PER_PAGE, discountedPrice } from "../../app/constants";
import {
  fetchProductsBySearchQueryAsync,
  selectSearchResult,
  selectSearchResultStatus,
  selectSearchTotalItems,
} from "./searchResultSlice";
import { Menu, Transition } from "@headlessui/react";
import Loader from "../common/Loader";
import Pagination from "../common/Pagination";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchResult() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const searchResults = useSelector(selectSearchResult);
  const searchResultStatus = useSelector(selectSearchResultStatus);
  const searchTotalItems = useSelector(selectSearchTotalItems);

  console.log(searchResults);
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsBySearchQueryAsync({ searchQuery, sort, pagination })
    );
  }, [dispatch, searchQuery, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTotalItems, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white rounded-md">
      {searchResultStatus === "loading" && <Loader></Loader>}

      <div className="flex items-baseline justify-between mb-2  pb-2 pt-2">
        <p className="text-lg font-semibold tracking-tight text-gray-900">
          results for {`${searchQuery}`}
        </p>

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <p
                          onClick={(e) => handleSort(e, option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            type="button"
            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span className="sr-only">View grid</span>
            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Search Product list */}
      <div className=" px-4 py-6 sm:px-6">
        <div className="flow-root ">
          {searchResults?.length > 0 ? (
            <ul className="-my-6 divide-y divide-gray-200">
              {searchResults.map((item) => (
                <Link to={`/product-detail/${item.id}`} key={item.id}>
                  <li
                    key={item.id}
                    className="flex mb-4 rounded-md border border-gray-200 px-4 py-6 sm:px-6"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                          {item.title}
                        </h1>
                      </div>
                      <div className="gap-y-1">
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 h-6 inline"></StarIcon>
                          <span className=" align-bottom">{item.rating}</span>
                        </p>
                        <p className="text-base text-gray-900">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-row gap-x-6">
                        <p className="text-lg tracking-tight text-gray-900">
                          ${discountedPrice(item)}
                        </p>
                        <p className="text-sm pt-1 line-through tracking-tight text-gray-400">
                          ${item.price}
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center ">
              <img
                src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/1273880a5b9cc8008301089835f37939.gif"
                alt="No Result found"
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={searchTotalItems}
      ></Pagination>
    </div>
  );
}
