import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import StarRatings from "react-star-ratings";
import tw from "twin.macro";
import { FaRegClock } from "@react-icons/all-files/fa/FaRegClock";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag";
import { GatsbyImage } from "gatsby-plugin-image";
import { Disqus } from "gatsby-plugin-disqus";

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "reads" } }
    ) {
      frontmatter {
        title
        bookAuthor
        cover {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              transformOptions: { cropFocus: ATTENTION }
            )
            resize {
              src
            }
          }
        }
        bookRating
        dateFinish(formatString: "MMM YYYY")
        tags
        status
      }
      html
      timeToRead
      excerpt(pruneLength: 150)
    }
  }
`;

const BookTD = tw.td`py-2 pr-6 text-left text-sm`;

const BookTemplate = ({ data, pageContext }) => {
  const fm = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO
        title={`${fm.title} Book Review`}
        description={`${data.markdownRemark.excerpt}`}
      />
      <div className="relative w-full -mt-10" style={{ height: "70vh" }}>
        <div className="absolute inset-0 bg-cover bg-center z-0 rounded">
          {fm.cover ? (
            <GatsbyImage
              image={fm.cover.childImageSharp.gatsbyImageData}
              alt={fm.title}
              className="h-full"
            />
          ) : (
            "no cover"
          )}
        </div>
        <div className="bg-gradient-to-t from-black absolute inset-0 z-10 px-4 py-5 text-white flex flex-col justify-end ">
          <div className="max-w-screen-sm w-full mx-auto sm:px-4 lg:pl-8">
            <h2 className="text-4xl font-semibold text-opacity-100">
              {fm.title}
            </h2>
            <h4 className="text-2xl">by {fm.bookAuthor}</h4>
            {fm.bookRating ? (
              <StarRatings
                rating={fm.bookRating}
                starRatedColor="#FF9529"
                starEmptyColor="#FFFFFF"
                starDimension="25px"
                starSpacing="1px"
              />
            ) : (
              "reading in progress"
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-sm mx-auto px-4 lg:pl-8">
        {console.log(fm)}
        {fm.status === 4 ? (
          <div className="mt-5">
            <table className="table-auto rounded">
              <tbody className="text-gray-700 dark:text-gray-200 font-light">
                <tr>
                  <BookTD>
                    <FaRegClock />
                  </BookTD>
                  <BookTD>
                    {data.markdownRemark.timeToRead == 1
                      ? `${data.markdownRemark.timeToRead} minute read`
                      : `${data.markdownRemark.timeToRead} minutes read`}
                  </BookTD>
                </tr>
                <tr>
                  <BookTD>
                    <FaCalendarAlt />
                  </BookTD>
                  <BookTD>{fm.dateFinish ? `${fm.dateFinish}` : ""}</BookTD>
                </tr>
                <tr>
                  <BookTD>
                    <FaHashtag />
                  </BookTD>
                  <BookTD>
                    {fm.tags
                      ? fm.tags.map((tag) => {
                          return (
                            <button className="bg-pink-200 dark:bg-pink-800 mr-2 px-2 py-1 mb-1 text-xs rounded">
                              {tag}
                            </button>
                          );
                        })
                      : ""}
                  </BookTD>
                </tr>
              </tbody>
            </table>
            <div
              className="py-6 prose prose-quoteless md:prose-lg  dark:prose-dark"
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark.html,
              }}
            ></div>
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row justify-between mt-6 mb-16 border rounded dark:border-pink-900">
          <div className="w-full md:w-1/2 text-left hover:text-pink-700 dark:hover:text-pink-300 p-2 border-b md:border-b-0 md:border-r dark:border-pink-900">
            {pageContext.previous ? (
              <Link to={`/reads/${pageContext.previous.fields.slug}`}>
                <b>&larr; prev</b>
                <div className="text-sm">
                  {pageContext.previous.frontmatter.title}
                </div>
              </Link>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 text-right hover:text-pink-700 dark:hover:text-pink-300 p-2">
            {pageContext.next ? (
              <Link to={`/reads/${pageContext.next.fields.slug}`}>
                <b>next &rarr;</b>
                <div className="text-sm">
                  {pageContext.next.frontmatter.title}
                </div>
              </Link>
            ) : null}
          </div>
        </div>
        <Disqus />
      </div>
    </Layout>
  );
};

export default BookTemplate;
