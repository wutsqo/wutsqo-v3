import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql, Link, useStaticQuery } from "gatsby";
import StarRatings from "react-star-ratings";
import { debounce, throttle } from "throttle-debounce";

const ReadingList = () => {
  const [search, setSearch] = useState("");
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "reads" } } }
        sort: {
          fields: [frontmatter___status, frontmatter___dateFinish]
          order: [DESC, ASC]
        }
      ) {
        edges {
          node {
            frontmatter {
              bookTitle
              bookAuthor
              bookCover
              bookRating
              status
            }
            excerpt
            fields {
              slug
            }
            timeToRead
          }
        }
      }
    }
  `);
  const nodeList = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto p-2">
        <div>
          <h1 className="text-4xl text-center p-4 mt-10">My Reading List</h1>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by title or author"
            className="px-4 py-2 text-center dark:bg-gray-800 mb-8 shadow rounded-lg w-full mx-2 focus:outline-none focus:ring-2 focus:border-transparent hover:w-96 transition-all"
            onChange={(e) =>
              debounce(
                500,
                throttle(500, setSearch(e.target.value.toLowerCase()))
              )
            }
          />
        </div>
        <div className="flex flex-wrap -mx-1 overflow-hidden">
          {nodeList
            .filter(
              ({ node }) =>
                node.frontmatter.bookAuthor.toLowerCase().includes(search) ||
                node.frontmatter.bookTitle.toLowerCase().includes(search)
            )
            .map((edge, id) => {
              const book = edge.node.frontmatter;
              return (
                <div
                  className="my-1 px-1 overflow-hidden w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
                  key={id}
                >
                  <Link
                    to={`/reads/${edge.node.fields.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="mb-2 p-2 dark:bg-gray-800 shadow rounded">
                      <div className="relative h-60 w-full rounded">
                        <div
                          className="absolute inset-0 bg-cover bg-center z-0 rounded"
                          style={{ backgroundImage: `url(${book.bookCover})` }}
                        ></div>
                        <div className="opacity-0 hover:opacity-90 hover:bg-black duration-300 absolute inset-0 z-10 flex flex-col justify-between px-2 py-5 items-center text-center text-white font-semibold rounded">
                          {book.bookTitle}
                          <div>
                            {book.bookRating ? (
                              <StarRatings
                                rating={book.bookRating}
                                starRatedColor="#FF9529"
                                starEmptyColor="#FFFFFF"
                                starDimension="20px"
                                starSpacing="1px"
                              />
                            ) : (
                              "in progress"
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-center text-black text-sm rounded mt-1"
                        style={{
                          backgroundColor:
                            book.status === 4
                              ? "#7FCCEC"
                              : book.status === 3
                              ? "#9AE6E1"
                              : book.status === 2
                              ? "#FBE7BC"
                              : "#D4F9E5",
                        }}
                      >
                        {book.status === 4
                          ? "reviewed"
                          : book.status === 3
                          ? "rated"
                          : book.status === 2
                          ? "reading"
                          : "wishlist"}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default ReadingList;
