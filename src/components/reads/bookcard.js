import * as React from "react";
import tw from "twin.macro";
import StarRatings from "react-star-ratings";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeWhenVisible = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0.5, scale: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
};

const BookCard = ({ data, link }) => {
  const Container = tw.div`mb-2 p-2 dark:bg-gray-800 shadow rounded`;
  const ThumbContainer = tw.div`relative h-60 w-full rounded`;
  const ThumbCover = tw.div`absolute inset-0 bg-cover bg-center z-0 rounded`;
  const ThumbOverlay = tw.div`opacity-0 hover:opacity-90 hover:bg-black duration-300 absolute 
                              inset-0 z-10 flex flex-col justify-between px-2 py-5 items-center 
                              text-center text-white font-semibold rounded`;
  const ThumbStatus = tw.div`mt-1 p-1 dark:bg-gray-800 shadow rounded text-center text-black text-xs`;
  let statusBg;
  let statusText;

  switch (data.status) {
    case 4:
      statusBg = "#7FCCEC";
      statusText = "Reviewed";
      break;
    case 3:
      statusBg = "#9AE6E1";
      statusText = "Finished";
      break;
    case 2:
      statusBg = "#FBE7BC";
      statusText = "Reading";
      break;
    case 1:
      statusBg = "#D4F9E5";
      statusText = "To-read";
      break;
  }
  return (
    <FadeWhenVisible>
      <Link to={link} style={{ textDecoration: "none" }}>
        <Container>
          <ThumbContainer>
            <ThumbCover>
              {data.cover ? (
                <GatsbyImage
                  image={data.cover.childImageSharp.gatsbyImageData}
                  alt={data.title}
                  className="h-full rounded"
                />
              ) : (
                "no image"
              )}
            </ThumbCover>
            <ThumbOverlay>
              <div>{data.title}</div>
              <div>
                {data.bookRating ? (
                  <StarRatings
                    rating={data.bookRating}
                    starRatedColor="#FF9529"
                    starEmptyColor="#FFFFFF"
                    starDimension="20px"
                    starSpacing="1px"
                  />
                ) : (
                  "in progress"
                )}
              </div>
            </ThumbOverlay>
          </ThumbContainer>
          <ThumbStatus style={{ backgroundColor: statusBg }}>
            {statusText}
          </ThumbStatus>
        </Container>
      </Link>
    </FadeWhenVisible>
  );
};

export default BookCard;
