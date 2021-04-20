import React from 'react';

import { experiments } from "../content/experiments";
import  styles  from "../styles/Cards.module.css"

  
 
  
  const initialState = {
    slideIndex: 0
  };
  
  const experimentsReducer = (state, event) => {
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % experiments.length
      };
    }
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? experiments.length - 1 : state.slideIndex - 1
      };
    }
  };
  
  
  
 export default function Card() {
    const [state, dispatch] = React.useReducer(experimentsReducer, initialState);
  
    return (
      <div className={styles.slides}>
        <button onClick={() => dispatch({ type: "PREV" })}>‹</button>
  
        {[...experiments,...experiments,...experiments].map((slide, i) => {
          let offset = experiments.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
      </div>
    );
  }
  
 
  


function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}


function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className={styles.slide}
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
      <div
        className={styles.slideBackground}
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      />
      <div
        className={styles.slideContent}
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className={styles.slideContentInner}>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
          <h3 className={styles.experimentsubtitle}>{slide.subtitle}</h3>
          <p className={styles.slideDescription}>{slide.description}</p>
        </div>
      </div>
    </div>
  );
}

