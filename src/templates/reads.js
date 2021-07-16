import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql, Link, useStaticQuery } from "gatsby";
import { debounce, throttle } from "throttle-debounce";
import BookCard from "../components/reads/bookcard";
import PageHeading from "../components/heading";
import SEO from "../components/seo";

export const query = graphql`
  query bookQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "reads" } } }
      sort: {
        fields: [frontmatter___status, frontmatter___dateFinish]
        order: [DESC, ASC]
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            bookAuthor
            cover {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
              }
            }
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
`;

const ReadingList = (props) => {
  const [search, setSearch] = useState("");
  const nodeList = props.data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Reading List" />
      <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-2">
        <PageHeading title="My Reading List" />
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by title or author"
            className="px-4 py-2 text-center dark:bg-pink-900 mb-8 shadow rounded w-full focus:outline-none focus:ring-2 focus:border-transparent hover:w-96 transition-all"
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
                node.frontmatter.title.toLowerCase().includes(search)
            )
            .map((edge, id) => {
              return (
                <div
                  className="my-1 px-1 overflow-hidden w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
                  key={id}
                >
                  <BookCard
                    data={edge.node.frontmatter}
                    link={`/reads/${edge.node.fields.slug}`}
                    id={id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default ReadingList;
