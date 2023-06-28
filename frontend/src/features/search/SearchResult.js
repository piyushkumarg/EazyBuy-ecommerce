import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { selectSearchResult } from "./searchResultSlice";

export default function SearchResult() {
  const searchResults = useSelector(selectSearchResult);
  // console.log(searchResults);

  return (
    <div>
      <div className=" px-4 py-6 sm:px-6">
        <div className="flow-root ">
          {searchResults.length > 0 ? (
            <ul className="-my-6 divide-y divide-gray-200">
              {searchResults.map((item) => (
                <Link to={`/product-detail/${item.id}`} key={item.id}>
                  <li
                    key={item.id}
                    className="flex mb-4  border border-gray-200 px-4 py-6 sm:px-6"
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
            <div>
              <h1 className="text-xl">No Result found...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
