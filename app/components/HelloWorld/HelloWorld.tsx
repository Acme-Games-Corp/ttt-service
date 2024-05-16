'use client'
import React, { useState } from "react";
import "./HelloWorld.css";
import { HelloWorldProps } from "./HelloWorld.types";

export const HelloWorld: React.FC<HelloWorldProps> = (props) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const [rating, setRating] = useState(0);
  return (
    <div className={`star-rating rating-${props.theme}`}>
      <h1>{props.title}</h1>
      {stars.map((star, index) => {
        const starCss = star <= rating ? "starActive" : "starInactive";
        return (
          <button
            disabled={props.disabled}
            data-testid={`${props.testIdPrefix}-${index}`}
            key={star}
            className={`${starCss}`}
            onClick={() => setRating(star)}
          >
            <span className="star">★</span>
          </button>
        );
      })}
    </div>
  );
};
