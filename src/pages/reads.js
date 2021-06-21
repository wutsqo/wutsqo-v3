import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql, Link, useStaticQuery } from "gatsby";
import { debounce, throttle } from "throttle-debounce";
import BookCard from "../components/reads/bookcard";
import PageHeading from "../components/layouts/heading";

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
      <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-2">
        <PageHeading title="My Reading List" />
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
              return (
                <BookCard
                  data={edge.node.frontmatter}
                  link={`/reads/${edge.node.fields.slug}`}
                  id={id}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default ReadingList;
