import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import genericCover from "../generic-cover.jpg";
import "../SharedStyles.scss";

function CoverCarousel(props) {
  const { covers } = props;
  console.log(covers);
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={2000}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      centerMode={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 5,
          partialVisibilityGutter: 40,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={2}
      swipeable
    >
      {covers &&
        covers.map((book) => {
          return (
            <a href={book.link} target={"_blank"}>
              {book.coverId ? (
                <img
                  key={book.coverId}
                  src={book.coverId}
                  style={{ minHeight: "100%", width: "95%" }}
                />
              ) : (
                <div className="container">
                  <img
                    src={genericCover}
                    style={{ minHeight: "100%", width: "95%" }}
                  />
                  <div className="centered">{`${book.title} by ${book.author}`}</div>
                </div>
              )}
            </a>
          );
        })}
    </Carousel>
  );
}

export default CoverCarousel;
