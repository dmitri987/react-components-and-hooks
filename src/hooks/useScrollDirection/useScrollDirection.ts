import { useRef } from "react";
import useScroll, {
  ScrollCoordinates,
  UseScrollProps,
} from "../useScroll/useScroll";

type Direction = "forward" | "backward" | undefined;

function useScrollDirection(props: UseScrollProps = {}): Direction {
  const prevCoordsRef = useRef<ScrollCoordinates | null>(null);
  const prevDirRef = useRef<Direction | undefined>();
  const { x, y } = useScroll(props);

  let newDir: Direction | undefined;
  if (prevCoordsRef.current) {
    if (props.axis === "x") {
      newDir =
        x! > prevCoordsRef.current.x!
          ? "forward"
          : x! < prevCoordsRef.current.x!
          ? "backward"
          : prevDirRef.current;
    } else {
      newDir =
        y! > prevCoordsRef.current.y!
          ? "forward"
          : y! < prevCoordsRef.current.y!
          ? "backward"
          : prevDirRef.current;
    }
  }
  prevCoordsRef.current = { x, y };
  prevDirRef.current = newDir;

  return newDir;
}

export default useScrollDirection;
