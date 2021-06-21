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

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "reads" } }
    ) {
      frontmatter {
        bookTitle
        bookAuthor
        cover {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
        bookRating
        dateFinish(formatString: "MMM YYYY")
        tags
      }
      html
      timeToRead
    }
  }
`;

const BookTD = tw.td`py-2 pr-6 text-left text-sm`;

const BookTemplate = (props) => {
  const fm = props.data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO title={fm.bookTitle} />
      <div className="relative w-full" style={{ height: "60vh" }}>
        <div className="absolute inset-0 bg-cover bg-center z-0 rounded">
          {fm.cover ? (
            <GatsbyImage
              image={fm.cover.childImageSharp.gatsbyImageData}
              alt={fm.bookTitle}
              className="h-full"
            />
          ) : (
            "no cover"
          )}
        </div>
        <div className="bg-gradient-to-t from-black absolute inset-0 z-10 px-4 md:px-10 py-5 text-white flex flex-col justify-end ">
          <div className="max-w-screen-sm w-full mx-auto sm:px-4">
            <h2 className="text-4xl font-semibold text-opacity-100">
              {fm.bookTitle}
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
      <div>
        <div>
          <div className="mt-5 max-w-screen-sm mx-auto px-4">
            <hr />
            <table className="table-auto rounded">
              <tbody className="text-gray-700 dark:text-gray-200 font-light">
                <tr>
                  <BookTD>
                    <FaRegClock />
                  </BookTD>
                  <BookTD>
                    {props.data.markdownRemark.timeToRead == 1
                      ? `${props.data.markdownRemark.timeToRead} minute read`
                      : `${props.data.markdownRemark.timeToRead} minutes read`}
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
                            <button className="bg-gray-200 dark:bg-gray-800 mr-2 px-2 py-1 mb-1 text-xs rounded-lg">
                              {tag}
                            </button>
                          );
                        })
                      : ""}
                  </BookTD>
                </tr>
              </tbody>
            </table>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: props.data.markdownRemark.html,
              }}
            ></div>

            <h3>Find this book on</h3>
            <li>
              <a
                href={`https://www.goodreads.com/search?q=${fm.bookTitle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Goodreads
              </a>
            </li>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookTemplate;
